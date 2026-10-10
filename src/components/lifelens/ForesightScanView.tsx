import React, { useState } from 'react';
import { 
  Scan, 
  HelpCircle, 
  AlertTriangle, 
  Coins, 
  GitBranch, 
  Users, 
  CheckSquare, 
  ChevronDown, 
  ChevronUp, 
  Check
} from 'lucide-react';
import { Finding, ForesightDimensionKey, PriorityLevel } from '../../types/decision';
import { InformationSourceBadge } from '../governance/InformationSourceBadge';

interface ForesightScanViewProps {
  findings: Finding[];
}

export const ForesightScanView: React.FC<ForesightScanViewProps> = ({ findings }) => {
  const [selectedDimension, setSelectedDimension] = useState<ForesightDimensionKey | 'all'>('all');
  const [expandedFindings, setExpandedFindings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    findings.forEach(f => {
      if (f.priority === 'Critical' || f.priority === 'High') {
        initial[f.id] = true;
      }
    });
    return initial;
  });
  const [resolvedFindings, setResolvedFindings] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedFindings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleResolved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResolvedFindings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    findings.forEach(f => { allExpanded[f.id] = true; });
    setExpandedFindings(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedFindings({});
  };

  const filteredFindings = selectedDimension === 'all'
    ? findings
    : findings.filter(f => f.dimension === selectedDimension);

  const getDimensionMeta = (key: ForesightDimensionKey) => {
    switch (key) {
      case 'missing-info':
        return {
          label: 'Missing Information',
          icon: <HelpCircle className="w-4 h-4 text-violet-600" />,
          color: 'text-violet-700 bg-violet-50 border-violet-200',
          badgeText: 'Unknown Fact'
        };
      case 'risks':
        return {
          label: 'Potential Risks',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          color: 'text-amber-700 bg-amber-50 border-amber-200',
          badgeText: 'Identified Exposure'
        };
      case 'hidden-costs':
        return {
          label: 'Hidden Costs',
          icon: <Coins className="w-4 h-4 text-blue-600" />,
          color: 'text-blue-700 bg-blue-50 border-blue-200',
          badgeText: 'Cost Factor'
        };
      case 'dependencies':
        return {
          label: 'Dependencies',
          icon: <GitBranch className="w-4 h-4 text-emerald-600" />,
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          badgeText: 'Prerequisite'
        };
      case 'stakeholders':
        return {
          label: 'Affected Stakeholders',
          icon: <Users className="w-4 h-4 text-indigo-600" />,
          color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
          badgeText: 'Optional Third-Party Impact'
        };
      case 'verification':
        return {
          label: 'Verification Requirements',
          icon: <CheckSquare className="w-4 h-4 text-sky-600" />,
          color: 'text-sky-700 bg-sky-50 border-sky-200',
          badgeText: 'Independent Proof'
        };
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Critical':
        return 'bg-amber-100/80 text-amber-950 border-amber-300 font-bold';
      case 'High':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-semibold';
      case 'Moderate':
        return 'bg-blue-50 text-blue-700 border-blue-200 font-medium';
      case 'Advisory':
        return 'bg-slate-100 text-slate-600 border-slate-200 font-normal';
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6" aria-label="LIFE Foresight Scan Results">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-100/70 px-2.5 py-0.5 rounded-full mb-1">
            <Scan className="w-3.5 h-3.5 text-violet-600" />
            <span>Calibrated Risk &amp; Foresight Management</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            LIFE Foresight Scan Findings
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Prioritized by seriousness of potential impact and relevance to your selected priorities—explaining why each item matters and what action you can take.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter by Dimension Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1 hidden sm:inline">
          Filter:
        </span>
        <button
          type="button"
          onClick={() => setSelectedDimension('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
            selectedDimension === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Vectors ({findings.length})
        </button>

        {(['missing-info', 'risks', 'hidden-costs', 'dependencies', 'stakeholders', 'verification'] as ForesightDimensionKey[]).map(key => {
          const count = findings.filter(f => f.dimension === key).length;
          const meta = getDimensionMeta(key);
          const isSelected = selectedDimension === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDimension(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
               <span>{meta.label}</span>
              <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-violet-700 text-violet-100' : 'bg-slate-200 text-slate-700'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Findings List */}
      <div className="space-y-3.5">
        {filteredFindings.map((finding) => {
          const isExpanded = !!expandedFindings[finding.id];
          const isResolved = !!resolvedFindings[finding.id];
          const meta = getDimensionMeta(finding.dimension);

          return (
            <div
              key={finding.id}
              className={`rounded-xl border transition-all ${
                isResolved
                  ? 'bg-slate-50/70 border-slate-200 opacity-60'
                  : isExpanded
                  ? 'bg-white border-violet-300 shadow-sm'
                  : 'bg-white hover:bg-slate-50/50 border-slate-200'
              }`}
            >
              {/* Finding Summary Bar */}
              <div
                onClick={() => toggleExpand(finding.id)}
                className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100">
                    {meta.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {meta.label}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityBadge(finding.priority)}`}>
                        {finding.priority} Seriousness
                      </span>
                      <InformationSourceBadge sourceType={finding.sourceType || 'rule-engine'} />
                      <span className="text-[10px] font-mono text-slate-400">
                        [{meta.badgeText}]
                      </span>
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold ${isResolved ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {finding.title}
                    </h4>

                    {finding.relevanceReason && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-600">Prioritization basis:</span> {finding.relevanceReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => toggleResolved(finding.id, e)}
                    title={isResolved ? "Mark unreviewed" : "Mark reviewed"}
                    className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Finding Expanded Detail */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs animate-fadeIn">
                  {/* Why It Matters */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 space-y-1">
                    <span className="font-bold text-slate-800 uppercase tracking-wide text-[10px] block">
                      Why This Item Matters
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {finding.whyItMatters}
                    </p>
                  </div>

                  {/* Information or Assumption Behind It */}
                  <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/60 space-y-1">
                    <span className="font-bold text-amber-900 uppercase tracking-wide text-[10px] block">
                      Underlying Assumption
                    </span>
                    <p className="text-amber-800 leading-relaxed">
                      {finding.underlyingAssumption}
                    </p>
                  </div>

                  {/* Practical Next Action */}
                  <div className="bg-violet-50/70 p-3 rounded-lg border border-violet-200/70 space-y-1">
                    <span className="font-bold text-violet-900 uppercase tracking-wide text-[10px] block">
                      What Action You Can Take
                    </span>
                    <p className="text-violet-800 font-medium leading-relaxed">
                      {finding.practicalAction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
