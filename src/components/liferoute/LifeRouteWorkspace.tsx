import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Eye, 
  Copy, 
  Check, 
  Info, 
  Target, 
  Edit3,
  PlusCircle,
  ShieldAlert
} from 'lucide-react';
import { RouteData, LifeLensHandoffContext } from '../../types/route';
import { StakeholderConsideration, UserDecisionStance } from '../../types/decision';
import { generateRouteForScenario, checkPrerequisites } from '../../engine/routeGenerator';
import { validateScenarioInput } from '../../engine/classifier';
import { RouteStepCard } from './RouteStepCard';
import { RouteStepDetailPanel } from './RouteStepDetailPanel';
import { RouteProgressBar } from './RouteProgressBar';
import { RouteHandoffReviewModal } from './RouteHandoffReviewModal';
import { InformationSourceBadge, InformationLegendBar } from '../governance/InformationSourceBadge';
import { WhyThisResultPanel } from '../governance/WhyThisResultPanel';
import { StakeholderConsiderationPanel } from '../governance/StakeholderConsiderationPanel';
import { AccountabilitySummaryPanel } from '../governance/AccountabilitySummaryPanel';
import { PrivacyOversightBar } from '../governance/PrivacyOversightBar';

interface LifeRouteWorkspaceProps {
  initialScenarioText: string;
  handoffContext?: LifeLensHandoffContext;
  existingRouteData?: RouteData | null;
  onUpdateRouteData?: (route: RouteData) => void;
  onReturnHome: () => void;
  onResetScenario?: () => void;
  onSwitchToLifeLens: () => void;
}

