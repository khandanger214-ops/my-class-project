import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Edit3, 
  Split,
  Check,
  Scale
} from 'lucide-react';
import { SharedDecisionContext } from '../../types/sharedContext';
import { DecisionConstraint } from '../../types/decision';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface RouteHandoffReviewScreenProps {
  decisionContext: SharedDecisionContext;
  onConfirmAndGenerate: (updatedContext: SharedDecisionContext) => void;
  onBackToLifeLens: () => void;
}

export const RouteHandoffReviewScreen: React.FC<RouteHandoffReviewScreenProps> = ({
  decisionContext,
  onConfirmAndGenerate,
  onBackToLifeLens
}) => {
  // Transition animation state (respects prefers-reduced-motion)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [transitionProgress, setTransitionProgress] = useState<number>(prefersReducedMotion ? 100 : 15);
  const [transitionComplete, setTransitionComplete] = useState<boolean>(prefersReducedMotion);

  // Editable fields
  const [goal, setGoal] = useState<string>(decisionContext.userGoal);
  const [selectedOptionName, setSelectedOptionName] = useState<string>(
    decisionContext.selectedOption?.name || 'Standard Structured Implementation'
  );
  const [constraints, setConstraints] = useState<DecisionConstraint[]>(
    decisionContext.constraints
  );
  const [editingConstraintId, setEditingConstraintId] = useState<string | null>(null);
  const [constraintDraftValue, setConstraintDraftValue] = useState<string>('');

  useEffect(() => {
    setGoal(decisionContext.userGoal);
    setSelectedOptionName(decisionContext.selectedOption?.name || 'Standard Structured Implementation');
    setConstraints(decisionContext.constraints);
  }, [decisionContext]);

  // Deliberate transition message sequence
  useEffect(() => {
    if (transitionComplete) return;
    const timer = setInterval(() => {
      setTransitionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTransitionComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [transitionComplete]);

  const handleStartEditConstraint = (c: DecisionConstraint) => {
    setEditingConstraintId(c.id);
    setConstraintDraftValue(c.value);
  };

  const handleSaveConstraint = (id: string) => {
    if (constraintDraftValue.trim()) {
      setConstraints(prev =>
        prev.map(c => c.id === id ? { ...c, value: constraintDraftValue.trim(), sourceType: 'user-supplied' } : c)
      );
    }
    setEditingConstraintId(null);
  };

  const handleProceed = () => {
    const trimmedGoal = goal.trim() || decisionContext.userGoal;
    const isGoalEdited = trimmedGoal !== decisionContext.userGoal;
    const updatedContext: SharedDecisionContext = {
      ...decisionContext,
      userGoal: trimmedGoal,
      goalSourceType: isGoalEdited ? 'user-supplied' : decisionContext.goalSourceType,
      constraints,
      selectedOption: decisionContext.selectedOption ? {
        ...decisionContext.selectedOption,
        name: selectedOptionName.trim() || decisionContext.selectedOption.name
      } : {
        id: 'opt-custom',
        name: selectedOptionName.trim() || 'Standard Structured Implementation',
        summary: 'User-specified planning direction',
        pros: [],
        cons: [],
        sourceType: 'user-supplied'
      },
      timestamp: Date.now()
    };
    onConfirmAndGenerate(updatedContext);
  };

  // Interstitial deliberate transition card
  if (!transitionComplete) {
    return (
      <div className="py-16 md:py-24 bg-[#FAF8F5] min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-8 h-8 animate-pulse text-violet-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
              LIFE Workflow Transition
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              “Turning your decision into a route”
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Carrying over your evaluated objectives, boundary constraints, and foresight invariants into an actionable action route.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2 max-w-md mx-auto text-left">
            <div className="flex justify-between text-[11px] font-mono text-slate-500 font-medium">
              <span>Synthesizing parameters...</span>
              <span>{Math.min(transitionProgress, 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-300" 
                style={{ width: `${transitionProgress}%` }}
              />
            </div>
          </div>

          {/* Animated Checklist items */}
          <div className="space-y-2 text-left max-w-sm mx-auto text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${transitionProgress >= 25 ? 'opacity-100 text-emerald-800' : 'opacity-40'}`}>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Transferred scenario: “{decisionContext.scenarioStatement.slice(0, 36)}...”</span>
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${transitionProgress >= 50 ? 'opacity-100 text-emerald-800' : 'opacity-40'}`}>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Boundaries & constraints locked</span>
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${transitionProgress >= 75 ? 'opacity-100 text-emerald-800' : 'opacity-40'}`}>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Chronological action milestones prepared</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setTransitionComplete(true)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors underline"
            >
              Skip directly to review screen →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Review Screen
  return (
    <div className="py-8 md:py-12 bg-[#FAF8F5] min-h-[calc(100vh-8rem)] animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        
        {/* Navigation Control */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <button
            type="button"
            onClick={onBackToLifeLens}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-md py-1 px-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to LifeLens Evaluation</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
              <Scale className="w-3 h-3 text-violet-600" />
              <span>AI helps you think. You decide.</span>
            </span>
            <span className="text-xs font-mono text-slate-500">
              Step 03 · Review & Transition
            </span>
          </div>
        </div>

        {/* Polished Deliberate Transition Banner */}
        <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Deliberate Workflow Transition</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              “Turning your decision into a route”
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              We are carrying over your evaluated objectives, boundary constraints, and foresight invariants into an ordered, chronological milestone pathway.
            </p>
          </div>
        </div>

        {/* Explicit Non-Assumption Guardrail Banner */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block text-slate-900">
              Accountability & Human Oversight: No Forced Commitment
            </span>
            <p className="text-amber-900">
              <strong>AI helps you think. You decide.</strong> LIFE does not silently convert uncertain suggestions into binding user commitments. Selecting an option here establishes your working planning hypothesis so LifeRoute can generate dependencies. You retain full decision authority and can revise this direction at any point.
            </p>
          </div>
        </div>

        {/* Review & Edit Transferred Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Review & Confirm Transferred Decision Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify or edit how your LifeLens findings map into LifeRoute.
              </p>
            </div>
            <InformationSourceBadge
              sourceType={decisionContext.scenarioSourceType || 'user-supplied'}
              size="xs"
            />
          </div>

          {/* 1. Transferred Scenario & Selected Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Evaluated Scenario
                </span>
                <InformationSourceBadge
                  sourceType={decisionContext.scenarioSourceType || 'user-supplied'}
                  size="xs"
                />
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                “{decisionContext.scenarioStatement}”
              </p>
              <span className="text-[11px] text-slate-500 block pt-1">
                Category: {decisionContext.categoryLabel}
              </span>
            </div>

            <div className="bg-violet-50/60 p-4 rounded-xl border border-violet-200 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-800 flex items-center gap-1">
                  <Split className="w-3 h-3 text-violet-600" />
                  <span>Chosen Planning Direction / Strategy</span>
                </span>
                <InformationSourceBadge sourceType="user-supplied" size="xs" />
              </div>
              <input
                type="text"
                value={selectedOptionName}
                onChange={(e) => setSelectedOptionName(e.target.value)}
                className="w-full p-2 bg-white rounded-lg border border-violet-300 text-xs font-semibold text-violet-950 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                placeholder="Name your planning strategy"
              />
              <span className="text-[10px] text-violet-700 block pt-0.5">
                Click to edit strategy title for this route
              </span>
            </div>
          </div>

          {/* 2. Editable Goal Statement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Transferred Objective & Desired Outcome (Editable)</span>
              </label>
              <InformationSourceBadge sourceType="user-supplied" size="xs" />
            </div>
            <textarea
              rows={2}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
              placeholder="Define the primary operational outcome for LifeRoute..."
            />
          </div>

          {/* 3. Transferred Constraints & Boundary Limits (Editable) */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                <span>Boundary Constraints (Transferred from LifeLens)</span>
              </span>
              <span className="text-[11px] text-slate-400">Click edit icon to modify values</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {constraints.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs flex items-center justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-semibold text-slate-700 block truncate">{c.label}:</span>
                      {c.sourceType && (
                        <InformationSourceBadge sourceType={c.sourceType} size="xs" />
                      )}
                    </div>
                    {editingConstraintId === c.id ? (
                      <div className="flex items-center gap-1 mt-1">
                        <input
                          type="text"
                          value={constraintDraftValue}
                          onChange={(e) => setConstraintDraftValue(e.target.value)}
                          className="p-1 text-xs border border-blue-400 rounded bg-white flex-1 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveConstraint(c.id)}
                          className="px-2 py-1 text-[11px] bg-blue-600 text-white rounded font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-900 font-medium">{c.value}</span>
                    )}
                  </div>

                  {editingConstraintId !== c.id && (
                    <button
                      type="button"
                      onClick={() => handleStartEditConstraint(c)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200"
                      title="Edit parameter"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Active Priorities (Transferred) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Priorities Applied to Route Sequencing</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {decisionContext.priorities.filter(p => p.selected).map((p) => (
                <span
                  key={p.id}
                  className="bg-violet-50 text-violet-900 border border-violet-200 text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />
                  <span>{p.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onBackToLifeLens}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Decision Evaluation</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <span>Generate Action Route</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>

      </div>
    </div>
  );
};

