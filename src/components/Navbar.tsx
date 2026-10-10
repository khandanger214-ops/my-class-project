import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { ModuleMode } from '../types';

interface NavbarProps {
  currentMode: ModuleMode;
  onNavigateHome: () => void;
  onSelectModule: (mode: ModuleMode) => void;
  onFocusInput: () => void;
  onExploreDemo?: () => void;
  isDemoActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onNavigateHome,
  onSelectModule,
  onFocusInput,
  onExploreDemo,
  isDemoActive = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentMode !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Zone 1: Brand mark + Human Oversight principle */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-md py-1 whitespace-nowrap shrink-0 group cursor-pointer"
            aria-label="LIFE homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:bg-violet-700 transition-colors">
              <span className="font-extrabold text-xs tracking-widest text-violet-300">LF</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  LIFE
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600 hidden sm:inline-block">
                  AI helps you think. You decide.
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-slate-500 hidden sm:inline-block mt-0.5">
                Logical Intelligence &amp; Foresight Engine
              </span>
            </div>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600" aria-label="Main Navigation">
            <button
              onClick={() => onSelectModule('lifelens')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded px-1 cursor-pointer ${
                currentMode === 'lifelens' ? 'text-violet-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LifeLens
            </button>
            <button
              onClick={() => onSelectModule('liferoute')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded px-1 cursor-pointer ${
                currentMode === 'liferoute' ? 'text-violet-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LifeRoute
            </button>
            <button
              onClick={() => handleNavClick('foresight-section')}
              className="text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded px-1 cursor-pointer"
            >
              Foresight Scan
            </button>
            <button
              onClick={() => handleNavClick('how-it-works-section')}
              className="text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded px-1 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('governance-section')}
              className="text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded px-1 cursor-pointer"
            >
              Trust &amp; Governance
            </button>
          </nav>

          {/* Zone 3: Discreet Presentation Mode ('Explore a demo') & Primary Action */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {onExploreDemo && (
              <button
                type="button"
                onClick={onExploreDemo}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
                  isDemoActive
                    ? 'bg-amber-100/90 text-amber-900 border-amber-300'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
                }`}
                title="Load a fictional scenario with clearly labelled illustrative demo data"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isDemoActive ? 'Demo Active' : 'Explore a demo'}</span>
              </button>
            )}

            {currentMode !== 'home' ? (
              <button
                onClick={onNavigateHome}
                className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 cursor-pointer"
              >
                Return to Overview
              </button>
            ) : (
              <button
                onClick={onFocusInput}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-violet-700 transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 cursor-pointer"
              >
                Start Scenario
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {onExploreDemo && (
              <button
                type="button"
                onClick={onExploreDemo}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border bg-white text-slate-700 border-slate-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Explore a demo</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectModule('lifelens');
              }}
              className="text-left py-2 px-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              LifeLens (Decision Engine)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectModule('liferoute');
              }}
              className="text-left py-2 px-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              LifeRoute (Action Paths)
            </button>
            <button
              onClick={() => handleNavClick('foresight-section')}
              className="text-left py-2 px-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              LIFE Foresight Scan
            </button>
            <button
              onClick={() => handleNavClick('how-it-works-section')}
              className="text-left py-2 px-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('governance-section')}
              className="text-left py-2 px-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Trust &amp; Governance
            </button>
          </div>
          <div className="pt-2 border-t border-slate-200 space-y-2">
            {onExploreDemo && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreDemo();
                }}
                className="w-full py-2.5 px-4 text-sm font-semibold text-center text-amber-900 bg-amber-50 border border-amber-300 rounded-lg shadow-2xs"
              >
                Explore a demo (Fictional Scenario)
              </button>
            )}
            {currentMode !== 'home' ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome();
                }}
                className="w-full py-2.5 px-4 text-sm font-semibold text-center text-slate-900 bg-white border border-slate-300 rounded-lg shadow-sm"
              >
                Return to Overview
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onFocusInput();
                }}
                className="w-full py-2.5 px-4 text-sm font-semibold text-center text-white bg-slate-900 rounded-lg shadow-sm hover:bg-violet-700"
              >
                Start Scenario Input
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