export const LifeRouteWorkspace: React.FC<LifeRouteWorkspaceProps> = ({
  initialScenarioText,
  handoffContext,
  existingRouteData,
  onUpdateRouteData,
  onReturnHome,
  onResetScenario,
  onSwitchToLifeLens
}) => {
  const [showHandoffReview, setShowHandoffReview] = useState<boolean>(false);

  const [activeHandoff, setActiveHandoff] = useState<LifeLensHandoffContext | undefined>(
    handoffContext
  );

  // Guard against stale existingRouteData from a different scenario
  const validExistingRoute =
    existingRouteData &&
    (!existingRouteData.scenarioStatement ||
      existingRouteData.scenarioStatement.trim() === initialScenarioText.trim())
      ? existingRouteData
      : null;

  // Initialize Route from validExistingRoute if available, otherwise generate
  const [route, setRoute] = useState<RouteData>(() =>
    validExistingRoute || generateRouteForScenario(initialScenarioText, handoffContext)
  );

  const [selectedStepId, setSelectedStepId] = useState<string>(
    route.steps[0]?.id || ''
  );

  const [filterMode, setFilterMode] = useState<'all' | 'incomplete' | 'completed' | 'blocked'>('all');
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [goalDraft, setGoalDraft] = useState<string>(route.goal);
  const [goalError, setGoalError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Governance & Accountability state within LifeRoute
  const [flaggedAssumptions, setFlaggedAssumptions] = useState<string[]>(
    validExistingRoute?.flaggedAssumptions || handoffContext?.flaggedAssumptions || []
  );
  const [userStance, setUserStance] = useState<UserDecisionStance>(
    validExistingRoute?.userDecisionStance || handoffContext?.userDecisionStance || 'investigating'
  );
  const [userDecisionNote, setUserDecisionNote] = useState<string>(
    validExistingRoute?.userDecisionNote || handoffContext?.userDecisionNote || ''
  );
  const [stakeholders, setStakeholders] = useState<StakeholderConsideration[]>(
    route.stakeholders || []
  );

  const prevScenarioRef = React.useRef<string>(initialScenarioText);
  const isInitialMount = React.useRef<boolean>(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (prevScenarioRef.current !== initialScenarioText) {
      prevScenarioRef.current = initialScenarioText;
      const newRoute = generateRouteForScenario(initialScenarioText, activeHandoff);
      setRoute(newRoute);
      setGoalDraft(newRoute.goal);
      setGoalError(null);
      setStakeholders(newRoute.stakeholders || []);
      setFlaggedAssumptions(newRoute.flaggedAssumptions || []);
      setUserStance(newRoute.userDecisionStance || 'investigating');
      setUserDecisionNote(newRoute.userDecisionNote || '');
      if (newRoute.steps.length > 0) {
        setSelectedStepId(newRoute.steps[0].id);
      }
    }
  }, [initialScenarioText, activeHandoff]);

  useEffect(() => {
    onUpdateRouteData?.({
      ...route,
      stakeholders,
      flaggedAssumptions,
      userDecisionStance: userStance,
      userDecisionNote
    });
  }, [route, stakeholders, flaggedAssumptions, userStance, userDecisionNote]);

  const handleConfirmHandoff = (confirmedContext: LifeLensHandoffContext) => {
    setActiveHandoff(confirmedContext);
    const updatedRoute = generateRouteForScenario(initialScenarioText, confirmedContext);
    setRoute(updatedRoute);
    setGoalDraft(updatedRoute.goal);
    setGoalError(null);
    setShowHandoffReview(false);
  };

  const handleToggleStepComplete = (stepId: string) => {
    setRoute(prev => ({
      ...prev,
      steps: prev.steps.map(s => 
        s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s
      )
    }));
  };

  const handleUpdateNotes = (stepId: string, notes: string) => {
    setRoute(prev => ({
      ...prev,
      steps: prev.steps.map(s => 
        s.id === stepId ? { ...s, userNotes: notes } : s
      )
    }));
  };

  const handleSaveGoal = () => {
    const validation = validateScenarioInput(goalDraft, 'route');
    if (!validation.isValid) {
      setGoalError(validation.error);
      return;
    }
    setGoalError(null);
    setRoute(prev => ({
      ...prev,
      goal: goalDraft.trim(),
      goalSourceType: 'user-supplied'
    }));
    setIsEditingGoal(false);
  };

  const handleToggleFlagAssumption = (assumptionText: string) => {
    setFlaggedAssumptions(prev =>
      prev.includes(assumptionText)
        ? prev.filter(a => a !== assumptionText)
        : [...prev, assumptionText]
    );
  };

  const handleResetProgress = () => {
    setRoute(prev => ({
      ...prev,
      steps: prev.steps.map(s => ({ ...s, isCompleted: false }))
    }));
  };

  const handleStartOver = () => {
    const freshRoute = generateRouteForScenario(initialScenarioText, activeHandoff);
    setRoute(freshRoute);
    setGoalDraft(freshRoute.goal);
    setGoalError(null);
    setFlaggedAssumptions([]);
    setUserStance('investigating');
    setUserDecisionNote('');
    setStakeholders(freshRoute.stakeholders || []);
    if (freshRoute.steps.length > 0) {
      setSelectedStepId(freshRoute.steps[0].id);
    }
  };

  const handleExportRoute = async () => {
    let summary = `LIFE — LifeRoute Execution Plan\n`;
    summary += `===================================\n`;
    summary += `Governance Principle: AI helps you think. You decide.\n`;
    summary += `Route: ${route.title}\n`;
    summary += `Category: ${route.categoryLabel}\n`;
    summary += `Information Source: ${route.goalSourceType || 'rule-engine'}\n`;
    summary += `Goal: ${route.goal}\n`;
    summary += `Desired Outcome: ${route.desiredOutcome}\n`;
    summary += `User Decision Stance: ${userStance}\n`;
    if (route.totalEstimatedDuration) summary += `Estimated Horizon: ${route.totalEstimatedDuration}\n\n`;

    summary += `MILESTONES & PHASES:\n`;
    route.steps.forEach(s => {
      summary += `[${s.isCompleted ? 'COMPLETED' : 'PENDING'}] Step 0${s.stepNumber}: ${s.title} (${s.phaseName})\n`;
      summary += `  Description: ${s.shortSummary}\n`;
      summary += `  Next Action: ${s.nextAction}\n`;
      if (s.requiredDocuments.length > 0) {
        summary += `  Required Documents: ${s.requiredDocuments.join(', ')}\n`;
      }
      if (s.userNotes) {
        summary += `  Personal Note (User-Supplied): ${s.userNotes}\n`;
      }
      summary += `\n`;
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

  // Filter steps
  const filteredSteps = route.steps.filter(step => {
    if (filterMode === 'completed') return step.isCompleted;
    if (filterMode === 'incomplete') return !step.isCompleted;
    if (filterMode === 'blocked') {
      const prereq = checkPrerequisites(step, route.steps);
      return !step.isCompleted && !prereq.isMet;
    }
    return true;
  });

  const selectedStep = route.steps.find(s => s.id === selectedStepId) || route.steps[0];
  const selectedStepIndex = route.steps.findIndex(s => s.id === selectedStepId);

  const handleNextStep = selectedStepIndex < route.steps.length - 1
    ? () => setSelectedStepId(route.steps[selectedStepIndex + 1].id)
    : undefined;

  const handlePrevStep = selectedStepIndex > 0
    ? () => setSelectedStepId(route.steps[selectedStepIndex - 1].id)
    : undefined;

  return (
    <div className="py-8 md:py-12 bg-[#FAF8F5] min-h-[calc(100vh-4rem)]">
      {/* Review Modal on LifeLens handoff */}
      {showHandoffReview && activeHandoff && (
        <RouteHandoffReviewModal
          handoffContext={activeHandoff}
          onConfirm={handleConfirmHandoff}
          onCancel={() => {
            setShowHandoffReview(false);
            onSwitchToLifeLens();
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1 px-2 -ml-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onSwitchToLifeLens}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors py-1 px-2 rounded-md hover:bg-violet-50 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-violet-600" />
              <span>Switch to LifeLens</span>
            </button>
            {onResetScenario && (
              <>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={onResetScenario}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors py-1 px-2 rounded-md hover:bg-blue-50 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>New Scenario</span>
                </button>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Reset Progress */}
            <button
              type="button"
              onClick={handleResetProgress}
              title="Uncheck all completed steps"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Progress</span>
            </button>

            {/* Start Over */}
            <button
              type="button"
              onClick={handleStartOver}
              title="Reset all steps and notes"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Start Over</span>
            </button>

            {/* Export Roadmap */}
            <button
              type="button"
              onClick={handleExportRoute}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied Route</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export Route</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Privacy by Design & Human Oversight Bar + Information Provenance Legend */}
        <div className="space-y-2.5">
          <PrivacyOversightBar compact={true} />
          <InformationLegendBar />
        </div>

        {/* Route Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                LifeRoute Pathway Workspace
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-slate-600">
                {route.categoryLabel}
              </span>
              {activeHandoff?.selectedOptionName && (
                <span className="text-[11px] font-mono text-violet-800 bg-violet-50 px-2 py-0.5 rounded border border-violet-100">
                  Strategy: {activeHandoff.selectedOptionName}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {route.goalSourceType === 'bundled-demo' && (
                <InformationSourceBadge sourceType="bundled-demo" size="xs" />
              )}
              <InformationSourceBadge sourceType="rule-engine" size="xs" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {route.title}
            </h1>
          </div>

          {/* Editable Goal & Desired Outcome */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>Goal & Desired Outcome:</span>
                </span>
                <InformationSourceBadge sourceType="user-supplied" size="xs" />
              </div>
              {!isEditingGoal && (
                <button
                  type="button"
                  onClick={() => setIsEditingGoal(true)}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditingGoal ? (
              <div className="space-y-2">
                <textarea
                  rows={2}
                  value={goalDraft}
                  onChange={(e) => {
                    setGoalDraft(e.target.value);
                    if (goalError) setGoalError(null);
                  }}
                  aria-label="Edit route goal"
                  className={`w-full text-sm p-3 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 ${
                    goalError
                      ? 'border-red-300 focus:ring-red-500/20'
                      : 'border-blue-400 focus:ring-blue-500/20'
                  }`}
                />
                {goalError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-800" role="alert">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{goalError}</span>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingGoal(false);
                      setGoalDraft(route.goal);
                      setGoalError(null);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveGoal}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
                  >
                    Save Goal
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-150 text-xs sm:text-sm text-slate-800 space-y-1 break-words">
                <p className="font-semibold text-slate-900 break-words">{route.goal}</p>
                <p className="text-xs text-slate-600 break-words">{route.desiredOutcome}</p>
              </div>
            )}
          </div>
        </div>

        {/* 1. TRANSPARENCY: Why this result? Panel for Route Architecture */}
        {route.whyThisRoute && (
          <WhyThisResultPanel
            whyThisResult={route.whyThisRoute}
            flaggedAssumptions={flaggedAssumptions}
            onToggleFlagAssumption={handleToggleFlagAssumption}
            sourceType={route.goalSourceType || 'rule-engine'}
            contextTitle="LifeRoute Pathway Sequencing & Dependencies"
            defaultExpanded={false}
          />
        )}

        {/* Source Integrity Notice (if government / regulatory / official fees apply) */}
        {route.sourceIntegrityNotice && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold block mb-0.5">
                  Jurisdiction Integrity Notice · Authoritative Source Verification Required
                </span>
                {route.sourceIntegrityNotice}
              </div>
            </div>
            <InformationSourceBadge sourceType="external-verification-required" size="xs" />
          </div>
        )}

        {/* Progress Tracker Bar */}
        <RouteProgressBar
          steps={route.steps}
          totalDuration={route.totalEstimatedDuration}
        />

        {/* Journey Workspace: Steps List + Detail Inspector */}
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">
                Filter Steps:
              </span>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterMode === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Steps ({route.steps.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('incomplete')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterMode === 'incomplete'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Pending ({route.steps.filter(s => !s.isCompleted).length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('completed')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterMode === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Completed ({route.steps.filter(s => s.isCompleted).length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('blocked')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterMode === 'blocked'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Prerequisites Blocked ({
                  route.steps.filter(s => !s.isCompleted && !checkPrerequisites(s, route.steps).isMet).length
                })
              </button>
            </div>

            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Click any step to view details & execution requirements
            </span>
          </div>

          {/* Two-Column Responsive Layout: Step Cards (Left) & Detail Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Step Cards List */}
            <div className="lg:col-span-5 space-y-3">
              {filteredSteps.map((step) => (
                <RouteStepCard
                  key={step.id}
                  step={step}
                  allSteps={route.steps}
                  isSelected={step.id === selectedStepId}
                  onSelect={() => setSelectedStepId(step.id)}
                  onToggleComplete={(e) => {
                    e.stopPropagation();
                    handleToggleStepComplete(step.id);
                  }}
                />
              ))}

              {filteredSteps.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                  No steps match the active filter.
                </div>
              )}
            </div>

            {/* Right Column: Step Detail Panel */}
            <div className="lg:col-span-7 sticky top-20">
              {selectedStep ? (
                <RouteStepDetailPanel
                  step={selectedStep}
                  allSteps={route.steps}
                  onToggleComplete={() => handleToggleStepComplete(selectedStep.id)}
                  onUpdateNotes={(notes) => handleUpdateNotes(selectedStep.id, notes)}
                  onSelectStepById={(id) => setSelectedStepId(id)}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                />
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                  Select a step on the left to inspect its execution protocol.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. STAKEHOLDER CONSIDERATION: Optional, Non-Assumptive Section */}
        <StakeholderConsiderationPanel
          stakeholders={stakeholders}
          onUpdateStakeholders={setStakeholders}
        />

        {/* 5. ACCOUNTABILITY & HUMAN OVERSIGHT LEDGER */}
        <AccountabilitySummaryPanel
          mode="liferoute"
          routeSteps={route.steps}
          assumptions={route.whyThisRoute?.assumptionsMade || []}
          flaggedAssumptions={flaggedAssumptions}
          userDecisionStance={userStance}
          onUpdateDecisionStance={setUserStance}
          userDecisionNote={userDecisionNote}
          onUpdateDecisionNote={setUserDecisionNote}
        />

      </div>
    </div>
  );
};

