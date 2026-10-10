import React, { useMemo, useState } from 'react';
import { verifyPrivacyByDesign } from '../../engine/governanceVerifier';
import { Lock, ShieldCheck, Scale, ChevronDown, ChevronUp } from 'lucide-react';

interface PrivacyOversightBarProps {
  compact?: boolean;
}

export const PrivacyOversightBar: React.FC<PrivacyOversightBarProps> = ({ compact = false }) => {
  const verification = useMemo(() => verifyPrivacyByDesign(), []);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-xl px-5 py-3.5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Human Oversight Principle */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300 shrink-0">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs leading-relaxed">
            <span className="font-bold text-white mr-2">“AI helps you think. You decide.”</span>
            <span className="text-slate-300">
              Supports decision-making rather than guaranteeing outcomes or replacing appropriate professional advice.
            </span>
          </div>
        </div>

        {/* Privacy by Design Verified Status */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {verification.isVerifiedLocalOnly && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono text-emerald-300">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>{verification.conciseSummary}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-semibold text-violet-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{showDetails ? 'Hide privacy details' : 'Privacy & governance note'}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {(!compact || showDetails) && showDetails && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/80">
            <div className="flex items-center gap-2 font-bold text-white mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy by Design (Verified Against Implementation)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {verification.detailedExplanation}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/80">
            <div className="font-bold text-white mb-1">
              Hosting & Environment Boundary Notice
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {verification.hostingScopeNotice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
