import React, { useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  ShieldAlert, 
  Car, 
  MapPin, 
  FileText, 
  Briefcase, 
  Home, 
  Award, 
  Lock,
  Scale,
  X 
} from 'lucide-react';
import { EXAMPLE_SCENARIOS } from '../data/scenarios';
import { verifyPrivacyByDesign } from '../engine/governanceVerifier';
import { InformationSourceBadge } from './governance/InformationSourceBadge';

interface HeroProps {
  scenarioText: string;
  setScenarioText: (val: string) => void;
  onAnalyzeDecision: () => void;
  onBuildRoute: () => void;
  onExploreDemo?: () => void;
  validationError: string | null;
  setValidationError: (err: string | null) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const Hero: React.FC<HeroProps> = ({
  scenarioText,
  setScenarioText,
  onAnalyzeDecision,
  onBuildRoute,
  onExploreDemo,
  validationError,
  setValidationError,
  inputRef
}) => {
  const privacyStatus = useMemo(() => verifyPrivacyByDesign(), []);

  const handleSelectExample = (title: string) => {
    setScenarioText(title);
    setValidationError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setScenarioText('');
    setValidationError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onAnalyzeDecision();
    }
  };

  const getPresetIcon = (id: string) => {
    switch (id) {
      case 'used-car':
        return <Car className="w-4 h-4 text-violet-600 shrink-0" />;
      case 'relocation':
        return <MapPin className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'apartment-rental':
        return <Home className="w-4 h-4 text-sky-600 shrink-0" />;
      case 'small-business':
        return <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'job-offer':
        return <Award className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'document-renewal':
        return <FileText className="w-4 h-4 text-emerald-600 shrink-0" />;
      default:
        return <Compass className="w-4 h-4 text-slate-600 shrink-0" />;
    }
  };

  return (
    <section className="pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/70" aria-label="Hero Introduction and Scenario Input">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Philosophy Header Kicker */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-800 bg-violet-100/70 px-3 py-1 rounded-full mb-5 border border-violet-200/60">
            <Scale className="w-3.5 h-3.5 text-violet-600" />
            <span>Human Oversight</span>
            <span aria-hidden="true" className="text-violet-400">·</span>
            <span>AI helps you think. You decide.</span>
          </div>

          {/* Brand Name & Full Expansion */}
          <div className="space-y-1 mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 text-balance">
              LIFE
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-600 tracking-normal">
              Logical Intelligence &amp; Foresight Engine
            </p>
          </div>

          {/* Main Tagline & Short Explanation */}
          <div className="max-w-3xl space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 text-balance">
              “Life is complicated. Figuring it out shouldn't be.”
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Before you sign a contract, relocate, launch a venture, or submit paperwork, LIFE structures missing information, risks, hidden costs, and dependencies—supporting your judgment without replacing professional advice.
            </p>
          </div>
        </div>

        {/* Large Scenario-Input Console Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.06)] p-5 sm:p-7 md:p-8 transition-all relative">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-slate-500 font-medium">
            <label htmlFor="scenario-input" className="text-sm font-semibold text-slate-900 flex flex-wrap items-center gap-2">
              <span>Enter any real-world decision, dilemma, or process</span>
              {scenarioText.trim().length > 0 && (
                <InformationSourceBadge
                  sourceType={
                    EXAMPLE_SCENARIOS.some(s => s.title === scenarioText.trim())
                      ? 'bundled-demo'
                      : 'user-supplied'
                  }
                />
              )}
            </label>
            <div className="flex items-center gap-2">
              {onExploreDemo && (
                <button
                  type="button"
                  onClick={onExploreDemo}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Explore a demo</span>
                </button>
              )}
              {scenarioText.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs px-2 py-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Clear scenario text"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
              <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                {scenarioText.length} chars
              </span>
            </div>
          </div>

          {/* Textarea Field */}
          <div className="relative">
            <textarea
              id="scenario-input"
              ref={inputRef}
              rows={3}
              value={scenarioText}
              onChange={(e) => {
                setScenarioText(e.target.value);
                if (validationError) setValidationError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="E.g., I'm considering buying a used car from a private seller, but I'm unsure what mechanical checks and title risks I need to verify before handing over the cash..."
              className={`w-full text-base sm:text-lg text-slate-900 bg-slate-50/70 rounded-xl border p-4 sm:p-5 transition-all focus:bg-white focus:outline-none focus:ring-2 placeholder:text-slate-400 resize-y min-h-[110px] leading-relaxed ${
                validationError
                  ? 'border-red-300 focus:ring-red-500 bg-red-50/20'
                  : 'border-slate-200 focus:border-violet-500 focus:ring-violet-500/20'
              }`}
            />
          </div>

          {/* Validation Error Feedback */}
          {validationError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800 animate-fadeIn" role="alert">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block">{validationError}</span>
                <span className="text-red-700">Type your situation above, click “Explore a demo”, or choose an example below.</span>
              </div>
            </div>
          )}

          {/* Action Buttons & Verified Privacy Notice */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {privacyStatus.isVerifiedLocalOnly && (
              <div className="flex items-start sm:items-center gap-2 text-[11px] text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  <strong className="text-slate-700">Privacy by Design:</strong> {privacyStatus.conciseSummary}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ml-auto w-full lg:w-auto shrink-0">
              {/* Primary Action 1: LifeLens */}
              <button
                type="button"
                onClick={onAnalyzeDecision}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 active:scale-[0.99] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Analyze a decision</span>
                <span className="text-xs text-violet-200 font-normal hidden lg:inline">(LifeLens)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Primary Action 2: LifeRoute */}
              <button
                type="button"
                onClick={onBuildRoute}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 active:scale-[0.99] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Build my route</span>
                <span className="text-xs text-slate-300 font-normal hidden lg:inline">(LifeRoute)</span>
                <Compass className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Clickable Example Scenarios */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Try an example scenario prompt:
              </span>
              <InformationSourceBadge sourceType="bundled-demo" />
            </div>
            <span className="text-xs text-slate-400">Click to autofill or use “Explore a demo” for a full walkthrough</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXAMPLE_SCENARIOS.map((scenario) => {
              const isSelected = scenarioText === scenario.title;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectExample(scenario.title)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 cursor-pointer ${
                    isSelected
                      ? 'bg-violet-50/80 border-violet-400 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {getPresetIcon(scenario.id)}
                      <span className="text-[11px] font-semibold tracking-wide uppercase text-slate-500">
                        {scenario.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      Example
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-violet-700 transition-colors">
                    “{scenario.title}”
                  </p>
                  <span className="text-[11px] text-slate-500 mt-2 line-clamp-1">
                    {scenario.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
