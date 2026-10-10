import React, { useState } from 'react';
import { FORESIGHT_VECTORS } from '../data/scenarios';
import { 
  HelpCircle, 
  AlertTriangle, 
  Coins, 
  GitBranch, 
  Users, 
  CheckSquare, 
  Scan, 
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface ForesightScanSectionProps {
  onTryScenarioPrompt: (promptText: string) => void;
}

export const ForesightScanSection: React.FC<ForesightScanSectionProps> = ({
  onTryScenarioPrompt
}) => {
  const [activeVectorId, setActiveVectorId] = useState<string>(FORESIGHT_VECTORS[0].id);

  const activeVector = FORESIGHT_VECTORS.find(v => v.id === activeVectorId) || FORESIGHT_VECTORS[0];

  const getVectorIcon = (id: string, className = "w-5 h-5") => {
    switch (id) {
      case 'missing-info':
        return <HelpCircle className={className} />;
      case 'risks-blindspots':
        return <AlertTriangle className={className} />;
      case 'hidden-costs':
        return <Coins className={className} />;
      case 'dependencies':
        return <GitBranch className={className} />;
      case 'stakeholders':
        return <Users className={className} />;
      case 'verification':
        return <CheckSquare className={className} />;
      default:
        return <Scan className={className} />;
    }
  };

  return (
    <section id="foresight-section" className="py-16 md:py-24 border-b border-slate-200/70" aria-label="LIFE Foresight Scan Overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-700 bg-violet-100/70 px-3 py-1 rounded-full mb-3 border border-violet-200/60">
            <Scan className="w-3.5 h-3.5 text-violet-600" />
            <span>Signature Capability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            The LIFE Foresight Scan
          </h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            Most bad decisions don't happen because people can't calculate—they happen because critical variables remain completely invisible. The Foresight Scan interrogates every situation across six distinct intelligence vectors before you commit.
          </p>
        </div>

        {/* 6 Vectors Grid + Deep Dive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Vector Selector (6 cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {FORESIGHT_VECTORS.map((vector, index) => {
              const isActive = vector.id === activeVectorId;
              return (
                <button
                  key={vector.id}
                  type="button"
                  onClick={() => setActiveVectorId(vector.id)}
                  className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 ${
                    isActive
                      ? 'bg-white border-violet-400 shadow-[0_4px_16px_rgba(124,58,237,0.12)] ring-1 ring-violet-400'
                      : 'bg-white/90 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${vector.bgLightClass} ${vector.accentClass}`}>
                        {getVectorIcon(vector.id, "w-4 h-4")}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                      {vector.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {vector.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 line-clamp-1 text-[11px]">
                      {vector.description}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-violet-600 translate-x-1' : 'text-slate-300 group-hover:text-slate-400'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Vector Deep Dive Inspector Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.06)] p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${activeVector.bgLightClass} ${activeVector.accentClass}`}>
                  {getVectorIcon(activeVector.id, "w-6 h-6")}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Vector Analysis
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {activeVector.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Core Purpose
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeVector.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-violet-600" />
                  <span>Proactive Interrogation Questions</span>
                </h4>
                <div className="space-y-2">
                  {activeVector.sampleQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50/80 border border-slate-150 text-xs font-medium text-slate-800 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-violet-900 leading-relaxed">
                    <span className="font-semibold block mb-0.5">Automated Multi-Angle Synthesis</span>
                    When you run a scan, LIFE crosses this vector with your specific constraints, timelines, and legal/financial context.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onTryScenarioPrompt(
                    activeVector.id === 'used-car' 
                      ? "I'm considering buying a used car." 
                      : activeVector.id === 'hidden-costs'
                      ? "I'm moving to another city for work."
                      : "I want to start a small business."
                  );
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-violet-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
              >
                <span>Test this scan with an example</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Proactive Foresight Matrix Banner */}
        <div className="mt-12 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-300 block mb-2">
              Systematic Epistemic Check
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              “What you don't know you don't know is what breaks you.”
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard chatbots output pleasant optimism. LIFE is designed specifically to spot friction points, ungrounded assumptions, and regulatory blind spots before you execute.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
