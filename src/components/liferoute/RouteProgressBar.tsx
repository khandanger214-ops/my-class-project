import React from 'react';
import { CheckCircle2, AlertTriangle, Layers, Clock } from 'lucide-react';
import { RouteStep } from '../../types/route';
import { calculateRouteProgress, checkPrerequisites } from '../../engine/routeGenerator';

interface RouteProgressBarProps {
  steps: RouteStep[];
  totalDuration?: string;
}

export const RouteProgressBar: React.FC<RouteProgressBarProps> = ({ steps, totalDuration }) => {
  const { total, completed, percentage, incompleteSteps, blockedSteps } = calculateRouteProgress(steps);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
            {percentage}%
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Route Execution Progress
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {completed} of {total} milestones verified complete
            </span>
          </div>
        </div>

        {totalDuration && (
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 self-start sm:self-center font-medium">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Horizon: {totalDuration}</span>
          </div>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            percentage === 100
              ? 'bg-emerald-500'
              : percentage > 50
              ? 'bg-blue-600'
              : 'bg-violet-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* What Remains Incomplete Breakdown */}
      <div className="pt-2 border-t border-slate-100 text-xs">
        {percentage === 100 ? (
          <div className="flex items-center gap-2 text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All route milestones verified complete! You have cleared all sequential prerequisites.</span>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-bold uppercase tracking-wider text-[10px]">
                Active Execution Status:
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {incompleteSteps.length} milestone{incompleteSteps.length > 1 ? 's' : ''} remaining
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {incompleteSteps.map((step) => {
                const prereq = checkPrerequisites(step, steps);
                return (
                  <span
                    key={step.id}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border ${
                      !prereq.isMet
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {!prereq.isMet && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                    <span>Step 0{step.stepNumber}: {step.title}</span>
                    {!prereq.isMet && (
                      <span className="text-[10px] text-amber-600 font-mono">
                        (Needs Step {prereq.missingStepNumbers.map(n => `0${n}`).join(',')})
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
