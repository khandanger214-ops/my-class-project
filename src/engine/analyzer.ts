import { 
  AnalysisResult, 
  DecisionConstraint, 
  DecisionPriority, 
  Finding, 
  InformationSourceType,
  PriorityLevel,
  StakeholderConsideration,
  VerificationTask 
} from '../types/decision';
import { classifyScenario } from './classifier';
import { TEMPLATES } from './templates';

const PRIORITY_RANK: Record<PriorityLevel, number> = {
  'Critical': 1,
  'High': 2,
  'Moderate': 3,
  'Advisory': 4
};

export function analyzeScenario(
  scenarioText: string,
  userGoal?: string,
  userConstraints?: DecisionConstraint[],
  userPriorities?: DecisionPriority[],
  userStakeholders?: StakeholderConsideration[],
  isBundledDemo: boolean = false,
  completedVerificationTaskIds: string[] = []
): AnalysisResult {
  const classification = classifyScenario(scenarioText);
  const template = TEMPLATES[classification.category] || TEMPLATES['general-decision'];

  const defaultSource: InformationSourceType = isBundledDemo ? 'bundled-demo' : 'rule-engine';

  // Deep clone findings to prevent mutating template
  let findings: Finding[] = template.findings.map(f => ({
    ...f,
    sourceType: 'rule-engine'
  }));

  let verificationTasks: VerificationTask[] = template.verificationTasks.map(v => ({
    ...v,
    sourceType: 'external-verification-required'
  }));
  
  // Clone constraints & priorities, preserving sourceType
  const constraints: DecisionConstraint[] = userConstraints && userConstraints.length > 0
    ? userConstraints.map(c => ({
        ...c,
        sourceType: c.sourceType || (isBundledDemo ? 'bundled-demo' : 'user-supplied')
      }))
    : template.defaultConstraints.map(c => ({
        ...c,
        sourceType: defaultSource
      }));

  const priorities: DecisionPriority[] = userPriorities && userPriorities.length > 0
    ? userPriorities.map(p => ({
        ...p,
        sourceType: p.sourceType || (isBundledDemo ? 'bundled-demo' : 'user-supplied')
      }))
    : template.defaultPriorities.map(p => ({
        ...p,
        sourceType: defaultSource
      }));

  const optionalStakeholders: StakeholderConsideration[] = userStakeholders && userStakeholders.length > 0
    ? userStakeholders.map(s => ({ ...s }))
    : template.optionalStakeholders.map(s => ({ ...s }));

  const includedStakeholders = optionalStakeholders.filter(s => s.isIncluded);

  const goal = userGoal && userGoal.trim().length > 0 
    ? userGoal.trim() 
    : template.defaultGoal;

  // Rule-based heuristic tuning based on seriousness & relevance to user priorities
  const selectedPriorities = priorities.filter(p => p.selected);

  findings = findings.map(f => {
    let updatedPriority: PriorityLevel = f.priority;
    let relevanceReason =
      f.priority === 'Critical'
        ? 'High seriousness: Direct financial, contractual, or safety exposure if unverified'
        : f.priority === 'High'
        ? 'Material impact: Can significantly alter total cost, timeline, or legal standing'
        : 'Contextual factor: Review based on your specific circumstances';

    // If user prioritized cost/finances, elevate hidden-cost findings
    const matchedCostPriority = selectedPriorities.find(p => {
      const l = p.label.toLowerCase();
      return l.includes('cost') || l.includes('capital') || l.includes('savings') || l.includes('cash') || l.includes('comp');
    });
    if (matchedCostPriority && f.dimension === 'hidden-costs') {
      if (updatedPriority === 'Moderate') updatedPriority = 'High';
      relevanceReason = `Directly relevant to your priority: "${matchedCostPriority.label}"`;
    }

    // If user prioritized safety/reliability/shielding/deposit, elevate risk & verification findings
    const matchedRiskPriority = selectedPriorities.find(p => {
      const l = p.label.toLowerCase();
      return l.includes('reliab') || l.includes('safet') || l.includes('liabil') || l.includes('risk') || l.includes('deposit');
    });
    if (matchedRiskPriority && (f.dimension === 'risks' || f.dimension === 'verification')) {
      if (updatedPriority === 'Moderate') updatedPriority = 'High';
      relevanceReason = `Directly relevant to your priority: "${matchedRiskPriority.label}"`;
    }

    // Stakeholder dimension handling: do not over-dramatize if user has not included any third-party stakeholders
    if (f.dimension === 'stakeholders') {
      if (includedStakeholders.length > 0) {
        if (updatedPriority === 'Moderate') updatedPriority = 'High';
        relevanceReason = `Relevant to ${includedStakeholders.length} included stakeholder consideration(s)`;
      } else {
        updatedPriority = 'Advisory';
        relevanceReason = 'Optional consideration: Only applies if this decision affects other people';
      }
    }

    return {
      ...f,
      priority: updatedPriority,
      seriousnessRank: PRIORITY_RANK[updatedPriority],
      relevanceReason
    };
  });

  // Sort findings by seriousness and relevance rank (Critical -> High -> Moderate -> Advisory)
  findings.sort((a, b) => (a.seriousnessRank || 99) - (b.seriousnessRank || 99));

  // Calculate assessment verdict caution
  const criticalCount = findings.filter(f => f.priority === 'Critical').length;
  const completedCount = completedVerificationTaskIds.length;
  let assessment = { ...template.assessment };

  if (goal !== template.defaultGoal) {
    assessment.rationale = `${template.assessment.rationale} Aligned with your stated goal: "${goal}".`;
  }

  if (criticalCount >= 3 && completedCount === 0) {
    assessment.verdict = 'Investigate before deciding';
    assessment.verdictColor = 'amber';
  } else if (classification.isCustomFallback && completedCount === 0) {
    assessment.verdict = 'More information needed';
    assessment.verdictColor = 'purple';
  } else if (completedCount >= verificationTasks.length && verificationTasks.length > 0) {
    assessment.verdict = 'Ready for next planning step';
    assessment.verdictColor = 'emerald';
    assessment.confidenceNote = `All ${completedCount} baseline verification checks marked complete by you`;
  }

  // Build transparent WhyThisResult including user goal, constraints & stakeholder stance
  const dynamicFactors = [...template.whyThisResult.factorsConsidered];
  if (goal !== template.defaultGoal) {
    dynamicFactors.unshift(`User-specified objective: "${goal}"`);
  }
  if (constraints.length > 0) {
    dynamicFactors.push(
      `Boundary constraints considered: ${constraints.map(c => `${c.label} (${c.value})`).join('; ')}`
    );
  }
  if (includedStakeholders.length > 0) {
    dynamicFactors.push(
      `Included stakeholder considerations: ${includedStakeholders.map(s => s.roleOrGroup).join(', ')}`
    );
  }
  if (completedCount > 0) {
    dynamicFactors.push(
      `User marked ${completedCount} verification task(s) as completed during this session`
    );
  }

  const dynamicAssumptions = [...template.whyThisResult.assumptionsMade];
  if (includedStakeholders.length === 0) {
    dynamicAssumptions.push(
      'Evaluated as an individual decision; does not assume a spouse, family, roommate, or employer unless you opt in'
    );
  } else {
    dynamicAssumptions.push(
      `Assumes coordination is required with: ${includedStakeholders.map(s => s.roleOrGroup).join(', ')}`
    );
  }

  const dynamicLimitations = [
    ...template.whyThisResult.limitations,
    'Generated by a local rule-based engine; no live web search, legal registry lookup, or outcome guarantee is performed'
  ];

  const whyThisResult = {
    factorsConsidered: dynamicFactors,
    userPriorities: selectedPriorities.map(p => p.label),
    assumptionsMade: dynamicAssumptions,
    unknownsIdentified: [...template.whyThisResult.unknownsIdentified],
    limitations: dynamicLimitations,
    suggestedVerifications: [...template.whyThisResult.suggestedVerifications]
  };

  // Dynamic contextual follow-ups for custom general decisions
  let followUpQuestions = template.followUpQuestions ? [...template.followUpQuestions] : undefined;
  if (classification.category === 'general-decision') {
    const textLower = scenarioText.toLowerCase();
    const dynamicInquiries: string[] = [];

    if (textLower.includes('money') || textLower.includes('cost') || textLower.includes('buy') || textLower.includes('pay') || textLower.includes('invest') || textLower.includes('$')) {
      dynamicInquiries.push('What is the maximum non-refundable financial loss you could absorb if this plan delivers zero return?');
    }
    if (textLower.includes('partner') || textLower.includes('wife') || textLower.includes('husband') || textLower.includes('family') || textLower.includes('team')) {
      dynamicInquiries.push('Have you conducted a direct alignment conversation with the people who share the downside risk?');
    }
    if (textLower.includes('contract') || textLower.includes('sign') || textLower.includes('agreement') || textLower.includes('legal')) {
      dynamicInquiries.push('What specific early-termination, exit, or breach clauses are written into the draft agreement?');
    }
    if (textLower.includes('time') || textLower.includes('month') || textLower.includes('year') || textLower.includes('deadline')) {
      dynamicInquiries.push('If external approvals or delivery lag by 60 days, does this timeline still hold without severe disruption?');
    }

    if (dynamicInquiries.length > 0) {
      followUpQuestions = dynamicInquiries.slice(0, 3);
    }
  }

  return {
    category: classification.category,
    categoryLabel: classification.categoryLabel,
    isCustomFallback: classification.isCustomFallback,
    scenarioStatement: scenarioText,
    editableGoal: goal,
    assessment,
    findings,
    options: template.options.map(o => ({ ...o, sourceType: 'rule-engine' })),
    verificationTasks,
    suggestedNextActions: template.suggestedNextActions.map(a => ({ ...a })),
    constraints,
    priorities,
    optionalStakeholders,
    whyThisResult,
    followUpQuestions
  };
}

