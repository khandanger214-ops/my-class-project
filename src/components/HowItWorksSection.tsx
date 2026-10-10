import React, { useState } from 'react';
import { 
  FileText, 
  Scan, 
  Compass, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      stepNumber: "01",
      name: "UNDERSTAND",
      title: "Context Deconstruction",
      tagline: "Unpacking natural language into structured invariants",
      description: "You describe your situation in ordinary human language. LIFE extracts explicit objectives, hard timeline constraints, capital limits, and implicit emotional or relationship stakes.",
      deliverable: "Parsed scenario blueprint with identified boundary conditions",
      badgeLabel: "Step 01 Input",
      details: [
        "Identifies stated goals vs unspoken fears",
        "Detects geographical, jurisdictional, and temporal constraints",
        "Flags unstated assumptions and optimistic timelines"
      ]
    },
    {
      stepNumber: "02",
      name: "ANALYZE",
      title: "6-Vector Foresight Scan",
      tagline: "Proactive interrogation of the invisible terrain",
      description: "The engine runs all six foresight vectors against your situation: missing data, tail risks, direct/hidden costs, serial dependencies, stakeholder ripple effects, and physical verification gates.",
      deliverable: "Comprehensive friction & blindspot diagnostic matrix",
      badgeLabel: "Step 02 Processing",
      details: [
        "Uncovers what information you don't realize you're missing",
        "Audits contractual, regulatory, and financial exposure",
        "Maps out sequential prerequisite blockers"
      ]
    },
    {
      stepNumber: "03",
      name: "GUIDE",
      title: "Cognitive Synthesis",
      tagline: "Building tailored decision lenses or phased action routes",
      description: "Depending on your challenge, LIFE shapes the findings into LifeLens (multi-alternative trade-off model with counterfactuals) or LifeRoute (step-gate execution roadmap with verification gates).",
      deliverable: "Interactive decision model or milestone-driven execution plan",
      badgeLabel: "Step 03 Output",
      details: [
        "Comparative pros/cons weighted for tail risks",
        "Phase-by-phase action plan with contingency triggers",
        "Explicit verification requirements before funds or commitments transfer"
      ]
    },
    {
      stepNumber: "04",
      name: "ACT",
      title: "Human Sovereign Execution",
      tagline: "You hold the agency. You make the call.",
      description: "LIFE never commands or decides for you. It hands you a clear, stress-tested mental model so you can negotiate with vendors, submit bulletproof paperwork, and proceed with calm confidence.",
      deliverable: "Actionable checklists, pre-flight guardrails, and verified confidence",
      badgeLabel: "Step 04 Agency",
      details: [
        "Printable & verifiable pre-commitment checklists",
        "Explicit 'kill-criteria' stop-loss parameters",
        "Full personal ownership of the final choice"
      ]
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 md:py-24 border-b border-slate-200/70" aria-label="How LIFE Works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-200/60 px-3 py-1 rounded-full mb-3">
            <span>Cognitive Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            How LIFE works
          </h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            A disciplined four-phase pipeline that transforms ambiguous human anxiety into structured, verifiable reality.
          </p>

          {/* Flow Stepper Indicator */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-800">
            <span className="text-violet-700">UNDERSTAND</span>
            <span className="text-slate-400">→</span>
            <span className="text-violet-700">ANALYZE</span>
            <span className="text-slate-400">→</span>
            <span className="text-blue-700">GUIDE</span>
            <span className="text-slate-400">→</span>
            <span className="text-emerald-700">ACT</span>
          </div>
        </div>

        {/* 4 Interactive Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, idx) => {
            const isSelected = activeStep === idx + 1;
            return (
              <div
                key={s.stepNumber}
                onClick={() => setActiveStep(idx + 1)}
                className={`bg-white rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-violet-500 shadow-[0_6px_24px_rgba(124,58,237,0.12)] ring-1 ring-violet-500'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-100">
                      Phase {s.stepNumber}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {s.name}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-violet-800 font-medium mb-3">
                    {s.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {s.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 mb-4">
                    {s.details.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                        <span className="text-violet-500 font-bold shrink-0">·</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverable Footer */}
                <div className="pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Deliverable</span>
                  <span>{s.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Callout Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              The Guiding Premise
            </span>
            <h4 className="text-xl font-bold text-slate-900">
              “AI helps you think. You decide.”
            </h4>
            <p className="text-sm text-slate-600 max-w-2xl">
              LIFE is built on epistemic humility: technology exists to illuminate hidden risks, organize dependencies, and clear mental fog—not to strip away human sovereignty.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0 max-w-xs">
            <span className="font-semibold text-slate-800 block mb-1">Human Decision Sovereignty</span>
            No automated binding actions. You remain in full control of every commitment.
          </div>
        </div>
      </div>
    </section>
  );
};
