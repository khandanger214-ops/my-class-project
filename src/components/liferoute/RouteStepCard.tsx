import React from 'react';
import { 
  Check, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  FileText
} from 'lucide-react';
import { RouteStep } from '../../types/route';
import { checkPrerequisites } from '../../engine/routeGenerator';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface RouteStepCardProps {
  step: RouteStep;
  allSteps: RouteStep[];
  isSelected: boolean;
  onSelect: () => void;
  onToggleComplete: (e: React.MouseEvent) => void;
}

export const RouteStepCard: React.FC<RouteStepCardProps> = ({
  step,
  allSteps,
  isSelected,
  onSelect,
  onToggleComplete
}) => {
  const prereqCheck = checkPrerequisites(step, allSteps);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-current={isSelected ? 'step' : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`rounded-xl border p-4 transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
        isSelected
          ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500'
          : step.isCompleted
          ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'
          : !prereqCheck.isMet
          ? 'bg-white border-slate-200 hover:border-amber-300'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Step Checkbox Button */}
        <button
          type="button"
          onClick={onToggleComplete}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
          title={step.isCompleted ? 'Mark incomplete / reopen step' : 'Mark step complete'}
          className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-pointer ${
            step.isCompleted
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : 'bg-white border-slate-300 hover:border-slate-400 text-transparent hover:text-slate-300'
          }`}
          aria-label={step.isCompleted ? `Step ${step.stepNumber} complete, click to reopen` : `Step ${step.stepNumber} incomplete, click to complete`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Phase & Step Number Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Step 0{step.stepNumber}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-[10px] font-medium text-slate-400 truncate max-w-[160px]">
                {step.phaseName}
              </span>
            </div>
            {step.sourceType && (
              <InformationSourceBadge sourceType={step.sourceType} size="xs" />
            )}
          </div>

          {/* Title */}
          <h4 className={`text-sm sm:text-base font-bold leading-snug mb-1 truncate ${
            step.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
          }`}>
            {step.title}
          </h4>

          {/* Short Summary */}
          <p className={`text-xs leading-relaxed line-clamp-2 ${
            step.isCompleted ? 'line-through text-slate-400' : 'text-slate-600'
          }`}>
            {step.shortSummary}
          </p>

          {/* Dependency & Meta Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            {/* Dependency Status */}
            <div>
              {!prereqCheck.isMet && !step.isCompleted ? (
                <div className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>
                    Prerequisite: Requires Step {prereqCheck.missingStepNumbers.map(n => `0${n}`).join(', ')}
                  </span>
                </div>
              ) : step.isCompleted ? (
                <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Verified Complete</span>
                </span>
              ) : (
                <span className="text-slate-400">Prerequisites cleared</span>
              )}
            </div>

            {/* Estimates & Notes Flag */}
            <div className="flex items-center gap-2 text-slate-500 text-[10px]">
              {step.timeEstimate && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{step.timeEstimate}</span>
                </span>
              )}
              {step.userNotes && (
                <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                  <FileText className="w-3 h-3" />
                  <span>Note</span>
                </span>
              )}
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
