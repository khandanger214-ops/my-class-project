import React from 'react';
import { UserDecisionStance, VerificationTask } from '../../types/decision';
import { RouteStep } from '../../types/route';
import { ClipboardCheck, AlertTriangle, ShieldAlert, UserCheck, CheckCircle2, Clock } from 'lucide-react';

interface AccountabilitySummaryPanelProps {
  mode: 'lifelens' | 'liferoute';
  verificationTasks?: VerificationTask[];
  routeSteps?: RouteStep[];
  assumptions: string[];
  flaggedAssumptions?: string[];
  unresolvedHighRiskCount?: number;
  userDecisionStance: UserDecisionStance;
  onUpdateDecisionStance: (stance: UserDecisionStance) => void;
  userDecisionNote?: string;
  onUpdateDecisionNote?: (note: string) => void;
}

export const AccountabilitySummaryPanel: React.FC<AccountabilitySummaryPanelProps> = ({
  mode,
  verificationTasks = [],
  routeSteps = [],
  assumptions,
  flaggedAssumptions = [],
  unresolvedHighRiskCount = 0,
  userDecisionStance,
  onUpdateDecisionStance,
  userDecisionNote = '',
  onUpdateDecisionNote
}) => {
  const pendingVerifications = verificationTasks.filter(t => !t.isCompleted);
  const completedVerifications = verificationTasks.filter(t => t.isCompleted);

  const incompleteSteps = routeSteps.filter(s => !s.isCompleted);
  const completedSteps = routeSteps.filter(s => s.isCompleted);

  const stanceOptions: { value: UserDecisionStance; label: string }[] = [
    {
      value: 'investigating',
      label: 'Investigating & Verifying Missing Facts'
    },
    {
      value: 'comparing',
      label: 'Comparing Alternatives & Trade-Offs'
    },
    {
      value: 'proceeding',
      label: 'Proceeding Only After Verifications Clear'
    },
    {
      value: 'pausing',
      label: 'Pausing / Holding Commitment'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-4 h-4 text-violet-300" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Accountability & Human Oversight Ledger
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-violet-50 text-violet-800 border border-violet-200 font-semibold">
                AI helps you think. You decide.
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Shows which steps remain incomplete, what needs verification, and which assumptions influence the current assessment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          {mode === 'lifelens' ? (
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
              {pendingVerifications.length} of {verificationTasks.length} Verifications Incomplete
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
              {incompleteSteps.length} of {routeSteps.length} Route Steps Incomplete
            </span>
          )}
        </div>
      </div>

      {/* 3-Column Accountability Grid */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Column 1: What remains incomplete / needs verification */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {mode === 'lifelens'
                    ? `Needs Verification (${pendingVerifications.length})`
                    : `Incomplete Steps & Checks (${incompleteSteps.length})`}
                </span>
              </h4>
            </div>

            {mode === 'lifelens' ? (
              pendingVerifications.length > 0 ? (
                <ul className="space-y-2 mb-3">
                  {pendingVerifications.slice(0, 4).map(t => (
                    <li key={t.id} className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <span className="font-semibold text-slate-900 block">{t.title}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {t.description}
                      </span>
                    </li>
                  ))}
                  {pendingVerifications.length > 4 && (
                    <li className="text-[11px] font-mono text-slate-500">
                      + {pendingVerifications.length - 4} more unverified item(s) in checklist
                    </li>
                  )}
                </ul>
              ) : (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All listed verification tasks marked complete by you.</span>
                </div>
              )
            ) : incompleteSteps.length > 0 ? (
              <ul className="space-y-2 mb-3">
                {incompleteSteps.slice(0, 4).map(s => (
                  <li key={s.id} className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="font-semibold text-slate-900 block">
                      Step 0{s.stepNumber}: {s.title}
                    </span>
                    {s.verificationCheck && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Verify: {s.verificationCheck}
                      </span>
                    )}
                  </li>
                ))}
                {incompleteSteps.length > 4 && (
                  <li className="text-[11px] font-mono text-slate-500">
                    + {incompleteSteps.length - 4} more incomplete step(s) in route
                  </li>
                )}
              </ul>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All route steps marked complete by you.</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              {mode === 'lifelens'
                ? `${completedVerifications.length} verified by user`
                : `${completedSteps.length} completed by user`}
            </span>
            {unresolvedHighRiskCount > 0 && (
              <span className="text-amber-800 font-semibold">
                {unresolvedHighRiskCount} high-seriousness finding(s) open
              </span>
            )}
          </div>
        </div>

        {/* Column 2: Active Assumptions Influencing Current Assessment */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Assumptions Influencing Assessment ({assumptions.length})</span>
              </h4>
            </div>
            <p className="text-[11px] text-slate-600 mb-2.5">
              This assessment holds only if these underlying assumptions remain valid:
            </p>
            <ul className="space-y-2">
              {assumptions.map((assumption, idx) => {
                const isFlagged = flaggedAssumptions.includes(assumption);
                return (
                  <li
                    key={idx}
                    className={`p-2 rounded-lg border text-xs ${
                      isFlagged
                        ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                        : 'bg-white border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <span>{assumption}</span>
                    {isFlagged && (
                      <span className="block text-[10px] font-mono text-amber-800 mt-1">
                        ⚠ Challenged by user — verify before relying on current assessment.
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-2 mt-3 border-t border-slate-200/70 text-[11px] text-slate-500">
            {flaggedAssumptions.length > 0
              ? `${flaggedAssumptions.length} assumption(s) flagged as not applicable or needing review.`
              : 'All baseline assumptions currently active.'}
          </div>
        </div>

        {/* Column 3: Final Decision Ownership & Human Oversight */}
        <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-violet-300 font-semibold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Your Final Decision Authority</span>
              </span>
            </div>
            <div className="text-sm font-bold text-white mb-1">
              “AI helps you think. You decide.”
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3.5">
              LIFE supports decision-making rather than guaranteeing outcomes or replacing appropriate legal, financial, medical, or technical advice. Record your own current decision stance:
            </p>

            <div className="space-y-1.5 mb-3">
              {stanceOptions.map(opt => {
                const isSelected = userDecisionStance === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onUpdateDecisionStance(opt.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-violet-600 text-white border-violet-500 shadow-xs'
                        : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="text-[10px] font-mono uppercase">Active Stance</span>}
                  </button>
                );
              })}
            </div>

            {onUpdateDecisionNote && (
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Your Personal Decision Log / Conditions (User-Supplied)
                </label>
                <input
                  type="text"
                  value={userDecisionNote}
                  onChange={(e) => onUpdateDecisionNote(e.target.value)}
                  placeholder="e.g., Will only sign if inspection passes and fee is waived..."
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400"
                />
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span>Final accountability and commitment remain strictly with you.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
