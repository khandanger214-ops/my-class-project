import { 
  DecisionConstraint, 
  DecisionPriority, 
  InformationSourceType, 
  StakeholderConsideration, 
  TradeoffOption,
  UserDecisionStance,
  VerificationTask
} from './decision';

export type WorkflowStage = 'understand' | 'decide' | 'plan' | 'act';

export interface SharedDecisionContext {
  scenarioStatement: string;
  scenarioSourceType?: InformationSourceType;
  category: string;
  categoryLabel: string;
  userGoal: string;
  goalSourceType?: InformationSourceType;
  selectedOption: TradeoffOption | null;
  constraints: DecisionConstraint[];
  priorities: DecisionPriority[];
  stakeholders?: StakeholderConsideration[];
  includeStakeholders?: boolean;
  flaggedAssumptions?: string[];
  userDecisionStance?: UserDecisionStance;
  verificationTasks?: VerificationTask[];
  completedVerificationTaskIds: string[];
  resolvedFindingIds: string[];
  userNotes?: string;
  isPresentationDemo?: boolean;
  demoScenarioId?: string;
  timestamp: number;
}


