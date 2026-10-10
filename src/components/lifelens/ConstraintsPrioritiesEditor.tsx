import React, { useState } from 'react';
import { 
  Sliders, 
  Target, 
  Edit3, 
  Check, 
  X, 
  Plus, 
  Tag, 
  Clock, 
  DollarSign, 
  ShieldAlert 
} from 'lucide-react';
import { DecisionConstraint, DecisionPriority, InformationSourceType } from '../../types/decision';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface ConstraintsPrioritiesEditorProps {
  goal: string;
  goalSourceType?: InformationSourceType;
  onUpdateGoal: (newGoal: string) => void;
  constraints: DecisionConstraint[];
  onUpdateConstraints: (newConstraints: DecisionConstraint[]) => void;
  priorities: DecisionPriority[];
  onTogglePriority: (priorityId: string) => void;
}

export const ConstraintsPrioritiesEditor: React.FC<ConstraintsPrioritiesEditorProps> = ({
  goal,
  goalSourceType = 'rule-engine',
  onUpdateGoal,
  constraints,
  onUpdateConstraints,
  priorities,
  onTogglePriority
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [goalDraft, setGoalDraft] = useState<string>(goal);

  const [editingConstraintId, setEditingConstraintId] = useState<string | null>(null);
  const [constraintDraftValue, setConstraintDraftValue] = useState<string>('');

  const [newConstraintLabel, setNewConstraintLabel] = useState<string>('');
  const [newConstraintValue, setNewConstraintValue] = useState<string>('');
  const [showAddConstraint, setShowAddConstraint] = useState<boolean>(false);

  const handleSaveGoal = () => {
    if (goalDraft.trim()) {
      onUpdateGoal(goalDraft.trim());
    }
    setIsEditingGoal(false);
  };

  const handleStartEditConstraint = (c: DecisionConstraint) => {
    setEditingConstraintId(c.id);
    setConstraintDraftValue(c.value);
  };

  const handleSaveConstraint = (id: string) => {
    if (constraintDraftValue.trim()) {
      const updated = constraints.map(c => 
        c.id === id ? { ...c, value: constraintDraftValue.trim(), sourceType: 'user-supplied' as const } : c
      );
      onUpdateConstraints(updated);
    }
    setEditingConstraintId(null);
  };

  const handleAddConstraint = () => {
    if (newConstraintLabel.trim() && newConstraintValue.trim()) {
      const newC: DecisionConstraint = {
        id: `c-custom-${Date.now()}`,
        label: newConstraintLabel.trim(),
        value: newConstraintValue.trim(),
        type: 'custom',
        sourceType: 'user-supplied'
      };
      onUpdateConstraints([...constraints, newC]);
      setNewConstraintLabel('');
      setNewConstraintValue('');
      setShowAddConstraint(false);
    }
  };

  const handleRemoveConstraint = (id: string) => {
    onUpdateConstraints(constraints.filter(c => c.id !== id));
  };

  const getConstraintIcon = (type: DecisionConstraint['type']) => {
    switch (type) {
      case 'budget': return <DollarSign className="w-3.5 h-3.5 text-blue-600" />;
      case 'timeline': return <Clock className="w-3.5 h-3.5 text-violet-600" />;
      case 'risk': return <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />;
      default: return <Tag className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
      {/* Editable Goal Section */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-violet-600" />
              <span>Defined Objective &amp; Success Invariant</span>
            </label>
            <InformationSourceBadge sourceType={goalSourceType} />
          </div>
          {!isEditingGoal && (
            <button
              type="button"
              onClick={() => {
                setGoalDraft(goal);
                setIsEditingGoal(true);
              }}
              className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Goal</span>
            </button>
          )}
        </div>

        {isEditingGoal ? (
          <div className="space-y-2">
            <textarea
              rows={2}
              value={goalDraft}
              onChange={(e) => setGoalDraft(e.target.value)}
              className="w-full text-sm p-3 rounded-xl border border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 bg-slate-50"
            />
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsEditingGoal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGoal}
                className="px-3 py-1.5 text-xs font-semibold bg-violet-600 text-white hover:bg-violet-700 rounded-lg shadow-xs cursor-pointer"
              >
                Save Objective
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-150 leading-relaxed">
            {goal}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        {/* User Priorities (Interactive Checkboxes / Toggles) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-violet-600" />
              <span>Active Decision Priorities</span>
            </h4>
            <span className="text-[11px] text-slate-400">Click to re-rank findings by relevance</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {priorities.map((priority) => (
              <button
                key={priority.id}
                type="button"
                onClick={() => onTogglePriority(priority.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  priority.selected
                    ? 'bg-violet-50 border-violet-400 text-violet-900 shadow-2xs font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${priority.selected ? 'bg-violet-600' : 'bg-slate-300'}`} />
                <span>{priority.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Constraints (Editable Key Parameters) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>Boundary Constraints</span>
            </h4>
            {!showAddConstraint && (
              <button
                type="button"
                onClick={() => setShowAddConstraint(true)}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Constraint</span>
              </button>
            )}
          </div>

          <div className="space-y-2">
            {constraints.map((c) => (
              <div
                key={c.id}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs flex items-center justify-between gap-3 group"
              >
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  {getConstraintIcon(c.type)}
                  <span className="font-semibold text-slate-800">{c.label}:</span>
                  {editingConstraintId === c.id ? (
                    <div className="flex items-center gap-1 flex-1">
                      <input
                        type="text"
                        value={constraintDraftValue}
                        onChange={(e) => setConstraintDraftValue(e.target.value)}
                        className="text-xs p-1 rounded border border-blue-400 bg-white flex-1 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveConstraint(c.id)}
                        className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingConstraintId(null)}
                        className="p-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-slate-600 font-medium">{c.value}</span>
                      {c.sourceType && (
                        <InformationSourceBadge sourceType={c.sourceType} />
                      )}
                    </>
                  )}
                </div>

                {editingConstraintId !== c.id && (
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleStartEditConstraint(c)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 cursor-pointer"
                      title="Edit parameter"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveConstraint(c.id)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 cursor-pointer"
                      title="Delete constraint"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Inline Add Constraint Form */}
            {showAddConstraint && (
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 text-xs space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Constraint label (e.g. Max Commute)"
                    value={newConstraintLabel}
                    onChange={(e) => setNewConstraintLabel(e.target.value)}
                    className="p-1.5 rounded border border-slate-300 bg-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 25 minutes)"
                    value={newConstraintValue}
                    onChange={(e) => setNewConstraintValue(e.target.value)}
                    className="p-1.5 rounded border border-slate-300 bg-white text-xs"
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddConstraint(false)}
                    className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddConstraint}
                    className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded cursor-pointer"
                  >
                    Add (User-Supplied)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
