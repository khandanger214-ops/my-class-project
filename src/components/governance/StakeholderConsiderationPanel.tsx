import React, { useState } from 'react';
import { StakeholderConsideration } from '../../types/decision';
import { Users, Plus, Check, X, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
import { InformationSourceBadge } from './InformationSourceBadge';

interface StakeholderConsiderationPanelProps {
  stakeholders: StakeholderConsideration[];
  onUpdateStakeholders: (updated: StakeholderConsideration[]) => void;
}

export const StakeholderConsiderationPanel: React.FC<StakeholderConsiderationPanelProps> = ({
  stakeholders,
  onUpdateStakeholders
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    stakeholders.some(s => s.isIncluded)
  );
  const [newRole, setNewRole] = useState('');
  const [newConsideration, setNewConsideration] = useState('');
  const [newMitigation, setNewMitigation] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editConsiderationText, setEditConsiderationText] = useState('');

  const activeStakeholders = stakeholders.filter(s => s.isIncluded);

  const handleToggleStakeholder = (id: string) => {
    const updated = stakeholders.map(s =>
      s.id === id
        ? {
            ...s,
            isIncluded: !s.isIncluded,
            sourceType: 'user-supplied' as const
          }
        : s
    );
    onUpdateStakeholders(updated);
  };

  const handleStartEdit = (s: StakeholderConsideration) => {
    setEditingId(s.id);
    setEditConsiderationText(s.consideration);
  };

  const handleSaveEdit = (id: string) => {
    if (!editConsiderationText.trim()) return;
    const updated = stakeholders.map(s =>
      s.id === id
        ? {
            ...s,
            consideration: editConsiderationText.trim(),
            isIncluded: true,
            sourceType: 'user-supplied' as const
          }
        : s
    );
    onUpdateStakeholders(updated);
    setEditingId(null);
  };

  const handleAddCustomStakeholder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim() || !newConsideration.trim()) return;

    const customStakeholder: StakeholderConsideration = {
      id: `stk-custom-${Date.now()}`,
      roleOrGroup: newRole.trim(),
      consideration: newConsideration.trim(),
      mitigationOrAction: newMitigation.trim() || 'Discuss expectations and confirm alignment before committing.',
      isIncluded: true,
      sourceType: 'user-supplied'
    };

    onUpdateStakeholders([...stakeholders, customStakeholder]);
    setNewRole('');
    setNewConsideration('');
    setNewMitigation('');
  };

  const handleRemoveCustom = (id: string) => {
    onUpdateStakeholders(stakeholders.filter(s => s.id !== id));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
            <Users className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Optional Stakeholder Considerations
              </h3>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {activeStakeholders.length === 0
                  ? 'Individual Decision Mode (0 Third Parties Assumed)'
                  : `${activeStakeholders.length} Active Stakeholder${activeStakeholders.length > 1 ? 's' : ''}`}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              LIFE does not assume your decision involves a family, partner, employer, or other third party. Enable or add stakeholders only if this decision affects other people.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-center shrink-0 text-xs font-semibold text-violet-700 hover:text-violet-900 bg-violet-50/70 hover:bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>
            {isExpanded
              ? 'Collapse Stakeholder Options'
              : activeStakeholders.length > 0
              ? `Manage Stakeholders (${activeStakeholders.length})`
              : 'Does this affect others? Add stakeholders'}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Summary cards when collapsed and stakeholders are active */}
      {!isExpanded && activeStakeholders.length > 0 && (
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeStakeholders.map(s => (
            <div
              key={s.id}
              className="p-3 rounded-xl bg-violet-50/40 border border-violet-200/80 flex items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">{s.roleOrGroup}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{s.consideration}</p>
                <p className="text-[11px] text-violet-800 mt-1 font-medium">
                  Action: {s.mitigationOrAction}
                </p>
              </div>
              <InformationSourceBadge sourceType={s.sourceType || 'user-supplied'} />
            </div>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="pt-5 space-y-5">
          {/* Toggleable potential stakeholders */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2.5">
              Select only the parties affected by your specific situation:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stakeholders.map((stk) => (
                <div
                  key={stk.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    stk.isIncluded
                      ? 'bg-violet-50/30 border-violet-300 shadow-2xs'
                      : 'bg-slate-50/60 border-slate-200/80 opacity-85 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStakeholder(stk.id)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors cursor-pointer ${
                            stk.isIncluded
                              ? 'bg-violet-600 border-violet-600 text-white'
                              : 'bg-white border-slate-300 text-transparent hover:border-violet-500'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <span
                          onClick={() => handleToggleStakeholder(stk.id)}
                          className="text-xs font-bold text-slate-900 cursor-pointer"
                        >
                          {stk.roleOrGroup}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <InformationSourceBadge sourceType={stk.sourceType || 'rule-engine'} />
                        {stk.id.startsWith('stk-custom-') && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCustom(stk.id)}
                            className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            title="Remove custom stakeholder"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {editingId === stk.id ? (
                      <div className="mt-2 space-y-2">
                        <textarea
                          rows={2}
                          value={editConsiderationText}
                          onChange={(e) => setEditConsiderationText(e.target.value)}
                          className="w-full text-xs p-2 rounded border border-violet-300 bg-white text-slate-800 focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(stk.id)}
                            className="px-2.5 py-1 rounded bg-violet-600 text-white text-[11px] font-semibold hover:bg-violet-700 cursor-pointer"
                          >
                            Save consideration
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold hover:bg-slate-200 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pl-6 space-y-1">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {stk.consideration}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">Suggested action:</span> {stk.mitigationOrAction}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pl-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleToggleStakeholder(stk.id)}
                      className={`text-[11px] font-semibold cursor-pointer ${
                        stk.isIncluded ? 'text-violet-700' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {stk.isIncluded ? '✓ Included in assessment' : '+ Include in assessment'}
                    </button>

                    {editingId !== stk.id && (
                      <button
                        type="button"
                        onClick={() => handleStartEdit(stk)}
                        className="text-[11px] text-slate-500 hover:text-violet-700 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Customize note</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Stakeholder Form */}
          <form
            onSubmit={handleAddCustomStakeholder}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3"
          >
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-violet-600" />
              <span>Add another affected person or third party (Optional)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Role (e.g., Co-Founder, Roommate, Client)"
                className="text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-violet-500"
              />
              <input
                type="text"
                value={newConsideration}
                onChange={(e) => setNewConsideration(e.target.value)}
                placeholder="How does this decision affect them?"
                className="text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-violet-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMitigation}
                  onChange={(e) => setNewMitigation(e.target.value)}
                  placeholder="Action to take (optional)..."
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  disabled={!newRole.trim() || !newConsideration.trim()}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
