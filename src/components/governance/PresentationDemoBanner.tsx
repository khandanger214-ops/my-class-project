import React from 'react';
import { PRESENTATION_DEMO_SCENARIOS, PresentationDemoScenario } from '../../engine/governanceVerifier';
import { X } from 'lucide-react';
import { InformationSourceBadge } from './InformationSourceBadge';

interface PresentationDemoBannerProps {
  activeDemoId: string | null;
  onSelectDemo: (demo: PresentationDemoScenario) => void;
  onExitDemo: () => void;
}

export const PresentationDemoBanner: React.FC<PresentationDemoBannerProps> = ({
  activeDemoId,
  onSelectDemo,
  onExitDemo
}) => {
  if (!activeDemoId) return null;

  const currentDemo =
    PRESENTATION_DEMO_SCENARIOS.find(d => d.id === activeDemoId) ||
    PRESENTATION_DEMO_SCENARIOS[0];

  return (
    <div className="bg-amber-50/95 border-b border-amber-200 text-amber-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <InformationSourceBadge
            sourceType="bundled-demo"
            customLabel="Illustrative Demo Scenario"
          />
          <span className="text-xs font-semibold text-amber-950">
            {currentDemo.personaTitle}
          </span>
          <span className="text-xs text-amber-800 hidden xl:inline">
            — Results are pre-bundled illustrative demo data and local rule-based guidance, not independently verified facts.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-amber-800 mr-1">Switch fictional demo:</span>
          {PRESENTATION_DEMO_SCENARIOS.map((demo) => {
            const isSelected = demo.id === activeDemoId;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => onSelectDemo(demo)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-2xs'
                    : 'bg-white/90 text-amber-900 border border-amber-300 hover:bg-amber-100'
                }`}
              >
                {demo.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={onExitDemo}
            className="ml-1 px-2.5 py-1 rounded bg-white text-slate-700 hover:text-slate-900 border border-amber-300 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
            title="Exit Presentation Demo Mode and return to your own scenario"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
