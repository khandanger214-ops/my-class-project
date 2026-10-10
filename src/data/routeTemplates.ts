import { RouteData, RouteStep } from '../types/route';

export const ROUTE_TEMPLATES: Record<string, RouteData> = {
  // -------------------------------------------------------------------------
  // 1. RELOCATING TO ANOTHER CITY FOR WORK
  // -------------------------------------------------------------------------
  'city-relocation': {
    id: 'route-city-relocation',
    category: 'city-relocation',
    categoryLabel: 'Relocation for Work',
    title: 'Planning a Move to Another City for Work',
    goal: 'Execute an orderly cross-city relocation without duplicate rent overlap, legal lease breach, or employer reimbursement disputes.',
    desiredOutcome: 'Settle into target city residence on schedule with all utilities, registrations, and job onboarding prerequisites verified.',
    totalEstimatedDuration: '6 to 8 Weeks Prior to Start Date',
    sourceIntegrityNotice: 'State excise taxes, municipal payroll withholding rates, and vehicle title transfers vary by state and county. Verify exact local tax tables with municipal authorities.',
    steps: [
      {
        id: 'reloc-s1',
        stepNumber: 1,
        phaseNumber: 1,
        phaseName: 'Phase 1: Legal & Employment Foundation',
        title: 'Execute Written Relocation Agreement & Clawback Terms',
        shortSummary: 'Finalize formal written moving package terms before incurring non-refundable moving expenses.',
        description: 'Review employer offer addendum for specific relocation allowance disbursement method (direct billing vs reimbursement), tax gross-up commitments, and clawback payback schedules if you depart within 12–24 months.',
        prerequisiteStepIds: [],
        requiredDocuments: [
          'Countersigned employer offer letter',
          'Relocation expense policy addendum',
          'Tax gross-up schedule documentation'
        ],
        potentialBlockers: [
          'HR delays in issuing formal relocation addendum',
          'Employer refusal to prorate clawback repayment if terminated without cause'
        ],
        nextAction: 'Email HR recruiter requesting written clarification on reimbursement versus direct billing and clawback proration.',
        timeEstimate: '3–5 business days',
        costEstimate: '$0 (Contract negotiation)',
        isCompleted: false,
        verificationCheck: 'Signed addendum in hand confirming exact reimbursement caps.'
      },
      {
        id: 'reloc-s2',
        stepNumber: 2,
        phaseNumber: 1,
        phaseName: 'Phase 1: Legal & Employment Foundation',
        title: 'Audit Current Lease Termination & Serve Notice',
        shortSummary: 'Calculate early lease termination fees and give formal written notice to current landlord.',
        description: 'Examine current residential lease paragraph on early termination. Determine required notice window (typically 30 or 60 days) to prevent automatic penalty rent charges or forfeit of security deposit.',
        prerequisiteStepIds: ['reloc-s1'],
        requiredDocuments: [
          'Current lease agreement contract',
          'Written notice to vacate letter with certified mail / portal confirmation'
        ],
        potentialBlockers: [
          'Current landlord demands 2 months liquidated damages plus loss of deposit',
          'Ambiguity over move-out calendar date'
        ],
        nextAction: 'Draft and submit written notice to vacate specifying exact departure date and requesting initial move-out inspection.',
        timeEstimate: '1–2 days to serve notice; 30–60 days notice window',
        costEstimate: '$0–$3,500 (Depending on early exit clause penalty)',
        isCompleted: false,
        verificationCheck: 'Written written confirmation from current property manager accepting notice date.'
      },
      {
        id: 'reloc-s3',
        stepNumber: 3,
        phaseNumber: 2,
        phaseName: 'Phase 2: Destination Housing & Logistics',
        title: 'Secure Destination Housing & Verify Neighborhood Commute',
        shortSummary: 'Sign target lease after verifying true peak rush-hour commute and in-person or live video unit condition.',
        description: 'Finalize apartment lease or temporary furnished living. Test door-to-door transit during real peak morning hours. Ensure move-in date allows 48-hour buffer before first day of employment.',
        prerequisiteStepIds: ['reloc-s1', 'reloc-s2'],
        requiredDocuments: [
          'Proof of income / employer offer letter for leasing approval',
          'Destination lease agreement',
          'Renters insurance binder meeting landlord liability limits'
        ],
        potentialBlockers: [
          'Leasing application credit check delay',
          'Target unit unavailable on required move-in weekend'
        ],
        nextAction: 'Execute lease agreement, wire deposit to verified corporate management account, and bind renters insurance.',
        timeEstimate: '7–14 days',
        costEstimate: 'First month rent + Security deposit (approx. $3,000–$5,500)',
        isCompleted: false,
        verificationCheck: 'Countersigned lease and confirmed key collection schedule.'
      },
      {
        id: 'reloc-s4',
        stepNumber: 4,
        phaseNumber: 2,
        phaseName: 'Phase 2: Destination Housing & Logistics',
        title: 'Contract Licensed Interstate Mover or Reserve Freight',
        shortSummary: 'Obtain binding not-to-exceed estimates from licensed carriers and lock in moving calendar.',
        description: 'Secure written binding quotes with DOT/MC license verification. Avoid unregulated broker aggregators who hostage-price shipments upon delivery. Confirm building elevator booking windows for loading and unloading.',
        prerequisiteStepIds: ['reloc-s3'],
        requiredDocuments: [
          'Binding Not-to-Exceed Moving Estimate',
          'Carrier USDOT license registration verification',
          'Certificate of Insurance (COI) for both building management offices'
        ],
        potentialBlockers: [
          'Carrier delivery window spanning 7–14 days without guaranteed delivery date',
          'Building freight elevator reservation conflicts'
        ],
        nextAction: 'Reserve moving date and request Carrier Certificate of Insurance naming destination building as additional insured.',
        timeEstimate: '3–5 days to obtain quotes; 1 day execution',
        costEstimate: '$2,200–$5,800 depending on distance and weight',
        isCompleted: false,
        verificationCheck: 'Signed binding estimate and confirmed elevator reservation slots.'
      },
      {
        id: 'reloc-s5',
        stepNumber: 5,
        phaseNumber: 3,
        phaseName: 'Phase 3: Administrative & Civic Transition',
        title: 'Establish Destination Utilities & Postal Address Forwarding',
        shortSummary: 'Schedule electricity, water, internet turn-on and enroll in USPS official mail forwarding.',
        description: 'Coordinate utility shut-off at origin and activation at destination 24 hours prior to arrival. Submit official USPS change of address to maintain credit card and government mail receipt.',
        prerequisiteStepIds: ['reloc-s3'],
        requiredDocuments: [
          'Destination lease showing physical address',
          'USPS official change of address confirmation'
        ],
        potentialBlockers: [
          'Utility deposit requirements for out-of-state accounts',
          'Broadband installation backlogs exceeding 10 business days'
        ],
        nextAction: 'Schedule electric and internet turn-on dates online with local municipal utilities.',
        timeEstimate: '2–3 hours',
        costEstimate: '$100–$250 in utility account activation deposits',
        isCompleted: false,
        verificationCheck: 'Utility activation confirmation numbers recorded.'
      },
      {
        id: 'reloc-s6',
        stepNumber: 6,
        phaseNumber: 3,
        phaseName: 'Phase 3: Administrative & Civic Transition',
        title: 'Civic Re-registration (Driver License, Vehicle Title & Taxes)',
        shortSummary: 'Update state driver’s license, vehicle registration, and state payroll tax withholding.',
        description: 'Most states legally require driver’s license and vehicle registration transfer within 30 to 60 days of establishing residency. Submit new state W-4 tax withholding form to employer payroll.',
        prerequisiteStepIds: ['reloc-s3', 'reloc-s5'],
        requiredDocuments: [
          'Current out-of-state title and registration',
          'Two proofs of destination residency (utility bill, signed lease)',
          'Social Security card or birth certificate'
        ],
        potentialBlockers: [
          'DMV in-person appointment backlogs',
          'Vehicle emissions or safety inspection failure'
        ],
        nextAction: 'Book DMV transfer appointment online and submit updated state W-4 to employer HR portal.',
        timeEstimate: 'Within 30 days of arrival',
        costEstimate: '$150–$600 depending on state title and registration excise taxes',
        jurisdictionNotice: 'State motor vehicle codes impose fines for failure to transfer registration within statutory windows (usually 30 days).',
        isCompleted: false,
        verificationCheck: 'New state driver’s license in hand and updated payroll paystub verified.'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 2. STARTING A SMALL BUSINESS
  // -------------------------------------------------------------------------
  'small-business': {
    id: 'route-small-business',
    category: 'small-business',
    categoryLabel: 'Entrepreneurship & Incorporation',
    title: 'Preparing to Start a Small Business',
    goal: 'Establish an insulated commercial entity with validated paying customers, zero personal liability leakage, and statutory tax compliance.',
    desiredOutcome: 'Legally incorporated entity with active commercial banking, business insurance, regulatory permits, and first paying client invoices.',
    totalEstimatedDuration: '4 to 8 Weeks to First Commercial Transaction',
    sourceIntegrityNotice: 'Secretary of State filing fees, annual franchise taxes (e.g. $800 in CA), and municipal business licensing vary by city and state. Verify through your specific Secretary of State and municipal clerk.',
    steps: [
      {
        id: 'biz-s1',
        stepNumber: 1,
        phaseNumber: 1,
        phaseName: 'Phase 1: Legal Shielding & Entity Formation',
        title: 'Audit Current Employer IP Restrictions & Moonlighting Policy',
        shortSummary: 'Verify zero intellectual property ownership crossover before writing code or signing contracts.',
        description: 'Review existing employment agreement for invention assignment covenants. Confirm that no company hardware, software accounts, customer lists, or working hours are used for venture creation.',
        prerequisiteStepIds: [],
        requiredDocuments: [
          'Current or recent employment contract',
          'Proprietary Information and Inventions Agreement (PIIA)'
        ],
        potentialBlockers: [
          'Broad employer IP clauses claiming all inventions created during term of employment',
          'Non-compete or client non-solicitation restrictions'
        ],
        nextAction: 'Perform clean-room audit of personal hardware and verify zero company resources touched the venture.',
        timeEstimate: '2–3 days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Written confirmation that venture IP was created solely on personal hardware outside working hours.'
      },
      {
        id: 'biz-s2',
        stepNumber: 2,
        phaseNumber: 1,
        phaseName: 'Phase 1: Legal Shielding & Entity Formation',
        title: 'File Articles of Organization & Secure Federal EIN',
        shortSummary: 'Incorporate LLC or Corporation with state and obtain IRS Employer ID Number.',
        description: 'File formation documents with the Secretary of State. Once stamped certificate of formation is received, obtain free Federal EIN directly on IRS.gov (never pay third-party service fees for an EIN).',
        prerequisiteStepIds: ['biz-s1'],
        requiredDocuments: [
          'Articles of Organization / Incorporation',
          'Registered Agent designation certificate',
          'IRS Form SS-4 (EIN Confirmation Notice)'
        ],
        potentialBlockers: [
          'Desired business name already registered in state database',
          'State processing backlogs for paper filings'
        ],
        nextAction: 'Check entity name availability on state corporate registry and complete online filing.',
        timeEstimate: '1–5 business days',
        costEstimate: '$50–$300 state filing fee (varies by jurisdiction)',
        jurisdictionNotice: 'State franchise taxes and annual report fees recur annually regardless of profitability.',
        isCompleted: false,
        verificationCheck: 'Official stamped state charter and IRS CP-575 EIN notice document.'
      },
      {
        id: 'biz-s3',
        stepNumber: 3,
        phaseNumber: 2,
        phaseName: 'Phase 2: Banking & Liability Isolation',
        title: 'Open Dedicated Commercial Bank Account & Bind Operating Agreement',
        shortSummary: 'Establish financial perimeter to preserve corporate veil protection.',
        description: 'Execute formal Operating Agreement defining equity, voting, and dissolution terms. Open business checking account. Never commingle personal funds with company revenue.',
        prerequisiteStepIds: ['biz-s2'],
        requiredDocuments: [
          'Stamped Articles of Organization',
          'EIN Confirmation Notice',
          'Signed Operating Agreement / Corporate Resolution',
          'Valid government ID for all beneficial owners (>25%)'
        ],
        potentialBlockers: [
          'Bank FinCEN beneficial ownership verification delays',
          'Incomplete member operating agreement signatures'
        ],
        nextAction: 'Schedule appointment with commercial business banker and deposit initial capital contribution.',
        timeEstimate: '1–3 business days',
        costEstimate: '$100–$500 initial capital contribution deposit',
        isCompleted: false,
        verificationCheck: 'Bank corporate debit card, online banking credentials, and zero personal commingling.'
      },
      {
        id: 'biz-s4',
        stepNumber: 4,
        phaseNumber: 2,
        phaseName: 'Phase 2: Banking & Liability Isolation',
        title: 'Bind Commercial General Liability & E&O Insurance Policy',
        shortSummary: 'Protect business and personal assets against third-party bodily injury and errors.',
        description: 'Obtain commercial general liability policy. If providing professional or digital services, bind Professional Liability / Errors & Omissions (E&O) before signing client contracts.',
        prerequisiteStepIds: ['biz-s2', 'biz-s3'],
        requiredDocuments: [
          'Business insurance application',
          'Certificate of Insurance (COI) binder'
        ],
        potentialBlockers: [
          'Underwriting exclusions for high-risk commercial activities',
          'Delay in policy binding'
        ],
        nextAction: 'Obtain two quotes from commercial insurance brokers specializing in your industry.',
        timeEstimate: '2–4 business days',
        costEstimate: '$450–$1,200 annual premium',
        isCompleted: false,
        verificationCheck: 'Active Certificate of Insurance with effective dates matching launch window.'
      },
      {
        id: 'biz-s5',
        stepNumber: 5,
        phaseNumber: 3,
        phaseName: 'Phase 3: Regulatory Licensing & Commercial Contracts',
        title: 'Procure Municipal Business Licenses & Standard Master Services Agreement',
        shortSummary: 'Obtain city tax certificate and standardize customer contracts with limitation of liability.',
        description: 'Register with city hall or county clerk for municipal business license. Draft standard customer agreement containing clear payment terms, IP ownership assignment, and liability caps.',
        prerequisiteStepIds: ['biz-s3', 'biz-s4'],
        requiredDocuments: [
          'City/County Business Tax Registration Application',
          'Standard Customer Master Services Agreement (MSA) / Statement of Work (SOW)',
          'State sales tax exemption or resale certificate (if selling goods)'
        ],
        potentialBlockers: [
          'Municipal zoning restrictions for home-based or retail operations',
          'Negotiating redlines on customer contracts'
        ],
        nextAction: 'File municipal business tax registration online with local city clerk.',
        timeEstimate: '5–10 business days',
        costEstimate: '$50–$250 city registration fee',
        jurisdictionNotice: 'Local municipal zoning and health permits are strictly jurisdictional; operating without registration risks civil citations.',
        isCompleted: false,
        verificationCheck: 'City business license certificate posted and standardized contract template ready.'
      },
      {
        id: 'biz-s6',
        stepNumber: 6,
        phaseNumber: 3,
        phaseName: 'Phase 3: Regulatory Licensing & Commercial Contracts',
        title: 'Close First Paid Customer Engagement & Invoice via Commercial Account',
        shortSummary: 'Execute first paid transaction with verified billing infrastructure and tax withholding escrow.',
        description: 'Deliver initial engagement with countersigned SOW. Deposit client funds directly into commercial account and immediately transfer 25% of gross margin into dedicated tax reserve sub-account.',
        prerequisiteStepIds: ['biz-s3', 'biz-s4', 'biz-s5'],
        requiredDocuments: [
          'Signed Statement of Work / Work Order',
          'Commercial tax invoice with payment terms',
          'W-9 form provided to client'
        ],
        potentialBlockers: [
          'Client payment terms lagging (e.g. Net-60 delays)',
          'Failure to escrow quarterly estimated taxes'
        ],
        nextAction: 'Send formal invoice and W-9 form to client finance department.',
        timeEstimate: 'Ongoing milestone',
        costEstimate: '$0 (Revenue generation)',
        isCompleted: false,
        verificationCheck: 'First cleared client deposit reflected on commercial bank statement.'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 3. PREPARING FOR AN INTERNSHIP OR JOB APPLICATION
  // -------------------------------------------------------------------------
  'job-internship-offer': {
    id: 'route-job-application',
    category: 'job-internship-offer',
    categoryLabel: 'Career & Offer Transition',
    title: 'Preparing for an Internship or Job Application & Onboarding',
    goal: 'Navigate application, interview evaluation, compensation negotiation, and legal background clearance with complete diligence.',
    desiredOutcome: 'Secure and accept desired employment role with written protections, cleared contingencies, and protected personal IP.',
    totalEstimatedDuration: '4 to 6 Weeks Process Runway',
    sourceIntegrityNotice: 'Labor laws regarding salary history bans, non-compete enforceability (e.g. FTC rules and California bans), and background check notices vary by state.',
    steps: [
      {
        id: 'job-s1',
        stepNumber: 1,
        phaseNumber: 1,
        phaseName: 'Phase 1: Portfolio Readiness & Application Screening',
        title: 'Calibrate Experience Portfolio & Resume Metric Proofs',
        shortSummary: 'Align demonstrable portfolio evidence and remove generic buzzwords before submitting.',
        description: 'Refactor resume and portfolio to demonstrate quantified outcome metrics (e.g. revenue, latency, efficiency) rather than passive duty descriptions. Ensure LinkedIn profile matches date invariants.',
        prerequisiteStepIds: [],
        requiredDocuments: [
          'Tailored PDF resume with consistent chronological dates',
          'Public portfolio, repository, or work case studies with sanitized confidential data'
        ],
        potentialBlockers: [
          'Inadvertent disclosure of former employer proprietary data in portfolio case studies'
        ],
        nextAction: 'Audit public portfolio for NDA compliance and submit target applications.',
        timeEstimate: '3–5 days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Sanitized portfolio reviewed and approved for public disclosure.'
      },
      {
        id: 'job-s2',
        stepNumber: 2,
        phaseNumber: 1,
        phaseName: 'Phase 1: Portfolio Readiness & Application Screening',
        title: 'Conduct Due Diligence on Team Turnover & Culture',
        shortSummary: 'Inspect manager retention and company runway before entering final interview stages.',
        description: 'Analyze company runway, recent layoffs, and executive attrition. Speak with a current or recent team alumnus off-the-record to verify true work-life balance and team dynamics.',
        prerequisiteStepIds: ['job-s1'],
        requiredDocuments: [
          'LinkedIn team search history',
          'List of specific culture and roadmap inquiry questions for hiring manager'
        ],
        potentialBlockers: [
          'Difficulty connecting with unbiased alumni',
          'Misleading promotional recruiter narratives'
        ],
        nextAction: 'Reach out to 1 former employee via LinkedIn with a polite 15-minute informational inquiry.',
        timeEstimate: '3–4 days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Unfiltered qualitative insight gathered on manager style and team expectations.'
      },
      {
        id: 'job-s3',
        stepNumber: 3,
        phaseNumber: 2,
        phaseName: 'Phase 2: Offer Evaluation & Contract Diligence',
        title: 'Audit Complete Written Offer & Summary Plan Description',
        shortSummary: 'Deconstruct total compensation: base salary, bonus hurdles, equity terms, and healthcare deductibles.',
        description: 'Never evaluate an offer solely on nominal base salary. Request written Summary Plan Description (SPD) for medical benefits, 401(k) vesting cliffs, and equity strike price / capitalization details.',
        prerequisiteStepIds: ['job-s2'],
        requiredDocuments: [
          'Formal written offer letter',
          'Benefits Summary Plan Description (SPD)',
          'Equity option plan summary or RSU vesting terms'
        ],
        potentialBlockers: [
          'Recruiter pressure to accept within 48-hour explosive deadline',
          'Refusal to provide equity share pool or strike price specifics'
        ],
        nextAction: 'Request full benefits document packet and equity plan disclosure from recruiter.',
        timeEstimate: '2–3 business days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Written compensation terms itemized in formal offer document.'
      },
      {
        id: 'job-s4',
        stepNumber: 4,
        phaseNumber: 2,
        phaseName: 'Phase 2: Offer Evaluation & Contract Diligence',
        title: 'Negotiate Contract Addenda & Intellectual Property Carve-Outs',
        shortSummary: 'Submit prioritized counter-proposal and attach Exhibit A listing pre-existing personal inventions.',
        description: 'Present prioritized negotiation points (base salary, sign-on bonus, remote work stability). Review Inventions Assignment agreement and formally list pre-existing software, blogs, or side businesses on Exhibit A.',
        prerequisiteStepIds: ['job-s3'],
        requiredDocuments: [
          'Written negotiation email counter-proposal',
          'Exhibit A: Prior Inventions Disclosure form'
        ],
        potentialBlockers: [
          'Company refusal to amend standard legal agreement template',
          'Employer pushback on compensation increase'
        ],
        nextAction: 'Draft Exhibit A detailing all personal repositories and submit consolidated negotiation requests.',
        timeEstimate: '2–4 business days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Countersigned offer letter incorporating agreed modifications and Exhibit A.'
      },
      {
        id: 'job-s5',
        stepNumber: 5,
        phaseNumber: 3,
        phaseName: 'Phase 3: Contingency Clearance & Resignation',
        title: 'Wait for Formal Background & Credential Check Clearance',
        shortSummary: 'Do NOT give notice to current employer until background investigation is 100% complete.',
        description: 'Most offers state "contingent upon successful completion of background check". A paperwork discrepancy or former employer HR delay can lead to rescinded offers. Wait for written clearance notice.',
        prerequisiteStepIds: ['job-s4'],
        requiredDocuments: [
          'Background check authorization disclosure',
          'Degree transcripts or employment verification records',
          'Written HR notification confirming all contingencies cleared'
        ],
        potentialBlockers: [
          'Third-party screening vendor backlog verifying past employment dates',
          'Pressure from new employer to start before report finishes'
        ],
        nextAction: 'Check online portal for third-party screening agency to confirm report status is 100% complete.',
        timeEstimate: '5–10 business days',
        costEstimate: '$0 (Paid by employer)',
        isCompleted: false,
        verificationCheck: 'Written email confirmation from hiring HR that background check is complete and contingencies removed.'
      },
      {
        id: 'job-s6',
        stepNumber: 6,
        phaseNumber: 3,
        phaseName: 'Phase 3: Contingency Clearance & Resignation',
        title: 'Serve Professional Notice & Transition Active Responsibilities',
        shortSummary: 'Give standard two-week resignation and prepare documentation handover.',
        description: 'Deliver concise, professional resignation letter to current supervisor. Prepare documentation handover plan. Protect relationships and ensure zero company files are forwarded to personal email.',
        prerequisiteStepIds: ['job-s5'],
        requiredDocuments: [
          'Formal resignation letter stating final date of employment',
          'Transition checklist of open projects and documentation links'
        ],
        potentialBlockers: [
          'Immediate escort out of building (be prepared with personal items already cleared)',
          'Aggressive counter-offers intended to delay departure'
        ],
        nextAction: 'Schedule 15-minute meeting with direct manager to deliver formal notice professionally.',
        timeEstimate: '10 business days notice window',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Accepted resignation date, signed handover, and clear conscience.'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 4. PLANNING A USED-CAR PURCHASE
  // -------------------------------------------------------------------------
  'used-car': {
    id: 'route-used-car',
    category: 'used-car',
    categoryLabel: 'Major Vehicle Purchase',
    title: 'Planning a Used-Car Purchase',
    goal: 'Acquire a mechanically sound vehicle with clear legal title, fair market pricing, and zero unexpected first-year repairs.',
    desiredOutcome: 'Legally registered vehicle in possession with verified PPI mechanical inspection report, clean title, and active insurance.',
    totalEstimatedDuration: '1 to 2 Weeks Active Search and Closing',
    sourceIntegrityNotice: 'DMV title transfer fees, sales/excise taxes, and mandatory safety/emissions inspection cycles vary by state. Check with state Department of Motor Vehicles.',
    steps: [
      {
        id: 'car-s1',
        stepNumber: 1,
        phaseNumber: 1,
        phaseName: 'Phase 1: Search & Pre-Screening Diligence',
        title: 'Run NMVTIS Vehicle History Report & Verify Market Comps',
        shortSummary: 'Filter listings with Carfax/AutoCheck for salvage titles, lemon buybacks, and odometer rollbacks.',
        description: 'Screen potential vehicle by 17-digit VIN. Verify title branding (salvage, flood, rebuilt, taxi use), accident history, and consistent odometer progression. Compare pricing against Edmunds and Kelley Blue Book fair private market values.',
        prerequisiteStepIds: [],
        requiredDocuments: [
          '17-digit Vehicle Identification Number (VIN)',
          'NMVTIS-compliant vehicle history report',
          'Comparative market valuation comps'
        ],
        potentialBlockers: [
          'Seller refuses to provide VIN prior to physical meeting',
          'Discrepancies in recorded mileage between state inspection records'
        ],
        nextAction: 'Request VIN and high-resolution photo of title document from seller.',
        timeEstimate: '1–2 hours',
        costEstimate: '$25–$45 for comprehensive vehicle history report',
        isCompleted: false,
        verificationCheck: 'Clean title history report showing zero brand warnings or structural total loss.'
      },
      {
        id: 'car-s2',
        stepNumber: 2,
        phaseNumber: 1,
        phaseName: 'Phase 1: Search & Pre-Screening Diligence',
        title: 'Obtain VIN-Specific Insurance Premium Quote',
        shortSummary: 'Determine exact monthly collision and liability insurance delta before negotiating.',
        description: 'Contact auto insurance agent with the specific vehicle trim and VIN. Certain vehicles carry significantly higher repair rates, theft statistics, or liability surcharges that alter monthly ownership economics.',
        prerequisiteStepIds: ['car-s1'],
        requiredDocuments: [
          'Target vehicle VIN and exact trim/safety equipment list',
          'Current insurance policy declaration page'
        ],
        potentialBlockers: [
          'Insurance rate surge due to vehicle theft vulnerability or high performance class'
        ],
        nextAction: 'Input VIN into insurance online quote portal to obtain precise monthly premium.',
        timeEstimate: '30 minutes',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Written premium estimate saved in purchase folder.'
      },
      {
        id: 'car-s3',
        stepNumber: 3,
        phaseNumber: 2,
        phaseName: 'Phase 2: Mechanical Inspection & Negotiation',
        title: 'Perform Cold-Start Test Drive & Independent Pre-Purchase Inspection (PPI)',
        shortSummary: 'Have an ASE-certified mechanic put vehicle on a hydraulic lift to examine powertrain and chassis.',
        description: 'Verify engine block is completely cold before starting. Inspect for tailpipe smoke and timing chain noise. Transport vehicle to neutral certified mechanic for complete Pre-Purchase Inspection ($150–$250).',
        prerequisiteStepIds: ['car-s1', 'car-s2'],
        requiredDocuments: [
          'ASE-certified mechanic multi-point inspection checklist',
          'OBD-II diagnostic scan readouts for emissions readiness monitors'
        ],
        potentialBlockers: [
          'Seller refuses to allow third-party mechanic inspection on a lift',
          'OBD-II monitors showing "Not Ready" (indicating recently cleared trouble codes)'
        ],
        nextAction: 'Schedule 1-hour appointment at a nearby independent mechanic shop.',
        timeEstimate: '2–3 hours',
        costEstimate: '$150–$250 for independent mechanic inspection',
        isCompleted: false,
        verificationCheck: 'Written inspection report confirming suspension, brakes, frame, and powertrain health.'
      },
      {
        id: 'car-s4',
        stepNumber: 4,
        phaseNumber: 2,
        phaseName: 'Phase 2: Mechanical Inspection & Negotiation',
        title: 'Audit Physical Title Document & Verify Matching Identification',
        shortSummary: 'Confirm seller name matches paper title with zero unsatisfied bank liens.',
        description: 'Examine paper title. The seller’s government-issued driver’s license must match the printed name on the title. If title shows a lienholder bank, the vehicle cannot be transferred until the seller obtains an official lien release stamp.',
        prerequisiteStepIds: ['car-s1', 'car-s3'],
        requiredDocuments: [
          'Original physical Certificate of Title',
          'Seller government photo ID',
          'Lien release letter from bank (if applicable)'
        ],
        potentialBlockers: [
          '"Title jumping" (seller is not the name printed on title; attempting to flip without paying tax)',
          'Active unreleased bank loan on vehicle'
        ],
        nextAction: 'Physically inspect title document in person before counting funds.',
        timeEstimate: '30 minutes',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Title in hand with matching seller ID and zero outstanding liens.'
      },
      {
        id: 'car-s5',
        stepNumber: 5,
        phaseNumber: 3,
        phaseName: 'Phase 3: Secure Closing & DMV Title Transfer',
        title: 'Execute Secure Closing at Bank or DMV Office',
        shortSummary: 'Complete bill of sale, exchange cashier’s check, and obtain signed title in neutral location.',
        description: 'Meet seller at your bank branch or a DMV licensing office. Exchange cashier’s check for signed title and completed Bill of Sale including odometer disclosure statement. Immediately bind insurance coverage before driving away.',
        prerequisiteStepIds: ['car-s3', 'car-s4'],
        requiredDocuments: [
          'Countersigned Bill of Sale with odometer disclosure',
          'Properly endorsed Title signed over in correct buyer/seller boxes',
          'Active auto insurance policy binder card'
        ],
        potentialBlockers: [
          'Seller demands cash in an unsafe location',
          'Errors in signature boxes on title (erasing voids the title in most states)'
        ],
        nextAction: 'Obtain cashier’s check and meet at bank counter for notarized transfer.',
        timeEstimate: '1–2 hours',
        costEstimate: 'Agreed purchase price + $10–$20 notary fee',
        isCompleted: false,
        verificationCheck: 'Signed title, bill of sale, and vehicle keys in hand with insurance binder activated.'
      },
      {
        id: 'car-s6',
        stepNumber: 6,
        phaseNumber: 3,
        phaseName: 'Phase 3: Secure Closing & DMV Title Transfer',
        title: 'Submit Title Registration & Pay State Excise Sales Tax',
        shortSummary: 'Register vehicle at state DMV, transfer or issue license plates, and obtain registration.',
        description: 'Bring signed title, bill of sale, emissions certificate, and insurance proof to state DMV or licensing agency. Pay state sales tax and registration fees to receive permanent license plates.',
        prerequisiteStepIds: ['car-s5'],
        requiredDocuments: [
          'Signed Certificate of Title',
          'Bill of Sale and Odometer Disclosure',
          'Proof of active vehicle insurance',
          'State emissions/safety inspection certificate'
        ],
        potentialBlockers: [
          'DMV queues or appointment delays',
          'Sales tax cash requirement (budget 6–10% of purchase price)'
        ],
        nextAction: 'Visit county clerk or DMV office within 10 days to complete legal registration.',
        timeEstimate: 'Half day',
        costEstimate: 'State sales tax (approx. $800–$1,600) + DMV plate transfer fee ($80–$250)',
        jurisdictionNotice: 'States impose late registration surcharges if title transfer is delayed past statutory limit (usually 10–30 days).',
        isCompleted: false,
        verificationCheck: 'Permanent registration card and license plate tags affixed to vehicle.'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 5. RENEWING AN OFFICIAL DOCUMENT (Generic Steps with Jurisdiction Notice)
  // -------------------------------------------------------------------------
  'document-renewal': {
    id: 'route-document-renewal',
    category: 'document-renewal',
    categoryLabel: 'Civic & Government Process',
    title: 'Renewing an Official Document (Illustrative Process)',
    goal: 'Navigate official document renewal with zero processing lapses, apostille authentication, and compliance verification.',
    desiredOutcome: 'Receive renewed government credential safely with updated biographical data and zero identity lapses.',
    totalEstimatedDuration: '3 to 6 Weeks (Standard) / 7 to 10 Days (Expedited)',
    sourceIntegrityNotice: 'ILLUSTRATIVE GENERIC STEPS: Official government document renewal rules (forms, fee schedules, apostille requirements, processing backlogs) depend strictly on your municipal, state, or national agency. Always verify the authoritative .gov portal.',
    steps: [
      {
        id: 'doc-s1',
        stepNumber: 1,
        phaseNumber: 1,
        phaseName: 'Phase 1: Eligibility Audit & Agency Verification',
        title: 'Verify Official Authority Portal & Form Revision Number',
        shortSummary: 'Confirm official government portal URL (.gov) and avoid third-party copycat scam sites.',
        description: 'Verify eligibility criteria (e.g. renewal by mail vs mandatory in-person appointment). Confirm you are using the official government website. Avoid commercial intermediary sites charging fee markups for free government forms.',
        prerequisiteStepIds: [],
        requiredDocuments: [
          'Expiring official document / credential',
          'Official agency renewal instructions checklist'
        ],
        potentialBlockers: [
          'Commercial scam sites impersonating official government agencies in search results',
          'Ineligibility for mail renewal if document expired beyond statutory window'
        ],
        nextAction: 'Navigate directly to official .gov agency portal and download the current application form revision.',
        timeEstimate: '30 minutes',
        costEstimate: '$0',
        jurisdictionNotice: 'Processing times and mail eligibility rules vary drastically by agency jurisdiction. Verify directly on the official .gov portal.',
        isCompleted: false,
        verificationCheck: 'URL confirmed as authentic government registry portal.'
      },
      {
        id: 'doc-s2',
        stepNumber: 2,
        phaseNumber: 1,
        phaseName: 'Phase 1: Eligibility Audit & Agency Verification',
        title: 'Audit Supporting Identity Documents & Certified Vital Records',
        shortSummary: 'Assemble certified birth certificates, naturalization papers, or legal name change orders.',
        description: 'Government agencies require certified primary documentation with raised embossed seals—photocopies are routinely rejected. Check that spelling of full legal name matches across all records.',
        prerequisiteStepIds: ['doc-s1'],
        requiredDocuments: [
          'Original expiring document',
          'Certified birth certificate with raised seal or naturalization certificate',
          'Certified marriage certificate or court order (if name changed)'
        ],
        potentialBlockers: [
          'Missing original certified birth certificate (requires 2–4 weeks to order from state vital records)',
          'Discrepancies in middle name spelling between records'
        ],
        nextAction: 'Inspect physical documents to verify all have official raised notary/state seals.',
        timeEstimate: '1–2 days',
        costEstimate: '$0 (or $25–$45 if ordering certified vital records duplicate)',
        isCompleted: false,
        verificationCheck: 'Physical original certified documents with embossed seals in hand.'
      },
      {
        id: 'doc-s3',
        stepNumber: 3,
        phaseNumber: 2,
        phaseName: 'Phase 2: Biometrics, Payment & Submission Dossier',
        title: 'Procure Biometric Specification Photos',
        shortSummary: 'Capture biometric photos meeting strict dimensions, lighting, and background criteria.',
        description: 'Photo defects (glare on glasses, slight shadows, wrong crop ratio, smiling, wrong matte/gloss paper) are the #1 cause of application suspension. Have photos taken by a specialized provider with biometric verification.',
        prerequisiteStepIds: ['doc-s1'],
        requiredDocuments: [
          'Two identical biometric specification photos (e.g. 2x2 inch, neutral expression)'
        ],
        potentialBlockers: [
          'Automated agency scanner rejects photo for uneven background illumination or glare'
        ],
        nextAction: 'Visit authorized passport photo pharmacy or postal window for certified photos.',
        timeEstimate: '1 hour',
        costEstimate: '$15–$25',
        isCompleted: false,
        verificationCheck: 'Photos printed on photographic paper meeting exact millimeter dimensions.'
      },
      {
        id: 'doc-s4',
        stepNumber: 4,
        phaseNumber: 2,
        phaseName: 'Phase 2: Biometrics, Payment & Submission Dossier',
        title: 'Prepare Exact Payment Instrument (Check / Money Order)',
        shortSummary: 'Obtain cashier’s check or money order in exact statutory amount payable to agency.',
        description: 'Many government agencies reject credit cards or personal checks for mailed applications. Errors in the payee name or dollar amount result in immediate application rejection without processing.',
        prerequisiteStepIds: ['doc-s1'],
        requiredDocuments: [
          'Bank cashier’s check or USPS postal money order in exact statutory amount',
          'Applicant full name and birthdate written in memo line'
        ],
        potentialBlockers: [
          'Agency fee increase enacted since form was printed',
          'Incorrect payee line wording'
        ],
        nextAction: 'Verify exact current statutory fee on official portal and purchase bank cashier’s check.',
        timeEstimate: '1 hour',
        costEstimate: 'Official statutory fee + $2 money order fee',
        jurisdictionNotice: 'Government fees are set by statute and subject to periodic legislative adjustment.',
        isCompleted: false,
        verificationCheck: 'Payment check drawn in exact statutory amount with memo details.'
      },
      {
        id: 'doc-s5',
        stepNumber: 5,
        phaseNumber: 3,
        phaseName: 'Phase 3: Tracked Custody & Status Alerting',
        title: 'Dispatch Dossier Via Certified Trackable Signature Delivery',
        shortSummary: 'Create complete digital scan photocopy and dispatch via trackable registered mail.',
        description: 'Make high-resolution color scans of every page, check, and photo for your permanent records before sealing the envelope. Send via trackable courier with return receipt or signature required.',
        prerequisiteStepIds: ['doc-s2', 'doc-s3', 'doc-s4'],
        requiredDocuments: [
          'Complete scanned photocopy of submitted package',
          'Registered/Priority mail tracking barcode label'
        ],
        potentialBlockers: [
          'Package lost in transit without tracking number',
          'Surrendering primary identification without active secondary travel ID'
        ],
        nextAction: 'Take package to postal counter, obtain registered tracking receipt, and save copy in files.',
        timeEstimate: '1–2 hours',
        costEstimate: '$10–$30 for trackable priority signature mailing',
        isCompleted: false,
        verificationCheck: 'Postal tracking receipt number saved and active in online tracking system.'
      },
      {
        id: 'doc-s6',
        stepNumber: 6,
        phaseNumber: 3,
        phaseName: 'Phase 3: Tracked Custody & Status Alerting',
        title: 'Audit Issued Credential & Update Associated Accounts',
        shortSummary: 'Examine new credential within 24 hours for typographical errors and update dependent accounts.',
        description: 'Upon receipt, carefully audit spelling of name, birthdate, issue date, and gender marker. Update trusted traveler programs (TSA PreCheck, Global Entry), airline loyalty profiles, and banking accounts with new credential number.',
        prerequisiteStepIds: ['doc-s5'],
        requiredDocuments: [
          'Newly issued physical credential',
          'List of accounts requiring credential number updates'
        ],
        potentialBlockers: [
          'Government agency typographical error requiring prompt return within statutory window'
        ],
        nextAction: 'Perform side-by-side typographical audit and update airline/banking profiles.',
        timeEstimate: '1–2 hours',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Credential verified error-free and securely archived in fireproof vault.'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 6. GENERAL CUSTOM DECISION / ROADMAP
  // -------------------------------------------------------------------------
  'general-decision': {
    id: 'route-general-decision',
    category: 'general-decision',
    categoryLabel: 'Custom Execution Roadmap',
    title: 'Custom Sequential Action Roadmap',
    goal: 'Structure an executable, milestone-driven pathway with verifiable step-gates, prerequisite safeguards, and progress tracking.',
    desiredOutcome: 'Complete the objective in chronological order while actively monitoring dependencies and avoiding irreversible errors.',
    totalEstimatedDuration: '4 to 8 Weeks Phased Execution',
    sourceIntegrityNotice: 'This is a general heuristic action framework. Verify domain-specific technical, financial, and legal requirements with licensed advisors.',
    steps: [
      {
        id: 'gen-s1',
        stepNumber: 1,
        phaseNumber: 1,
        phaseName: 'Phase 1: Foundation & Boundary Invariants',
        title: 'Define Measurable Success Criteria & Stop-Loss Boundaries',
        shortSummary: 'Write down explicit boundaries, maximum risk tolerance, and kill-criteria.',
        description: 'Clarify what successful completion looks like in objective terms. Document explicit stop-loss parameters (maximum capital loss, time ceiling, or health boundaries) that will cause you to pause or abort.',
        prerequisiteStepIds: [],
        requiredDocuments: [
          'Written decision boundary statement',
          'Explicit stop-loss / kill-criteria document'
        ],
        potentialBlockers: [
          'Ambiguous, shifting goals that make progress impossible to evaluate'
        ],
        nextAction: 'Write down your 3 non-negotiable success boundaries and 1 stop-loss abort trigger.',
        timeEstimate: '1–2 days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Written boundaries signed and saved.'
      },
      {
        id: 'gen-s2',
        stepNumber: 2,
        phaseNumber: 1,
        phaseName: 'Phase 1: Foundation & Boundary Invariants',
        title: 'Inventory Missing Documentation & External Authorizations',
        shortSummary: 'Assemble all permits, contracts, records, and third-party approvals required.',
        description: 'Conduct a thorough inventory of every agreement, license, or resource needed. Identify which external parties have uncontrollable processing timelines so you can request them early.',
        prerequisiteStepIds: ['gen-s1'],
        requiredDocuments: [
          'Exhaustive checklist of required third-party sign-offs and forms'
        ],
        potentialBlockers: [
          'Discovering missing prerequisites midway through execution'
        ],
        nextAction: 'List all third-party dependencies and verify required lead times.',
        timeEstimate: '2–3 days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Complete documentation inventory assembled.'
      },
      {
        id: 'gen-s3',
        stepNumber: 3,
        phaseNumber: 2,
        phaseName: 'Phase 2: Execution & Quality Checkpoints',
        title: 'Execute Core Deliverables in Priority Order with Monitored Milestones',
        shortSummary: 'Carry out primary action items with mandatory midpoint verification checks.',
        description: 'Advance execution along the critical path. Do not take shortcuts on quality checks. Verify that actual spending and calendar time remain within +/- 15% of initial estimates.',
        prerequisiteStepIds: ['gen-s1', 'gen-s2'],
        requiredDocuments: [
          'Milestone progress log',
          'Midpoint budget and timeline variance audit'
        ],
        potentialBlockers: [
          'Scope creep expanding tasks beyond original boundaries'
        ],
        nextAction: 'Execute Step 1 of core deliverable and review results against initial boundaries.',
        timeEstimate: '2–3 weeks',
        costEstimate: 'Allocated project budget',
        isCompleted: false,
        verificationCheck: 'Midpoint deliverable inspected against pre-defined success criteria.'
      },
      {
        id: 'gen-s4',
        stepNumber: 4,
        phaseNumber: 2,
        phaseName: 'Phase 2: Execution & Quality Checkpoints',
        title: 'Conduct Stakeholder Synchronization & Progress Briefing',
        shortSummary: 'Align with partners, dependents, and counterparties before final lock-in.',
        description: 'Brief all affected participants on current trajectory, revised timelines, and next steps. Resolve friction points before final commitments become irreversible.',
        prerequisiteStepIds: ['gen-s3'],
        requiredDocuments: [
          'Summary progress update notes'
        ],
        potentialBlockers: [
          'Uncommunicated expectations leading to conflict at delivery'
        ],
        nextAction: 'Hold brief synchronization alignment meeting with key stakeholders.',
        timeEstimate: '1 day',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'Written alignment confirmation from all primary participants.'
      },
      {
        id: 'gen-s5',
        stepNumber: 5,
        phaseNumber: 3,
        phaseName: 'Phase 3: Final Verification & Permanent Archival',
        title: 'Perform Final Comprehensive Verification & Close Contracts',
        shortSummary: 'Inspect final outcome, settle balances, and archive documentation securely.',
        description: 'Perform exhaustive final quality inspection against original Phase 1 boundaries. Settle all financial obligations and store contracts, receipts, and proofs in a permanent repository.',
        prerequisiteStepIds: ['gen-s3', 'gen-s4'],
        requiredDocuments: [
          'Final completion receipt / sign-off document',
          'Permanent digital archive folder'
        ],
        potentialBlockers: [
          'Unresolved post-completion billing disputes or missing receipts'
        ],
        nextAction: 'Archive all receipts and contracts in permanent secure storage.',
        timeEstimate: '1–2 days',
        costEstimate: '$0',
        isCompleted: false,
        verificationCheck: 'All balances cleared and final archive completed.'
      }
    ]
  }
};
