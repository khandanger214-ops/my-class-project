import { InformationSourceType, StakeholderConsideration, UserDecisionStance, WhyThisResult } from './decision';

export interface RouteStep {
  id: string;
  stepNumber: number;
  phaseNumber: number;
  phaseName: string;
  title: string;
  shortSummary: string;
  description: string;
  prerequisiteStepIds: string[];
  requiredDocuments: string[];
  potentialBlockers: string[];
  nextAction: string;
  timeEstimate?: string;
  costEstimate?: string;
  isCompleted: boolean;
  userNotes?: string;
  jurisdictionNotice?: string;
  verificationCheck: string;
  sourceType?: InformationSourceType;
}

export interface RouteData {
  id: string;
  scenarioStatement?: string;
  category: string;
  categoryLabel: string;
  title: string;
  goal: string;
  goalSourceType?: InformationSourceType;
  desiredOutcome: string;
  totalEstimatedDuration?: string;
  sourceIntegrityNotice?: string;
  whyThisRoute?: WhyThisResult;
  stakeholders?: StakeholderConsideration[];
  flaggedAssumptions?: string[];
  userDecisionStance?: UserDecisionStance;
  userDecisionNote?: string;
  steps: RouteStep[];
}

export interface LifeLensHandoffContext {
  scenarioTitle: string;
  scenarioSourceType?: InformationSourceType;
  userGoal: string;
  goalSourceType?: InformationSourceType;
  selectedOptionName?: string;
  constraints: { label: string; value: string; sourceType?: InformationSourceType }[];
  priorities: string[];
  stakeholders?: StakeholderConsideration[];
  flaggedAssumptions?: string[];
  userDecisionStance?: UserDecisionStance;
  userDecisionNote?: string;
  fromLifeLens: boolean;
}


