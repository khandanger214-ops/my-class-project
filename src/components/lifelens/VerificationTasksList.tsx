import React, { useState } from 'react';
import { 
  CheckSquare, 
  Check, 
  Plus, 
  ShieldCheck
} from 'lucide-react';
import { VerificationTask } from '../../types/decision';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface VerificationTasksListProps {
  tasks: VerificationTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (newTask: { title: string; description: string; category: string }) => void;
}

export const VerificationTasksList: React.FC<VerificationTasksListProps> = ({
  tasks,
  onToggleTask,
  onAddTask
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Custom Diligence');

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAddTask({
        title: newTitle.trim(),
        description: newDescription.trim() || 'Custom user verification requirement',
        category: newCategory.trim() || 'User Verification'
      });
      setNewTitle('');
      setNewDescription('');
      setShowAddForm(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5" aria-label="Verification Tasks">
      {/* Header and Progress Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-2.5 py-0.5 rounded-full">
              <CheckSquare className="w-3.5 h-3.5 text-sky-600" />
              <span>Accountability &amp; Verification Checklist</span>
            </div>
            <InformationSourceBadge sourceType="external-verification-required" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            What Needs Direct Verification
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            LIFE does not perform live external lookups. Verify these items directly with the relevant party or authority before committing.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 shrink-0">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 block font-mono">
              {completedCount} of {tasks.length} Verified by You
            </span>
            <span className="text-[10px] text-slate-500">
              {tasks.length - completedCount} incomplete
            </span>
          </div>
          <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Verification Items List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3.5 ${
              task.isCompleted
                ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            {/* Custom Checkbox */}
            <div className="mt-0.5 shrink-0">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                task.isCompleted
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white border-slate-300 hover:border-slate-400'
              }`}>
                {task.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Task Content */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-sm font-bold ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {task.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <InformationSourceBadge sourceType={task.sourceType || 'external-verification-required'} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {task.category}
                  </span>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${task.isCompleted ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                {task.description}
              </p>

              {task.sourceRequirement && (
                <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-sky-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Proof Artifact to Request: {task.sourceRequirement}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Verification Task Button / Form */}
      <div className="pt-2">
        {!showAddForm ? (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-500" />
            <span>Add Custom Verification Task</span>
          </button>
        ) : (
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-3 text-xs">
            <span className="font-bold text-slate-900 block">Add Verification Checkpoint</span>
            <input
              type="text"
              placeholder="Task title (e.g. Request HOA covenants & restriction bylaws)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <input
              type="text"
              placeholder="Detail or proof requirement"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="px-3 py-1.5 text-xs font-semibold bg-sky-700 text-white hover:bg-sky-800 rounded-lg shadow-2xs"
              >
                Save Task
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
