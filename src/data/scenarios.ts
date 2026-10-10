import { ScenarioPreset, ForesightVector } from '../types';

export const EXAMPLE_SCENARIOS: ScenarioPreset[] = [
  {
    id: 'used-car',
    title: "I'm considering buying a used car.",
    shortLabel: "Used Car Purchase",
    category: "Major Purchase",
    description: "Evaluate mechanical risks, title clean status, total cost of ownership, and independent inspection checkpoints.",
    iconName: "Car"
  },
  {
    id: 'relocation',
    title: "I'm moving to another city for work.",
    shortLabel: "City Relocation",
    category: "Relocation",
    description: "Map lease transition penalties, local tax variances, moving logistics, and social/lifestyle friction points.",
    iconName: "Compass"
  },
  {
    id: 'apartment-rental',
    title: "I'm deciding whether to sign a lease on an apartment.",
    shortLabel: "Apartment Rental",
    category: "Housing",
    description: "Audit hidden ancillary fees, early-termination clauses, acoustic risks, and deposit protection proofs.",
    iconName: "Home"
  },
  {
    id: 'small-business',
    title: "I want to start a small business.",
    shortLabel: "Small Business Launch",
    category: "Entrepreneurship",
    description: "Dissect entity incorporation, recurring compliance filings, operating runway, commercial contracts, and liability exposure.",
    iconName: "Briefcase"
  },
  {
    id: 'job-offer',
    title: "I received a job offer and need to decide if I should accept it.",
    shortLabel: "Job / Internship Offer",
    category: "Career",
    description: "Evaluate real compensation versus paper equity, restrictive non-compete clauses, and background check gates.",
    iconName: "Award"
  },
  {
    id: 'document-renewal',
    title: "I want to renew an official document.",
    shortLabel: "Document Renewal",
    category: "Civic & Legal",
    description: "Navigate processing lag times, apostille/notary prerequisites, expired document penalties, and expedited pathways.",
    iconName: "FileCheck"
  }
];

export const FORESIGHT_VECTORS: ForesightVector[] = [
  {
    id: 'missing-info',
    title: "Missing Information",
    tagline: "What you haven't factored in yet",
    description: "Identifies unstated assumptions, undocumented agreements, unmeasured variables, and blind spots in your initial premise.",
    icon: "HelpCircle",
    color: "#7C3AED",
    accentClass: "text-violet-700",
    bgLightClass: "bg-violet-50/70",
    borderClass: "border-violet-200",
    sampleQuestions: [
      "What undocumented verbal assurances have you relied on?",
      "Which critical cost or timeline estimates lack a written quote?",
      "Have you confirmed the legal jurisdiction and local statutes?"
    ]
  },
  {
    id: 'risks-blindspots',
    title: "Risks & Blind Spots",
    tagline: "What could derail the outcome",
    description: "Surfaces tail-risks, counterparty default scenarios, single points of failure, and cognitive confirmation bias traps.",
    icon: "AlertTriangle",
    color: "#D97706",
    accentClass: "text-amber-700",
    bgLightClass: "bg-amber-50/70",
    borderClass: "border-amber-200",
    sampleQuestions: [
      "If the primary supplier or counterparty cancels tomorrow, what breaks?",
      "What is the worst-case financial drawdown you can absorb?",
      "Are you treating best-case timelines as your baseline?"
    ]
  },
  {
    id: 'hidden-costs',
    title: "Hidden Costs",
    tagline: "Direct, indirect, and opportunity drains",
    description: "Calculates total cost of commitment: recurring maintenance, administrative surcharges, switching friction, and cognitive fatigue.",
    icon: "Coins",
    color: "#2563EB",
    accentClass: "text-blue-700",
    bgLightClass: "bg-blue-50/70",
    borderClass: "border-blue-200",
    sampleQuestions: [
      "What are the recurring maintenance, subscription, and insurance tails?",
      "What non-refundable deposits or exit penalties are baked into the contract?",
      "What other lucrative opportunity are you abandoning by committing here?"
    ]
  },
  {
    id: 'dependencies',
    title: "Dependencies & Prerequisites",
    tagline: "What must happen before step 2 can proceed",
    description: "Uncovers serial blockers, sequential government approvals, third-party sign-offs, and critical path bottlenecks.",
    icon: "GitBranch",
    color: "#059669",
    accentClass: "text-emerald-700",
    bgLightClass: "bg-emerald-50/70",
    borderClass: "border-emerald-200",
    sampleQuestions: [
      "Can this milestone move forward without a signed prior certificate?",
      "Which external authority has an uncontrollable processing SLA?",
      "Whose hardware, signature, or approval holds veto power?"
    ]
  },
  {
    id: 'stakeholders',
    title: "Affected Stakeholders",
    tagline: "Whose lives or roles will change",
    description: "Audits everyone affected by your choice: dependents, partners, co-workers, landlords, and opposing counterparties.",
    icon: "Users",
    color: "#4F46E5",
    accentClass: "text-indigo-700",
    bgLightClass: "bg-indigo-50/70",
    borderClass: "border-indigo-200",
    sampleQuestions: [
      "Who bears the operational burden if this timeline slips by 30 days?",
      "Have you formally aligned with spouse, partner, or co-founders?",
      "Who stands to lose leverage or security as a consequence?"
    ]
  },
  {
    id: 'verification',
    title: "Verification Requirements",
    tagline: "What claims require independent proof",
    description: "Mandates independent evidence: mechanical inspections, apostilled records, title search registries, and certified audited balance sheets.",
    icon: "CheckSquare",
    color: "#0284C7",
    accentClass: "text-sky-700",
    bgLightClass: "bg-sky-50/70",
    borderClass: "border-sky-200",
    sampleQuestions: [
      "Has a neutral, disinterested third-party inspected the asset?",
      "Is the documentation original, certified, and authenticated against public records?",
      "What evidence would immediately invalidate the seller's narrative?"
    ]
  }
];
