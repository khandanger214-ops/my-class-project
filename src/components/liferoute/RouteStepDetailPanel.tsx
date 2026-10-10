import React, { useState, useEffect } from 'react';
import { 
  Check, 
  RotateCcw, 
  AlertTriangle, 
  FileText, 
  Clock, 
  DollarSign, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Info
} from 'lucide-react';
import { RouteStep } from '../../types/route';
import { checkPrerequisites } from '../../engine/routeGenerator';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface RouteStepDetailPanelProps {
  step: RouteStep;
  allSteps: RouteStep[];
  onToggleComplete: () => void;
  onUpdateNotes: (notes: string) => void;
  onSelectStepById: (stepId: string) => void;
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

export const RouteStepDetailPanel: React.FC<RouteStepDetailPanelProps> = ({
  step,
  allSteps,
  onToggleComplete,
  onUpdateNotes,
  onSelectStepById,
  onNextStep,
  onPrevStep
}) => {
  const [noteDraft, setNoteDraft] = useState<string>(step.userNotes || '');
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);

  useEffect(() => {
    setNoteDraft(step.userNotes || '');
    setIsNoteSaved(false);
  }, [step.id, step.userNotes]);

  const prereqCheck = checkPrerequisites(step, allSteps);

  const handleSaveNotes = () => {
    onUpdateNotes(noteDraft);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
      {/* Top Header & Complete Action */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Step 0{step.stepNumber} of 0{allSteps.length}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-500">
              {step.phaseName}
            </span>
            <InformationSourceBadge sourceType={step.sourceType || 'rule-engine'} size="xs" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {step.title}
          </h3>
        </div>

        {/* Mark Complete or Reopen Button */}
        <button
          type="button"
          onClick={onToggleComplete}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-center ${
            step.isCompleted
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
              : !prereqCheck.isMet
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {step.isCompleted ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reopen Step</span>
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Mark Step Complete</span>
            </>
          )}
        </button>
      </div>

      {/* Prerequisites Alert Banner */}
      {!prereqCheck.isMet && !step.isCompleted && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Prerequisites Incomplete</span>
          </div>
          <p className="leading-relaxed">
            This step depends on prior milestones. Completing it prematurely risks unrecoverable fees or administrative rejection:
          </p>
          <div className="space-y-1 pt-1">
            {step.prerequisiteStepIds.map((pId) => {
              const pStep = allSteps.find(s => s.id === pId);
              if (!pStep) return null;
              return (
                <button
                  key={pId}
                  type="button"
                  onClick={() => onSelectStepById(pId)}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    pStep.isCompleted
                      ? 'bg-emerald-100/60 text-emerald-900 line-through'
                      : 'bg-white text-slate-800 hover:bg-amber-100/50 font-semibold'
                  }`}
                >
                  <span>Step 0{pStep.stepNumber}: {pStep.title}</span>
                  <span className="text-[10px] uppercase font-mono">
                    {pStep.isCompleted ? '✓ Completed' : 'Pending →'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Description */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Step Objective & Execution Protocol
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-150">
          {step.description}
        </p>
      </div>

      {/* Immediate Next Action Card */}
      <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          <span>Immediate Next Action</span>
        </span>
        <p className="text-sm font-semibold text-blue-950 leading-relaxed">
          {step.nextAction}
        </p>
      </div>

      {/* Two Column Breakdown: Required Documents & Potential Blockers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Required Resources / Documents */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="font-bold text-slate-900 uppercase tracking-wide text-[10px] block border-b pb-1.5 border-slate-100 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Required Documents & Proofs</span>
          </span>
          {step.requiredDocuments.length > 0 ? (
            <ul className="space-y-2 text-slate-700">
              {step.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-blue-600 font-bold mt-0.5">▪</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-slate-400 italic">No formal external documents required.</span>
          )}
        </div>

        {/* Potential Blockers & Traps */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <span className="font-bold text-slate-900 uppercase tracking-wide text-[10px] block border-b pb-1.5 border-slate-100 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Potential Blockers & Traps</span>
          </span>
          {step.potentialBlockers.length > 0 ? (
            <ul className="space-y-2 text-slate-700">
              {step.potentialBlockers.map((blocker, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-500 font-bold mt-0.5">⚠</span>
                  <span>{blocker}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-slate-400 italic">Standard procedure with minimal blockers.</span>
          )}
        </div>
      </div>

      {/* Estimates & Jurisdiction Notices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {step.timeEstimate && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Time Horizon Estimate (Rule-Based)</span>
              <span className="font-semibold text-slate-800">{step.timeEstimate}</span>
            </div>
          </div>
        )}

        {step.costEstimate && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Cost / Fee Range (Verify Locally)</span>
              <span className="font-semibold text-slate-800">{step.costEstimate}</span>
            </div>
          </div>
        )}
      </div>

      {/* Source Integrity / Jurisdiction Disclaimer */}
      {step.jurisdictionNotice && (
        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">Jurisdiction Integrity Rule:</span>
            <span>{step.jurisdictionNotice}</span>
          </div>
        </div>
      )}

      {/* Verification Check Standard */}
      <div className="pt-2 text-xs flex items-center justify-between gap-2 text-emerald-800 font-medium bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Verification Invariant:</strong> {step.verificationCheck}</span>
        </div>
        <InformationSourceBadge sourceType="external-verification-required" size="xs" />
      </div>

      {/* User Notes Editor (Preserved for session) */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Personal Session Notes & Progress Reminders:
            </label>
            <InformationSourceBadge sourceType="user-supplied" size="xs" />
          </div>
          {isNoteSaved && (
            <span className="text-[11px] font-semibold text-emerald-700 animate-fadeIn">
              ✓ Saved to session
            </span>
          )}
        </div>
        <textarea
          rows={2}
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          placeholder="Add tracking numbers, appointment dates, or custom reminders for this step..."
          className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveNotes}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Note</span>
          </button>
        </div>
      </div>

      {/* Step Navigation Bar */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        {onPrevStep ? (
          <button
            type="button"
            onClick={onPrevStep}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded hover:bg-slate-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>
        ) : <div />}

        {onNextStep ? (
          <button
            type="button"
            onClick={onNextStep}
            className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 px-3 py-1.5 rounded hover:bg-blue-50 font-semibold"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

