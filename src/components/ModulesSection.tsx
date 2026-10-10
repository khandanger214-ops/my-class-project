import React from 'react';
import { 
  Eye, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ListOrdered, 
  Split, 
  ShieldCheck, 
  Clock, 
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { ModuleMode } from '../types';

interface ModulesSectionProps {
  onSelectModule: (mode: ModuleMode) => void;
  scenarioText: string;
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({
  onSelectModule,
  scenarioText
}) => {
  return (
    <section id="modules-section" className="py-16 md:py-24 border-b border-slate-200/70" aria-label="LifeLens and LifeRoute Modules">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-200/60 px-3 py-1 rounded-full mb-3">
            <span>Two Specialized Cognitive Engines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Two distinct paths for complex life challenges
          </h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            Whether you are wrestling with an uncertain choice or trying to execute an intricate real-world process, LIFE routes your problem to the right framework.
          </p>
        </div>

        {/* Side-by-Side Dual Module Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: LifeLens */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.06)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-violet-300 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/40 rounded-bl-full pointer-events-none" />

            <div>
              {/* Module Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-sm">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
                    Module 01 · Decision Evaluation
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    LifeLens
                  </h3>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-base font-semibold text-violet-900 italic mb-4">
                “See the whole picture before you decide.”
              </p>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Engineered for crossroads dilemmas with competing paths, financial stakes, or ethical tradeoffs. LifeLens breaks your dilemma down into weighted decision matrices, uncovers confirmation bias, and simulates downstream stakeholder impacts.
              </p>

              {/* Core Deliverables List */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  What LifeLens Generates:
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Split className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>Multi-Alternative Tradeoff Matrix:</strong> Direct comparison of Options A, B, and C with pros, cons, and tail risks.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>Epistemic Blindspot Filter:</strong> Probing questions that stress-test your baseline assumptions.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Layers className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span><strong>Stakeholder Ripple Map:</strong> Tracks how your choice alters family, coworkers, partners, and finances.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Best for: Purchases, job offers, investments, personal crossroads
              </span>
              <button
                type="button"
                onClick={() => onSelectModule('lifelens')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 whitespace-nowrap"
              >
                <span>Launch LifeLens</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: LifeRoute */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.06)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-blue-300 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-bl-full pointer-events-none" />

            <div>
              {/* Module Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Compass className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Module 02 · Pathway Architecture
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    LifeRoute
                  </h3>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-base font-semibold text-blue-900 italic mb-4">
                “Turn what you want into a path forward.”
              </p>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Engineered for complex execution journeys, civic processes, entity formation, and major real-world transitions. LifeRoute transforms messy regulations into orderly sequential phases, explicit dependencies, and proof checklists.
              </p>

              {/* Core Deliverables List */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  What LifeRoute Generates:
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <ListOrdered className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Phased Action Blueprint:</strong> Chronological order of operations with strict step-gate verification.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <FileCheck2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Document & Prerequisite Guardrails:</strong> Every form, notarization, and verification requirement listed upfront.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Contingency Triggers:</strong> Pre-programmed fallback pathways if an agency delays or conditions change.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Best for: Business launches, civic paperwork, relocation logistics
              </span>
              <button
                type="button"
                onClick={() => onSelectModule('liferoute')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 whitespace-nowrap"
              >
                <span>Launch LifeRoute</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
