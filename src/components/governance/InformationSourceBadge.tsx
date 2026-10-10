import React, { useState } from 'react';
import { InformationSourceType } from '../../types/decision';
import { UserCheck, Sparkles, Cpu, ShieldCheck, Info, X } from 'lucide-react';
import { getSourceLabelMeta } from '../../engine/governanceVerifier';

interface InformationSourceBadgeProps {
  sourceType: InformationSourceType;
  size?: 'xs' | 'sm';
  showTooltip?: boolean;
  customLabel?: string;
}

export const InformationSourceBadge: React.FC<InformationSourceBadgeProps> = ({
  sourceType,
  size = 'xs',
  showTooltip = false,
  customLabel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const meta = getSourceLabelMeta(sourceType);

  const getIcon = () => {
    switch (sourceType) {
      case 'user-supplied':
        return <UserCheck className={size === 'xs' ? 'w-3 h-3 text-emerald-600' : 'w-3.5 h-3.5 text-emerald-600'} />;
      case 'bundled-demo':
        return <Sparkles className={size === 'xs' ? 'w-3 h-3 text-amber-600' : 'w-3.5 h-3.5 text-amber-600'} />;
      case 'rule-engine':
        return <Cpu className={size === 'xs' ? 'w-3 h-3 text-violet-600' : 'w-3.5 h-3.5 text-violet-600'} />;
      case 'external-verification-required':
        return <ShieldCheck className={size === 'xs' ? 'w-3 h-3 text-sky-600' : 'w-3.5 h-3.5 text-sky-600'} />;
    }
  };

  const displayLabel = customLabel || meta.shortLabel;

  return (
    <span className="relative inline-flex items-center">
      <span
        onClick={showTooltip ? () => setIsOpen(!isOpen) : undefined}
        title={meta.description}
        className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold border rounded ${
          size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
        } ${meta.className} ${showTooltip ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
      >
        {getIcon()}
        <span>{displayLabel}</span>
        {showTooltip && <Info className="w-2.5 h-2.5 opacity-60 ml-0.5" />}
      </span>

      {showTooltip && isOpen && (
        <span className="absolute z-40 top-full left-0 mt-1.5 w-72 p-3 rounded-lg bg-slate-900 text-white shadow-xl border border-slate-700 text-left normal-case font-sans">
          <span className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider">
              {meta.label}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
          <span className="block text-xs text-slate-300 leading-relaxed">
            {meta.description}
          </span>
        </span>
      )}
    </span>
  );
};

export const InformationLegendBar: React.FC<{ isDemoMode?: boolean }> = ({ isDemoMode }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mr-1">
            Information Labels:
          </span>
          <InformationSourceBadge sourceType="user-supplied" />
          <InformationSourceBadge sourceType="rule-engine" />
          {isDemoMode && <InformationSourceBadge sourceType="bundled-demo" />}
          <InformationSourceBadge sourceType="external-verification-required" />
        </div>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold text-violet-700 hover:text-violet-900 inline-flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showDetails ? 'Hide label guide' : 'How sources are labelled'}</span>
        </button>
      </div>

      {showDetails && (
        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {(['user-supplied', 'rule-engine', 'bundled-demo', 'external-verification-required'] as InformationSourceType[]).map((type) => {
            const info = getSourceLabelMeta(type);
            return (
              <div key={type} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <div className="mb-1.5">
                  <InformationSourceBadge sourceType={type} />
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
