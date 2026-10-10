import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  RefreshCw, 
  Compass, 
  Copy, 
  Check, 
  Edit3, 
  ArrowRight, 
  ListOrdered,
  ShieldAlert,
  PlusCircle
} from 'lucide-react';
import {
  AnalysisResult,
  DecisionConstraint,
  InformationSourceType,
  StakeholderConsideration,
  TradeoffOption,
  UserDecisionStance,
  VerificationTask
} from '../../types/decision';
import { SharedDecisionContext } from '../../types/sharedContext';
import { analyzeScenario } from '../../engine/analyzer';
import { validateScenarioInput } from '../../engine/classifier';
import { EXAMPLE_SCENARIOS } from '../../data/scenarios';
import { AssessmentBanner } from './AssessmentBanner';
import { ForesightScanView } from './ForesightScanView';
import { ConstraintsPrioritiesEditor } from './ConstraintsPrioritiesEditor';
import { OptionsMatrix } from './OptionsMatrix';
import { VerificationTasksList } from './VerificationTasksList';
import { FollowUpQuestionsPanel } from './FollowUpQuestionsPanel';
import { InformationSourceBadge, InformationLegendBar } from '../governance/InformationSourceBadge';
import { StakeholderConsiderationPanel } from '../governance/StakeholderConsiderationPanel';
import { AccountabilitySummaryPanel } from '../governance/AccountabilitySummaryPanel';
import { PrivacyOversightBar } from '../governance/PrivacyOversightBar';

interface LifeLensWorkspaceProps {
  initialScenarioText: string;
  initialDecisionContext?: SharedDecisionContext | null;
  onUpdateDecisionContext?: (decisionContext: SharedDecisionContext) => void;
  onReturnHome: () => void;
  onStartNewScenario?: () => void;
  onResetScenario?: () => void;
  onTransferToLifeRoute: (decisionContext: SharedDecisionContext) => void;
}

