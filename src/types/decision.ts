export type ScenarioCategory = 
  | 'used-car'
  | 'city-relocation'
  | 'apartment-rental'
  | 'small-business'
  | 'job-internship-offer'
  | 'general-decision';

export type ForesightDimensionKey = 
  | 'missing-info'
  | 'risks'
  | 'hidden-costs'
  | 'dependencies'
  | 'stakeholders'
  | 'verification';

export type PriorityLevel = 'Critical' | 'High' | 'Moderate' | 'Advisory';

export type InformationSourceType =
  | 'user-supplied'
  | 'bundled-demo'
  | 'rule-engine'
  | 'external-verification-required';

export type UserDecisionStance =
  | 'investigating'
  | 'comparing'
  | 'proceeding'
  | 'pausing';

export type AssessmentVerdict = 
  | 'Investigate before deciding'
  | 'More information needed'
  | 'Compare alternatives closely'
  | 'Ready for next planning step';

export interface Finding {
  id: string;
  dimension: ForesightDimensionKey;
  title: string;
  priority: PriorityLevel;
  seriousnessRank?: number;
  relevanceReason?: string;
  whyItMatters: string;
  underlyingAssumption: string;
  practicalAction: string;
  sourceType?: InformationSourceType;
}

export interface VerificationTask {
  id: string;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  sourceRequirement?: string;
  sourceType?: InformationSourceType;
}

export interface TradeoffOption {
  id: string;
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  estimatedFinancials?: string;
  estimatedTimeframe?: string;
  recommendedFor?: string;
  sourceType?: InformationSourceType;
}

export interface DecisionConstraint {
  id: string;
  label: string;
  value: string;
  type: 'budget' | 'timeline' | 'risk' | 'location' | 'custom';
  sourceType?: InformationSourceType;
}

export interface DecisionPriority {
  id: string;
  label: string;
  selected: boolean;
  sourceType?: InformationSourceType;
}

export interface StakeholderConsideration {
  id: string;
  roleOrGroup: string;
  consideration: string;
  mitigationOrAction: string;
  isIncluded: boolean;
  sourceType: InformationSourceType;
}

export interface WhyThisResult {
  factorsConsidered: string[];
  userPriorities: string[];
  assumptionsMade: string[];
  unknownsIdentified: string[];
  limitations: string[];
  suggestedVerifications: string[];
}

export interface DecisionAssessment {
  verdict: AssessmentVerdict;
  verdictColor: 'amber' | 'blue' | 'purple' | 'emerald';
  rationale: string;
  confidenceNote: string;
  keySignals: string[];
}

export interface AnalysisResult {
  category: ScenarioCategory;
  categoryLabel: string;
  isCustomFallback: boolean;
  scenarioStatement: string;
  editableGoal: string;
  assessment: DecisionAssessment;
  findings: Finding[];
  options: TradeoffOption[];
  verificationTasks: VerificationTask[];
  suggestedNextActions: {
    id: string;
    step: string;
    why: string;
    urgency: 'Immediate' | 'Before Signing' | 'Post-Decision';
  }[];
  constraints: DecisionConstraint[];
  priorities: DecisionPriority[];
  optionalStakeholders: StakeholderConsideration[];
  whyThisResult: WhyThisResult;
  followUpQuestions?: string[];
}

