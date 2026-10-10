import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Scale
} from 'lucide-react';
import { DecisionAssessment, InformationSourceType, WhyThisResult } from '../../types/decision';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface AssessmentBannerProps {
  assessment: DecisionAssessment;
  whyThisResult: WhyThisResult;
  isCustomFallback: boolean;
  sourceType?: InformationSourceType;
  flaggedAssumptions?: string[];
  onToggleFlagAssumption?: (assumption: string) => void;
}

export const AssessmentBanner: React.FC<AssessmentBannerProps> = ({
  assessment,
  whyThisResult,
  sourceType = 'rule-engine',
  flaggedAssumptions = [],
  onToggleFlagAssumption
}) => {
  const [isWhyExpanded, setIsWhyExpanded] = useState<boolean>(true);

  const getVerdictBadge = () => {
    switch (assessment.verdictColor) {
      case 'amber':
        return {
          bg: 'bg-amber-50/70',
          border: 'border-amber-200',
          text: 'text-amber-900',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        };
      case 'purple':
        return {
          bg: 'bg-violet-50/70',
          border: 'border-violet-200',
          text: 'text-violet-900',
          badgeBg: 'bg-violet-100 text-violet-800 border-violet-300',
          icon: <HelpCircle className="w-5 h-5 text-violet-600 shrink-0" />
        };
      case 'blue':
        return {
          bg: 'bg-blue-50/70',
          border: 'border-blue-200',
          text: 'text-blue-900',
          badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Scale className="w-5 h-5 text-blue-600 shrink-0" />
        };
      default:
        return {
          bg: 'bg-emerald-50/70',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
        };
    }
  };

  const style = getVerdictBadge();

  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} p-5 sm:p-6 shadow-sm transition-all`}>
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white shadow-xs mt-0.5">
            {style.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Decision Support Assessment
              </span>
              <InformationSourceBadge sourceType="rule-engine" />
              {sourceType === 'bundled-demo' && (
                <InformationSourceBadge sourceType="bundled-demo" />
              )}
              <span className="text-slate-300">·</span>
              <span className="text-[11px] font-mono text-slate-600">
                {assessment.confidenceNote}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>{assessment.verdict}</span>
            </h2>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed max-w-3xl break-words">
              {assessment.rationale}
            </p>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              <strong>AI helps you think. You decide.</strong> This assessment organizes factors and risks to support your judgment; it does not guarantee outcomes or replace qualified professional advice.
            </p>
          </div>
        </div>

        {/* Toggle Button for "Why this result?" */}
        <button
          type="button"
          onClick={() => setIsWhyExpanded(!isWhyExpanded)}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-2xs transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 cursor-pointer"
          aria-expanded={isWhyExpanded}
        >
          <HelpCircle className="w-3.5 h-3.5 text-violet-300" />
          <span>Why this result?</span>
          {isWhyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Key Diagnostic Signals */}
      {assessment.keySignals && assessment.keySignals.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Primary Factors Driving This Assessment:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {assessment.keySignals.map((sig, idx) => (
              <div key={idx} className="bg-white/90 p-2.5 rounded-lg border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2">
                <span className="text-slate-400 font-bold font-mono text-[11px]">0{idx + 1}.</span>
                <span className="leading-snug">{sig}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable "Why this result?" Transparency Panel */}
      {isWhyExpanded && (
        <div className="mt-5 pt-5 border-t border-slate-200 space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              <Info className="w-4 h-4 text-violet-600" />
              <span>Why this result? — Factors, Priorities, Assumptions, Unknowns &amp; Limitations</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Click or press Enter on any assumption below to challenge it if it does not apply to your situation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* 1. Factors Considered */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                <span className="font-bold text-slate-900">
                  1. Factors Considered ({whyThisResult.factorsConsidered.length})
                </span>
                <InformationSourceBadge sourceType="rule-engine" />
              </div>
              <ul className="space-y-1.5 text-slate-600">
                {whyThisResult.factorsConsidered.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 break-words">
                    <span className="text-violet-500 font-bold">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Assumptions Made (Interactive) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                <span className="font-bold text-slate-900">
                  2. Assumptions ({whyThisResult.assumptionsMade.length})
                </span>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  {flaggedAssumptions.length > 0 ? `${flaggedAssumptions.length} challenged` : 'Interactive'}
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-600">
                {whyThisResult.assumptionsMade.map((a, i) => {
                  const isFlagged = flaggedAssumptions.includes(a);
                  return (
                    <li
                      key={i}
                      role={onToggleFlagAssumption ? 'button' : undefined}
                      tabIndex={onToggleFlagAssumption ? 0 : undefined}
                      aria-pressed={onToggleFlagAssumption ? isFlagged : undefined}
                      onClick={() => onToggleFlagAssumption?.(a)}
                      onKeyDown={(e) => {
                        if (onToggleFlagAssumption && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          onToggleFlagAssumption(a);
                        }
                      }}
                      className={`p-1.5 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                        onToggleFlagAssumption ? 'cursor-pointer' : ''
                      } ${
                        isFlagged
                          ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                          : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5 break-words">
                          <span className="text-amber-500 font-bold">·</span>
                          <span>{a}</span>
                        </div>
                        {onToggleFlagAssumption && (
                          <span className="text-[10px] font-mono uppercase shrink-0 text-amber-700 underline">
                            {isFlagged ? 'Flagged' : 'Challenge'}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 3. Unknowns Identified */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                <span className="font-bold text-slate-900">
                  3. Unknown Information ({whyThisResult.unknownsIdentified.length})
                </span>
                <InformationSourceBadge sourceType="external-verification-required" />
              </div>
              <ul className="space-y-1.5 text-slate-600">
                {whyThisResult.unknownsIdentified.map((u, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">·</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. User Priorities Mapped */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                <span className="font-bold text-slate-900">
                  4. User Priorities ({whyThisResult.userPriorities.length})
                </span>
                <InformationSourceBadge sourceType={sourceType === 'bundled-demo' ? 'bundled-demo' : 'user-supplied'} />
              </div>
              <ul className="space-y-1.5 text-slate-600">
                {whyThisResult.userPriorities.length > 0 ? (
                  whyThisResult.userPriorities.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400 italic">No specific priority overrides selected.</li>
                )}
              </ul>
            </div>

            {/* 5. Concrete Limitations */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 md:col-span-2">
              <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                <span className="font-bold text-slate-900">
                  5. Limitations &amp; Scope Boundary
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  AI helps you think. You decide.
                </span>
              </div>
              <ul className="space-y-1.5 text-slate-600">
                {whyThisResult.limitations.map((l, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">!</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
