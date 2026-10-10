import React from 'react';
import { WorkflowStage } from '../../types/sharedContext';
import { Check, ArrowRight } from 'lucide-react';

interface WorkflowIndicatorProps {
  currentStage: WorkflowStage;
  onNavigateStage?: (stage: WorkflowStage) => void;
  canNavigate?: boolean;
}

export const WorkflowIndicator: React.FC<WorkflowIndicatorProps> = ({
  currentStage,
  onNavigateStage,
  canNavigate = true
}) => {
  const stages: { key: WorkflowStage; label: string; number: string; hint: string }[] = [
    { key: 'understand', label: 'UNDERSTAND', number: '01', hint: 'Scenario & Foresight' },
    { key: 'decide', label: 'DECIDE', number: '02', hint: 'LifeLens Evaluation' },
    { key: 'plan', label: 'PLAN', number: '03', hint: 'Handoff & Review' },
    { key: 'act', label: 'ACT', number: '04', hint: 'LifeRoute Execution' },
  ];

  const getStageIndex = (stage: WorkflowStage) => {
    switch (stage) {
      case 'understand': return 0;
      case 'decide': return 1;
      case 'plan': return 2;
      case 'act': return 3;
    }
  };

  const currentIndex = getStageIndex(currentStage);

  return (
    <nav className="w-full bg-[#FAF8F5]/90 border-b border-slate-200/60 py-2.5 px-4 sm:px-6 lg:px-8 select-none" aria-label="LIFE Workflow Progression">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs overflow-x-auto py-0.5">
          {stages.map((stage, idx) => {
            const isActive = stage.key === currentStage;
            const isCompleted = idx < currentIndex;
            const isClickable = canNavigate && onNavigateStage && (isCompleted || isActive);

            return (
              <React.Fragment key={stage.key}>
                {idx > 0 && (
                  <span className={`text-[11px] font-bold shrink-0 ${idx <= currentIndex ? 'text-violet-600' : 'text-slate-300'}`} aria-hidden="true">
                    →
                  </span>
                )}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onNavigateStage(stage.key)}
                  className={`inline-flex items-center gap-1.5 py-1 px-2 rounded-md transition-all whitespace-nowrap shrink-0 text-left ${
                    isActive
                      ? 'text-slate-900 font-extrabold bg-white shadow-2xs border border-slate-200/80 ring-1 ring-slate-900/5'
                      : isCompleted
                      ? 'text-slate-700 font-bold hover:text-slate-900 hover:bg-slate-100/60 cursor-pointer'
                      : 'text-slate-400 font-semibold cursor-not-allowed opacity-60'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] font-mono flex items-center justify-center font-bold shrink-0 ${
                    isActive
                      ? 'bg-violet-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : stage.number}
                  </span>
                  <span className="tracking-tight text-[11px] sm:text-xs">
                    {stage.label}
                  </span>
                  <span className="hidden md:inline text-[10px] text-slate-400 font-normal">
                    ({stage.hint})
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center text-[11px] text-slate-500 font-medium">
          <span>AI helps you think · You decide</span>
        </div>
      </div>
    </nav>
  );
};