export const LifeLensWorkspace: React.FC<LifeLensWorkspaceProps> = ({
  initialScenarioText,
  initialDecisionContext,
  onUpdateDecisionContext,
  onReturnHome,
  onStartNewScenario,
  onResetScenario,
  onTransferToLifeRoute
}) => {
  const handleStartFreshScenario = onResetScenario || onStartNewScenario;

  // Guard against stale context from a different previous scenario contaminating a new scenario
  const validInitialContext =
    initialDecisionContext &&
    initialDecisionContext.scenarioStatement.trim() === initialScenarioText.trim()
      ? initialDecisionContext
      : null;

  const isMatchedBundledExample = EXAMPLE_SCENARIOS.some(
    s => s.title === initialScenarioText.trim()
  );
  const isBundledDemo = Boolean(
    validInitialContext?.isPresentationDemo ||
    validInitialContext?.scenarioSourceType === 'bundled-demo' ||
    isMatchedBundledExample
  );

  const [scenarioSourceType, setScenarioSourceType] = useState<InformationSourceType>(
    validInitialContext?.scenarioSourceType || (isBundledDemo ? 'bundled-demo' : 'user-supplied')
  );
  const [goalSourceType, setGoalSourceType] = useState<InformationSourceType>(
    validInitialContext?.goalSourceType || (isBundledDemo ? 'bundled-demo' : 'rule-engine')
  );

  // Scenario and Editing State
  const [scenarioStatement, setScenarioStatement] = useState<string>(
    validInitialContext?.scenarioStatement || initialScenarioText
  );
  const [isEditingScenario, setIsEditingScenario] = useState<boolean>(false);
  const [scenarioDraft, setScenarioDraft] = useState<string>(
    validInitialContext?.scenarioStatement || initialScenarioText
  );
  const [scenarioEditError, setScenarioEditError] = useState<string | null>(null);

  // Analysis State
  const [analysis, setAnalysis] = useState<AnalysisResult>(() => {
    const res = analyzeScenario(
      validInitialContext?.scenarioStatement || initialScenarioText,
      validInitialContext?.userGoal,
      validInitialContext?.constraints,
      validInitialContext?.priorities,
      validInitialContext?.stakeholders,
      isBundledDemo,
      validInitialContext?.completedVerificationTaskIds || []
    );
    if (validInitialContext?.verificationTasks && validInitialContext.verificationTasks.length > 0) {
      res.verificationTasks = validInitialContext.verificationTasks.map(t => ({ ...t }));
    } else if (validInitialContext?.completedVerificationTaskIds?.length) {
      res.verificationTasks = res.verificationTasks.map(t => ({
        ...t,
        isCompleted: validInitialContext.completedVerificationTaskIds.includes(t.id)
      }));
    }
    return res;
  });

  const [selectedOption, setSelectedOption] = useState<TradeoffOption | null>(
    validInitialContext?.selectedOption || analysis.options[0] || null
  );
  const [flaggedAssumptions, setFlaggedAssumptions] = useState<string[]>(
    validInitialContext?.flaggedAssumptions || []
  );
  const [userDecisionStance, setUserDecisionStance] = useState<UserDecisionStance>(
    validInitialContext?.userDecisionStance || 'investigating'
  );
  const [userDecisionNote, setUserDecisionNote] = useState<string>(
    validInitialContext?.userNotes || ''
  );

  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Protect against wiping state on component re-mount
  const prevScenarioRef = React.useRef<string>(initialScenarioText);
  const prevDemoIdRef = React.useRef<string | undefined>(validInitialContext?.demoScenarioId);
  const isInitialMount = React.useRef<boolean>(true);

  // When initialScenarioText or Presentation Demo changes from outside
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (
      prevScenarioRef.current !== initialScenarioText ||
      prevDemoIdRef.current !== initialDecisionContext?.demoScenarioId
    ) {
      prevScenarioRef.current = initialScenarioText;
      prevDemoIdRef.current = initialDecisionContext?.demoScenarioId;

      const matchingContext =
        initialDecisionContext &&
        initialDecisionContext.scenarioStatement.trim() === initialScenarioText.trim()
          ? initialDecisionContext
          : null;

      const nextScenario = matchingContext?.scenarioStatement || initialScenarioText;
      const nextIsExample = EXAMPLE_SCENARIOS.some(s => s.title === nextScenario.trim());
      const nextIsDemo = Boolean(
        matchingContext?.isPresentationDemo ||
        matchingContext?.scenarioSourceType === 'bundled-demo' ||
        nextIsExample
      );

      setScenarioStatement(nextScenario);
      setScenarioDraft(nextScenario);
      setScenarioEditError(null);
      setScenarioSourceType(nextIsDemo ? 'bundled-demo' : 'user-supplied');
      setGoalSourceType(nextIsDemo ? 'bundled-demo' : 'rule-engine');

      const freshAnalysis = analyzeScenario(
        nextScenario,
        matchingContext?.userGoal,
        matchingContext?.constraints,
        matchingContext?.priorities,
        matchingContext?.stakeholders,
        nextIsDemo,
        matchingContext?.completedVerificationTaskIds || []
      );
      if (matchingContext?.verificationTasks && matchingContext.verificationTasks.length > 0) {
        freshAnalysis.verificationTasks = matchingContext.verificationTasks.map(t => ({ ...t }));
      }
      setAnalysis(freshAnalysis);
      setSelectedOption(matchingContext?.selectedOption || freshAnalysis.options[0] || null);
      setFlaggedAssumptions(matchingContext?.flaggedAssumptions || []);
      setUserDecisionStance(matchingContext?.userDecisionStance || 'investigating');
      setUserDecisionNote(matchingContext?.userNotes || '');
    }
  }, [initialScenarioText, initialDecisionContext?.demoScenarioId]);

  // Keep parent session context synchronized
  useEffect(() => {
    onUpdateDecisionContext?.({
      scenarioStatement,
      scenarioSourceType,
      category: analysis.category,
      categoryLabel: analysis.categoryLabel,
      userGoal: analysis.editableGoal,
      goalSourceType,
      selectedOption: selectedOption || analysis.options[0] || null,
      constraints: analysis.constraints,
      priorities: analysis.priorities,
      stakeholders: analysis.optionalStakeholders,
      includeStakeholders: analysis.optionalStakeholders.some(s => s.isIncluded),
      flaggedAssumptions,
      userDecisionStance,
      userNotes: userDecisionNote,
      isPresentationDemo: scenarioSourceType === 'bundled-demo',
      demoScenarioId: validInitialContext?.demoScenarioId,
      verificationTasks: analysis.verificationTasks,
      completedVerificationTaskIds: analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id),
      resolvedFindingIds: [],
      timestamp: Date.now()
    });
  }, [
    scenarioStatement,
    scenarioSourceType,
    goalSourceType,
    analysis,
    selectedOption,
    flaggedAssumptions,
    userDecisionStance,
    userDecisionNote
  ]);

  // Handle regenerating analysis
  const handleRegenerate = (
    customText?: string,
    nextSourceType?: InformationSourceType,
    isFreshScenarioChange: boolean = false
  ) => {
    const textToAnalyze = customText || scenarioStatement;
    const isDemo = (nextSourceType || scenarioSourceType) === 'bundled-demo';
    setIsRegenerating(true);

    setTimeout(() => {
      const completedIds = isFreshScenarioChange
        ? []
        : analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id);

      const result = isFreshScenarioChange
        ? analyzeScenario(textToAnalyze, undefined, undefined, undefined, undefined, isDemo, [])
        : analyzeScenario(
            textToAnalyze,
            analysis.editableGoal,
            analysis.constraints,
            analysis.priorities,
            analysis.optionalStakeholders,
            isDemo,
            completedIds
          );

      if (!isFreshScenarioChange) {
        result.verificationTasks = analysis.verificationTasks;
      } else {
        setSelectedOption(result.options[0] || null);
        setFlaggedAssumptions([]);
        setUserDecisionStance('investigating');
      }

      setAnalysis(result);
      setIsRegenerating(false);
    }, 150);
  };

  const handleSaveScenarioEdit = () => {
    const validation = validateScenarioInput(scenarioDraft, 'decision');
    if (!validation.isValid) {
      setScenarioEditError(validation.error);
      return;
    }

    const trimmed = scenarioDraft.trim();
    const isTextChanged = trimmed !== scenarioStatement.trim();
    const matchedBundled = EXAMPLE_SCENARIOS.some(s => s.title === trimmed);
    const nextSource: InformationSourceType = matchedBundled ? 'bundled-demo' : 'user-supplied';

    setScenarioEditError(null);
    setScenarioStatement(trimmed);
    setScenarioSourceType(nextSource);
    if (isTextChanged) {
      setGoalSourceType(matchedBundled ? 'bundled-demo' : 'rule-engine');
    }
    setIsEditingScenario(false);
    prevScenarioRef.current = trimmed;
    handleRegenerate(trimmed, nextSource, isTextChanged);
  };

  const handleUpdateGoal = (newGoal: string) => {
    setGoalSourceType('user-supplied');
    const completedIds = analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id);
    const updatedResult = analyzeScenario(
      scenarioStatement,
      newGoal,
      analysis.constraints,
      analysis.priorities,
      analysis.optionalStakeholders,
      scenarioSourceType === 'bundled-demo',
      completedIds
    );
    updatedResult.verificationTasks = analysis.verificationTasks;
    setAnalysis(updatedResult);
  };

  const handleUpdateConstraints = (newConstraints: DecisionConstraint[]) => {
    const completedIds = analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id);
    const updatedResult = analyzeScenario(
      scenarioStatement,
      analysis.editableGoal,
      newConstraints,
      analysis.priorities,
      analysis.optionalStakeholders,
      scenarioSourceType === 'bundled-demo',
      completedIds
    );
    updatedResult.verificationTasks = analysis.verificationTasks;
    setAnalysis(updatedResult);
  };

  const handleTogglePriority = (priorityId: string) => {
    const updatedPriorities = analysis.priorities.map(p => 
      p.id === priorityId ? { ...p, selected: !p.selected, sourceType: 'user-supplied' as const } : p
    );
    const completedIds = analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id);
    const updatedResult = analyzeScenario(
      scenarioStatement,
      analysis.editableGoal,
      analysis.constraints,
      updatedPriorities,
      analysis.optionalStakeholders,
      scenarioSourceType === 'bundled-demo',
      completedIds
    );
    updatedResult.verificationTasks = analysis.verificationTasks;
    setAnalysis(updatedResult);
  };

  const handleUpdateStakeholders = (updatedStakeholders: StakeholderConsideration[]) => {
    const completedIds = analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id);
    const updatedResult = analyzeScenario(
      scenarioStatement,
      analysis.editableGoal,
      analysis.constraints,
      analysis.priorities,
      updatedStakeholders,
      scenarioSourceType === 'bundled-demo',
      completedIds
    );
    updatedResult.verificationTasks = analysis.verificationTasks;
    setAnalysis(updatedResult);
  };

  const handleToggleFlagAssumption = (assumption: string) => {
    setFlaggedAssumptions(prev =>
      prev.includes(assumption)
        ? prev.filter(a => a !== assumption)
        : [...prev, assumption]
    );
  };

  const handleToggleVerificationTask = (taskId: string) => {
    setAnalysis(prev => {
      const nextTasks = prev.verificationTasks.map(t =>
        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      );
      const completedIds = nextTasks.filter(t => t.isCompleted).map(t => t.id);
      const updatedResult = analyzeScenario(
        scenarioStatement,
        prev.editableGoal,
        prev.constraints,
        prev.priorities,
        prev.optionalStakeholders,
        scenarioSourceType === 'bundled-demo',
        completedIds
      );
      updatedResult.verificationTasks = nextTasks;
      return updatedResult;
    });
  };

  const handleAddVerificationTask = (newTask: { title: string; description: string; category: string }) => {
    const task: VerificationTask = {
      id: `v-custom-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      isCompleted: false,
      sourceType: 'user-supplied'
    };
    setAnalysis(prev => ({
      ...prev,
      verificationTasks: [...prev.verificationTasks, task]
    }));
  };

  const handleResetToTemplate = () => {
    const isDemo = scenarioSourceType === 'bundled-demo';
    const resetResult = analyzeScenario(
      scenarioStatement,
      undefined,
      undefined,
      undefined,
      undefined,
      isDemo,
      []
    );
    setAnalysis(resetResult);
    setGoalSourceType(isDemo ? 'bundled-demo' : 'rule-engine');
    setSelectedOption(resetResult.options[0] || null);
    setFlaggedAssumptions([]);
    setUserDecisionStance('investigating');
    setUserDecisionNote('');
  };

  const handleExportSummary = async () => {
    let summary = `LIFE — LifeLens Decision Assessment\n`;
    summary += `Human Oversight Principle: AI helps you think. You decide.\n`;
    summary += `====================================\n`;
    summary += `Scenario (${scenarioSourceType}): "${scenarioStatement}"\n`;
    summary += `Category: ${analysis.categoryLabel}\n`;
    summary += `Objective: ${analysis.editableGoal}\n`;
    summary += `Verdict: ${analysis.assessment.verdict}\n`;
    summary += `Rationale: ${analysis.assessment.rationale}\n`;
    summary += `User Decision Stance: ${userDecisionStance}\n\n`;

    summary += `WHY THIS RESULT (TRANSPARENCY):\n`;
    summary += `- Factors Considered: ${analysis.whyThisResult.factorsConsidered.join(' | ')}\n`;
    summary += `- Active Priorities: ${analysis.whyThisResult.userPriorities.join(', ')}\n`;
    summary += `- Assumptions: ${analysis.whyThisResult.assumptionsMade.join(' | ')}\n`;
    summary += `- Unknowns: ${analysis.whyThisResult.unknownsIdentified.join(' | ')}\n\n`;

    summary += `FORESIGHT SCAN FINDINGS:\n`;
    analysis.findings.forEach(f => {
      summary += `- [${f.priority.toUpperCase()}] ${f.title} (${f.dimension})\n`;
      summary += `  Why: ${f.whyItMatters}\n`;
      summary += `  Action: ${f.practicalAction}\n\n`;
    });

    summary += `VERIFICATION TASKS:\n`;
    analysis.verificationTasks.forEach(v => {
      summary += `- [${v.isCompleted ? 'X' : ' '}] ${v.title} (${v.category})\n`;
    });

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        // Ignore fallback failure
      }
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInitiateHandoff = () => {
    const context: SharedDecisionContext = {
      scenarioStatement,
      scenarioSourceType,
      category: analysis.category,
      categoryLabel: analysis.categoryLabel,
      userGoal: analysis.editableGoal,
      goalSourceType,
      selectedOption: selectedOption || analysis.options[0] || null,
      constraints: analysis.constraints,
      priorities: analysis.priorities,
      stakeholders: analysis.optionalStakeholders,
      includeStakeholders: analysis.optionalStakeholders.some(s => s.isIncluded),
      flaggedAssumptions,
      userDecisionStance,
      userNotes: userDecisionNote,
      isPresentationDemo: scenarioSourceType === 'bundled-demo',
      demoScenarioId: validInitialContext?.demoScenarioId,
      verificationTasks: analysis.verificationTasks,
      completedVerificationTaskIds: analysis.verificationTasks.filter(t => t.isCompleted).map(t => t.id),
      resolvedFindingIds: [],
      timestamp: Date.now()
    };
    onTransferToLifeRoute(context);
  };

  const unresolvedHighRiskCount = analysis.findings.filter(
    f => f.priority === 'Critical' || f.priority === 'High'
  ).length;

  return (
    <div className="py-8 md:py-12 bg-[#FAF8F5] min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar: Return & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-md py-1 px-2 -ml-2 self-start cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Overview</span>
            </button>
            {handleStartFreshScenario && (
              <>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={handleStartFreshScenario}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors py-1 px-2 rounded-md hover:bg-violet-50 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-violet-600" />
                  <span>New Scenario</span>
                </button>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Reset Analysis */}
            <button
              type="button"
              onClick={handleResetToTemplate}
              title="Reset constraints, priorities, and tasks to defaults for this scenario"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            {/* Export Summary */}
            <button
              type="button"
              onClick={handleExportSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export</span>
                </>
              )}
            </button>

            {/* Build My Route CTA Button */}
            <button
              type="button"
              onClick={handleInitiateHandoff}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
            >
              <span>Build my route</span>
              <Compass className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Governance & Privacy by Design Bar */}
        <PrivacyOversightBar compact />

        {/* Information Source Labels Legend Bar */}
        <InformationLegendBar isDemoMode={scenarioSourceType === 'bundled-demo'} />

        {/* User Decision Statement Card (Editable) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-100/70 px-2.5 py-0.5 rounded-full">
                LifeLens Decision Workspace
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-slate-600">
                Category: {analysis.categoryLabel}
              </span>
              <InformationSourceBadge sourceType={scenarioSourceType} />
              {analysis.isCustomFallback && (
                <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  General Heuristic Template
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isEditingScenario && (
                <button
                  type="button"
                  onClick={() => {
                    setScenarioDraft(scenarioStatement);
                    setScenarioEditError(null);
                    setIsEditingScenario(true);
                  }}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-slate-500" />
                  <span>Edit Scenario</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRegenerate()}
                disabled={isRegenerating}
                className="text-xs font-semibold text-violet-700 hover:text-violet-900 inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-violet-200 hover:bg-violet-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? 'Analyzing...' : 'Re-analyze'}</span>
              </button>
            </div>
          </div>

          {/* Scenario Text / Edit View */}
          {isEditingScenario ? (
            <div className="space-y-3">
              <label htmlFor="lifelens-scenario-editor" className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Update Scenario Statement:
              </label>
              <textarea
                id="lifelens-scenario-editor"
                rows={3}
                value={scenarioDraft}
                onChange={(e) => {
                  setScenarioDraft(e.target.value);
                  if (scenarioEditError) setScenarioEditError(null);
                }}
                className={`w-full text-base p-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 ${
                  scenarioEditError
                    ? 'border-red-300 focus:ring-red-500/20'
                    : 'border-violet-400 focus:ring-violet-500/20'
                }`}
              />
              {scenarioEditError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-800" role="alert">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{scenarioEditError}</span>
                </div>
              )}
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setScenarioDraft(scenarioStatement);
                    setScenarioEditError(null);
                    setIsEditingScenario(false);
                  }}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveScenarioEdit}
                  className="px-4 py-1.5 text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 rounded-lg shadow-xs cursor-pointer"
                >
                  Save &amp; Regenerate
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Active Decision Statement
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug break-words">
                “{scenarioStatement}”
              </h1>
            </div>
          )}
        </div>

        {/* 1. Cautious Assessment Banner with "Why this result?" Transparency Panel */}
        <AssessmentBanner
          assessment={analysis.assessment}
          whyThisResult={analysis.whyThisResult}
          isCustomFallback={analysis.isCustomFallback}
          sourceType={scenarioSourceType}
          flaggedAssumptions={flaggedAssumptions}
          onToggleFlagAssumption={handleToggleFlagAssumption}
        />

        {/* 2. Editable Goal, Constraints, and Priorities Editor */}
        <ConstraintsPrioritiesEditor
          goal={analysis.editableGoal}
          goalSourceType={goalSourceType}
          onUpdateGoal={handleUpdateGoal}
          constraints={analysis.constraints}
          onUpdateConstraints={handleUpdateConstraints}
          priorities={analysis.priorities}
          onTogglePriority={handleTogglePriority}
        />

        {/* 3. Optional Stakeholder Considerations (Non-Assumptive) */}
        <StakeholderConsiderationPanel
          stakeholders={analysis.optionalStakeholders}
          onUpdateStakeholders={handleUpdateStakeholders}
        />

        {/* 4. Calibrated Risk & Foresight Scan (6 Vectors prioritized by seriousness & relevance) */}
        <ForesightScanView
          findings={analysis.findings}
        />

        {/* 5. Multi-Alternative Options & Tradeoffs Matrix */}
        <OptionsMatrix
          options={analysis.options}
          selectedOptionId={selectedOption?.id || analysis.options[0]?.id}
          onSelectOption={(opt) => setSelectedOption(opt)}
        />

        {/* 6. Mandatory Verification Tasks Checklist */}
        <VerificationTasksList
          tasks={analysis.verificationTasks}
          onToggleTask={handleToggleVerificationTask}
          onAddTask={handleAddVerificationTask}
        />

        {/* 7. Accountability & Human Oversight Ledger */}
        <AccountabilitySummaryPanel
          mode="lifelens"
          verificationTasks={analysis.verificationTasks}
          assumptions={analysis.whyThisResult.assumptionsMade}
          flaggedAssumptions={flaggedAssumptions}
          unresolvedHighRiskCount={unresolvedHighRiskCount}
          userDecisionStance={userDecisionStance}
          onUpdateDecisionStance={setUserDecisionStance}
          userDecisionNote={userDecisionNote}
          onUpdateDecisionNote={setUserDecisionNote}
        />

        {/* 8. Clarification Follow-up Questions (if applicable) */}
        {analysis.followUpQuestions && (
          <FollowUpQuestionsPanel
            questions={analysis.followUpQuestions}
            isCustomFallback={analysis.isCustomFallback}
          />
        )}

        {/* 9. Suggested Next Actions & Transfer into LifeRoute */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  <ListOrdered className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Action Horizon</span>
                </div>
                <InformationSourceBadge sourceType="rule-engine" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Recommended Next Actions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Concrete steps to resolve uncertainty before committing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleInitiateHandoff}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <span>Build my route</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.suggestedNextActions.map((action, idx) => (
              <div
                key={action.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      Step 0{idx + 1}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      action.urgency === 'Immediate'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : action.urgency === 'Before Signing'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {action.urgency}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {action.step}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700 block text-[10px] uppercase">Why this step:</span>
                  <span>{action.why}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
