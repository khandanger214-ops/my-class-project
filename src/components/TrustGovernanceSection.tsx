import React, { useMemo } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Lock, 
  AlertTriangle, 
  UserCheck, 
  Eye, 
  Users,
  Tag
} from 'lucide-react';
import { verifyPrivacyByDesign } from '../engine/governanceVerifier';
import { InformationSourceBadge } from './governance/InformationSourceBadge';

export const TrustGovernanceSection: React.FC = () => {
  const privacyStatus = useMemo(() => verifyPrivacyByDesign(), []);

  const principles = [
    {
      title: "1. Reasoning Transparency (“Why this result?”)",
      subtitle: "Visible factors, assumptions, priorities, unknowns, and limitations",
      description: "Every decision assessment and action route includes a dedicated 'Why this result?' breakdown showing the exact factors considered, active user priorities, underlying assumptions, unknown information, and system limitations.",
      icon: Eye,
      accentColor: "text-violet-700",
      bgColor: "bg-violet-50/70",
      borderColor: "border-violet-200"
    },
    {
      title: "2. Explicit Information Labels",
      subtitle: "Clear distinction between user input, demo data, and rule-based output",
      description: "LIFE labels information by source: User-Supplied input, Bundled Illustrative Demo data, Local Rule-Based Engine guidance, and items requiring External Verification. It never fabricates citations or pretends a live search occurred.",
      icon: Tag,
      accentColor: "text-sky-700",
      bgColor: "bg-sky-50/70",
      borderColor: "border-sky-200"
    },
    {
      title: "3. Calibrated Risk Management",
      subtitle: "Prioritized by seriousness and relevance, not visual drama",
      description: "Findings are ordered by the seriousness of potential financial, contractual, or safety exposure and relevance to your selected priorities. Every item explains why it matters and what practical action you can take.",
      icon: AlertTriangle,
      accentColor: "text-amber-700",
      bgColor: "bg-amber-50/70",
      borderColor: "border-amber-200"
    },
    {
      title: "4. Non-Assumptive Stakeholder Consideration",
      subtitle: "Optional third-party section only when relevant",
      description: "LIFE does not assume every decision involves a family, partner, employer, or co-signer. You can enable or add relevant stakeholders when a decision affects others, or evaluate in solo mode.",
      icon: Users,
      accentColor: "text-indigo-700",
      bgColor: "bg-indigo-50/70",
      borderColor: "border-indigo-200"
    },
    {
      title: "5. Accountability & Human Oversight",
      subtitle: "“AI helps you think. You decide.”",
      description: "The Accountability Ledger tracks incomplete steps, unverified facts, and challenged assumptions. This tool supports structured thinking rather than guaranteeing outcomes or replacing professional legal, financial, or technical advice.",
      icon: UserCheck,
      accentColor: "text-emerald-700",
      bgColor: "bg-emerald-50/70",
      borderColor: "border-emerald-200"
    }
  ];

  return (
    <section id="governance-section" className="py-16 md:py-24 border-b border-slate-200/70" aria-label="Trust and Governance Foundation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-200/60 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Operational Governance &amp; Accountability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Trust &amp; Governance in Your Workflow
          </h2>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            AI helps you think. You decide. LIFE integrates practical transparency, source provenance, and accountability directly into the decision and route workspaces.
          </p>
        </div>

        {/* 5 Pillars + Privacy by Design Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${p.bgColor} ${p.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Mechanism 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">
                    {p.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {idx === 1 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    <InformationSourceBadge sourceType="user-supplied" />
                    <InformationSourceBadge sourceType="rule-engine" />
                    <InformationSourceBadge sourceType="bundled-demo" />
                  </div>
                )}
              </div>
            );
          })}

          {/* 6. Privacy by Design Card (Verified Against Implementation) */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-emerald-300">
                  {privacyStatus.isVerifiedLocalOnly ? '✓ Verified Local Processing' : 'Privacy Notice'}
                </span>
              </div>
              <h3 className="text-base font-bold mb-1">
                6. Privacy by Design
              </h3>
              <p className="text-xs font-semibold text-emerald-300 mb-3">
                No account required · Local rule-based engine · No intentional scenario persistence
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {privacyStatus.detailedExplanation}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-2.5">
                {privacyStatus.hostingScopeNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
