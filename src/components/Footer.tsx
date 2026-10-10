import React, { useMemo } from 'react';
import { ArrowUp, ShieldAlert, Lock, Scale } from 'lucide-react';
import { ModuleMode } from '../types';
import { verifyPrivacyByDesign } from '../engine/governanceVerifier';

interface FooterProps {
  onNavigateHome: () => void;
  onSelectModule: (mode: ModuleMode) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onSelectModule
}) => {
  const privacyStatus = useMemo(() => verifyPrivacyByDesign(), []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    onNavigateHome();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Footer Row: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs tracking-widest shadow-sm">
                LF
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                LIFE
              </span>
            </div>
            <p className="text-sm font-semibold text-violet-400">
              Logical Intelligence &amp; Foresight Engine
            </p>
            <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-violet-400" />
              <span>AI helps you think. You decide.</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Supports structured decision-making and pathway organization rather than guaranteeing outcomes or replacing appropriate professional advice.
            </p>
          </div>

          {/* Nav Column 1: Modules */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Workspaces &amp; Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectModule('lifelens')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  LifeLens (Decision Evaluation)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectModule('liferoute')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  LifeRoute (Action Sequences)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('foresight-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The 6-Vector Foresight Scan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('how-it-works-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  UNDERSTAND → DECIDE → PLAN → ACT
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Governance & System */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Governance Mechanisms
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('governance-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  “Why this result?” Transparency Panel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('governance-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Source Provenance &amp; Information Labels
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('governance-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Optional Stakeholder Considerations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('governance-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accountability &amp; Human Oversight Ledger
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Privacy by Design & Human Oversight Statement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {privacyStatus.isVerifiedLocalOnly && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Privacy by Design (Verified Against Implementation)</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {privacyStatus.detailedExplanation}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {privacyStatus.hostingScopeNotice}
              </p>
            </div>
          )}

          <div className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Human Oversight &amp; Scope Limitations</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              <strong>AI helps you think. You decide.</strong> LIFE is a local rule-based decision-support and pathway tool. It does not perform live external database searches, guarantee outcomes, or replace qualified legal, financial, tax, medical, or technical advice.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bundled demo scenarios and template estimates are provided for illustration only and must be independently verified with official sources or counterparties before making commitments.
            </p>
          </div>
        </div>

        {/* Bottom Sub-Footer: Copyright & Return to Top */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} LIFE — Logical Intelligence &amp; Foresight Engine. AI helps you think. You decide.</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded px-2 py-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
