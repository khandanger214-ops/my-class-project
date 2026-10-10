import React, { useState } from 'react';
import { DecisionPriority, InformationSourceType, WhyThisResult } from '../../types/decision';
import { HelpCircle, ChevronDown, ChevronUp, Layers, Sliders, AlertCircle, EyeOff, Scale, CheckCircle2, Flag } from 'lucide-react';
import { InformationSourceBadge } from './InformationSourceBadge';

interface WhyThisResultPanelProps {
  whyThisResult: WhyThisResult;
  priorities?: DecisionPriority[];
  flaggedAssumptions?: string[];
  onToggleFlagAssumption?: (assumption: string) => void;
  sourceType?: InformationSourceType;
  contextTitle?: string;
  defaultExpanded?: boolean;
}

export const WhyThisResultPanel: React.FC<WhyThisResultPanelProps> = ({
  whyThisResult,
  priorities = [],
  flaggedAssumptions = [],
  onToggleFlagAssumption,
  sourceType = 'rule-engine',
  contextTitle = 'Decision Assessment & Foresight Scan',
  defaultExpanded = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const activePriorities = priorities.filter(p => p.selected);
  const displayedPriorities = activePriorities.length > 0
    ? activePriorities.map(p => p.label)
    : whyThisResult.userPriorities;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className="w-full px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none hover:bg-slate-800/95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-sm font-bold tracking-tight text-white">
                Why this result?
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-violet-300 border border-slate-700">
                Transparency & Reasoning Breakdown
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Factors considered, underlying assumptions, user priorities, unknown information, and limitations for {contextTitle}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <InformationSourceBadge sourceType={sourceType} />
          <span
            aria-hidden="true"
            className="text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700"
          >
            <span>{isExpanded ? 'Collapse' : 'Inspect reasoning'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* 1. Factors Considered */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-violet-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    1. Factors Considered ({whyThisResult.factorsConsidered.length})
                  </h4>
                </div>
                <InformationSourceBadge sourceType="rule-engine" />
              </div>
              <ul className="space-y-2">
                {whyThisResult.factorsConsidered.map((factor, idx) => (
                  <li key={idx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-1.5 shrink-0" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. User Priorities Influencing Ranking */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-violet-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    2. Active User Priorities ({displayedPriorities.length})
                  </h4>
                </div>
                <InformationSourceBadge
                  sourceType={priorities.some(p => p.sourceType === 'user-supplied') ? 'user-supplied' : sourceType}
                />
              </div>
              {displayedPriorities.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-500 mb-2">
                    Findings and options are prioritized by seriousness and relevance to these active priorities:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {displayedPriorities.map((label, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-violet-200 text-xs font-semibold text-violet-900"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard baseline weighting applied across safety, financial exposure, and timeline feasibility. Toggle priorities in the workspace to re-rank findings.
                </p>
              )}
            </div>

            {/* 3. Underlying Assumptions (Interactive Accountability) */}
            <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    3. Assumptions Influencing Assessment ({whyThisResult.assumptionsMade.length})
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                  {flaggedAssumptions.length > 0
                    ? `${flaggedAssumptions.length} challenged by you`
                    : 'Click to challenge'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mb-3">
                The current assessment relies on these default assumptions. If an assumption does not hold for your situation, flag it to track it in your Accountability checklist:
              </p>
              <ul className="space-y-2">
                {whyThisResult.assumptionsMade.map((assumption, idx) => {
                  const isFlagged = flaggedAssumptions.includes(assumption);
                  return (
                    <li
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-3 ${
                        isFlagged
                          ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                          : 'bg-white border-amber-200/70 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <span className={isFlagged ? 'font-medium' : ''}>{assumption}</span>
                          {isFlagged && (
                            <span className="block text-[10px] font-mono text-amber-800 mt-1">
                              Flagged: You indicated this assumption needs verification or does not apply.
                            </span>
                          )}
                        </div>
                      </div>
                      {onToggleFlagAssumption && (
                        <button
                          type="button"
                          onClick={() => onToggleFlagAssumption(assumption)}
                          className={`shrink-0 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                            isFlagged
                              ? 'bg-amber-700 text-white border-amber-800 hover:bg-amber-800'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300'
                          }`}
                        >
                          {isFlagged ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Flagged</span>
                            </>
                          ) : (
                            <>
                              <Flag className="w-3 h-3" />
                              <span>Does not apply?</span>
                            </>
                          )}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 4. Unknown Information */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-slate-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    4. Unknown Information ({whyThisResult.unknownsIdentified.length})
                  </h4>
                </div>
                <InformationSourceBadge sourceType="external-verification-required" />
              </div>
              <p className="text-[11px] text-slate-600 mb-3">
                Information not present in your prompt that cannot be known without external documents or direct inspection:
              </p>
              <ul className="space-y-2">
                {whyThisResult.unknownsIdentified.map((unknown, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded-lg bg-white border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2"
                  >
                    <span className="text-slate-400 font-mono text-[10px] mt-0.5">[?]</span>
                    <span>{unknown}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Engine Limitations & Human Oversight */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-violet-400 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  5. System Limitations & Scope Boundary
                </h4>
              </div>
              <ul className="space-y-1">
                {whyThisResult.limitations.map((limitation, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-72 shrink-0 p-3.5 rounded-lg bg-slate-800/90 border border-slate-700">
              <div className="text-[10px] font-mono uppercase tracking-widest text-violet-300 font-semibold mb-1">
                Human Oversight Principle
              </div>
              <div className="text-sm font-bold text-white mb-1">
                “AI helps you think. You decide.”
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                This tool structures trade-offs and checklists to support your judgment. It does not guarantee outcomes or replace qualified legal, financial, tax, or mechanical professionals.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
