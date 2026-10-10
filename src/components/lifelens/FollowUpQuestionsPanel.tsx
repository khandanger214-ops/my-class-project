import React from 'react';
import { HelpCircle, MessageSquareQuote, Sparkles, ArrowRight } from 'lucide-react';

interface FollowUpQuestionsPanelProps {
  questions: string[];
  isCustomFallback: boolean;
}

export const FollowUpQuestionsPanel: React.FC<FollowUpQuestionsPanelProps> = ({
  questions,
  isCustomFallback
}) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-violet-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-4 border-b border-violet-800 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-300 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
            <span>Epistemic Follow-Up Inquiry</span>
          </div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            Critical Clarification Questions
          </h4>
          <p className="text-xs text-violet-300 mt-0.5 leading-relaxed">
            {isCustomFallback
              ? "Because this is a custom scenario, LIFE does not pretend to possess unverified domain facts. Answering these questions resolves your biggest decision risks:"
              : "Stress-testing your assumptions: Before executing, reflect on these specific domain questions:"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((question, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-violet-900/60 border border-violet-800/80 flex items-start gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-violet-800 text-violet-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
              0{idx + 1}
            </span>
            <p className="text-sm font-medium text-violet-100 leading-relaxed">
              {question}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[11px] text-violet-300 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
        <span>You can edit your situation statement above to incorporate these details and regenerate the analysis.</span>
      </div>
    </div>
  );
};
