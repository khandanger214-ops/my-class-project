import React from 'react';
import { Split, Check, Clock, DollarSign } from 'lucide-react';
import { TradeoffOption } from '../../types/decision';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface OptionsMatrixProps {
  options: TradeoffOption[];
  selectedOptionId?: string;
  onSelectOption?: (option: TradeoffOption) => void;
}

export const OptionsMatrix: React.FC<OptionsMatrixProps> = ({
  options,
  selectedOptionId,
  onSelectOption
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6" aria-label="Alternatives and Tradeoffs Matrix">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-100/70 px-2.5 py-0.5 rounded-full">
              <Split className="w-3.5 h-3.5 text-violet-600" />
              <span>Strategic Comparison &amp; Direction</span>
            </div>
            <InformationSourceBadge sourceType="rule-engine" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Viable Alternatives &amp; Trade-Offs
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            AI helps you think. You decide. Select a working planning direction to build your tailored action route.
          </p>
        </div>

        {selectedOptionId && (
          <span className="text-xs font-semibold text-violet-800 bg-violet-50 px-3 py-1 rounded-lg border border-violet-200 self-start sm:self-center">
            User-Selected Direction
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption?.(opt)}
              className={`rounded-xl border p-5 flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'bg-violet-50/40 border-violet-500 shadow-md ring-1 ring-violet-500'
                  : 'bg-slate-50/50 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div>
                {/* Option Header */}
                <div className="pb-3 border-b border-slate-200/80 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-violet-700 font-bold block">
                      Alternative 0{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded">
                        Active Direction
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {opt.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {opt.summary}
                  </p>
                </div>

                {/* Key Advantages */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1.5">
                    Core Upside & Pros
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {opt.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trade-offs & Cons */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1.5">
                    Risks & Downside Friction
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {opt.cons.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-amber-600 font-bold shrink-0 mt-0.5">⚠</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Financials & Timeline if available */}
                {(opt.estimatedFinancials || opt.estimatedTimeframe) && (
                  <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-[11px] text-slate-600 mb-4">
                    {opt.estimatedFinancials && (
                      <div className="flex items-start gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{opt.estimatedFinancials}</span>
                      </div>
                    )}
                    {opt.estimatedTimeframe && (
                      <div className="flex items-start gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-violet-600 shrink-0 mt-0.5" />
                        <span>{opt.estimatedTimeframe}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button & Recommendation */}
              <div className="space-y-3 pt-3 border-t border-slate-200/80">
                {opt.recommendedFor && (
                  <div className="text-[11px] text-violet-950 bg-violet-100/40 p-2.5 rounded-lg border border-violet-200/50">
                    <span className="font-bold block text-[10px] uppercase text-violet-800 mb-0.5">
                      Recommended For:
                    </span>
                    <span>{opt.recommendedFor}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOption?.(opt);
                  }}
                  className={`w-full py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                    isSelected
                      ? 'bg-violet-600 text-white hover:bg-violet-700'
                      : 'bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-900 border border-slate-300'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected Planning Direction</span>
                    </>
                  ) : (
                    <span>Choose this planning direction</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
