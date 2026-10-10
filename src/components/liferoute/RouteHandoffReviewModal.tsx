import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Edit3
} from 'lucide-react';
import { LifeLensHandoffContext } from '../../types/route';

interface RouteHandoffReviewModalProps {
  handoffContext: LifeLensHandoffContext;
  onConfirm: (confirmedContext: LifeLensHandoffContext) => void;
  onCancel: () => void;
}

export const RouteHandoffReviewModal: React.FC<RouteHandoffReviewModalProps> = ({
  handoffContext,
  onConfirm,
  onCancel
}) => {
  const [goal, setGoal] = useState<string>(handoffContext.userGoal || '');
  const [selectedOption, setSelectedOption] = useState<string>(
    handoffContext.selectedOptionName || 'Direct Execution As Planned'
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleProceed = () => {
    onConfirm({
      ...handoffContext,
      userGoal: goal.trim() || handoffContext.userGoal,
      selectedOptionName: selectedOption.trim() || handoffContext.selectedOptionName
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="handoff-review-modal-heading"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 animate-fadeIn">
        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-1">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>LifeLens → LifeRoute Handoff</span>
          </div>
          <h2 id="handoff-review-modal-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Review Context Before Generating Route
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You are moving from exploratory evaluation into actionable execution. Confirm or adjust your transferred parameters before generating this step-by-step pathway.
          </p>
        </div>

        {/* Transition Notice (Non-assumption disclaimer) */}
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Explicit Planning Assumption</span>
            Selecting an option here establishes your current working route template. It does not mean you have irrevocably committed to this decision in reality.
          </div>
        </div>

        {/* Transferred Fields */}
        <div className="space-y-4 text-xs">
          {/* Scenario Statement */}
          <div className="space-y-1">
            <span className="font-bold text-slate-500 uppercase text-[10px]">Transferred Scenario:</span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800">
              “{handoffContext.scenarioTitle}”
            </div>
          </div>

          {/* Editable Objective */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase text-[10px] flex items-center gap-1">
              <span>Goal & Desired Outcome (Editable):</span>
            </label>
            <textarea
              rows={2}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 rounded-xl border border-blue-400 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Refine your primary execution goal..."
            />
          </div>

          {/* Selected Strategy / Option Focus */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase text-[10px] block">
              Strategic Focus / Working Option:
            </label>
            <input
              type="text"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="E.g. Private party purchase with full mechanical verification"
            />
          </div>

          {/* Transferred Constraints and Priorities summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 uppercase text-[10px] block">
                Transferred Constraints:
              </span>
              {handoffContext.constraints && handoffContext.constraints.length > 0 ? (
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {handoffContext.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-blue-500 font-bold">·</span>
                      <span><strong>{c.label}:</strong> {c.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-400 italic">No custom constraints defined.</span>
              )}
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-700 uppercase text-[10px] block">
                Active Priorities:
              </span>
              {handoffContext.priorities && handoffContext.priorities.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {handoffContext.priorities.map((p, i) => (
                    <span key={i} className="bg-white px-2 py-0.5 rounded text-[10px] border border-slate-200 text-slate-700">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-400 italic">Standard balanced priorities.</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to LifeLens</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <span>Confirm & Generate Route</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
