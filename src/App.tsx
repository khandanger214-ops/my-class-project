import React, { useState, useRef } from 'react';
import { ModuleMode } from './types';
import { WorkflowStage, SharedDecisionContext } from './types/sharedContext';
import { RouteData, LifeLensHandoffContext } from './types/route';
import { Navbar } from './components/Navbar';
import { WorkflowIndicator } from './components/common/WorkflowIndicator';
import { Hero } from './components/Hero';
import { ForesightScanSection } from './components/ForesightScanSection';
import { ModulesSection } from './components/ModulesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TrustGovernanceSection } from './components/TrustGovernanceSection';
import { LifeLensWorkspace } from './components/lifelens/LifeLensWorkspace';
import { RouteHandoffReviewScreen } from './components/liferoute/RouteHandoffReviewScreen';
import { LifeRouteWorkspace } from './components/liferoute/LifeRouteWorkspace';
import { PresentationDemoBanner } from './components/governance/PresentationDemoBanner';
import { PRESENTATION_DEMO_SCENARIOS, PresentationDemoScenario } from './engine/governanceVerifier';
import { generateRouteForScenario } from './engine/routeGenerator';
import { analyzeScenario } from './engine/analyzer';
import { validateScenarioInput } from './engine/classifier';
import { Footer } from './components/Footer';

export default function App() {
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>('understand');
  const [scenarioText, setScenarioText] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Presentation Mode / Demo state
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null);

  // In-session persistent state (preserved during normal navigation, reset on page refresh or explicit reset)
  const [sessionDecisionContext, setSessionDecisionContext] = useState<SharedDecisionContext | null>(null);
  const [sessionRouteData, setSessionRouteData] = useState<RouteData | null>(null);

  const scenarioInputRef = useRef<HTMLTextAreaElement | null>(null);

  // Map workflow stage to Navbar mode
  const currentNavMode: ModuleMode = 
    workflowStage === 'understand' ? 'home' :
    workflowStage === 'decide' ? 'lifelens' : 'liferoute';

  const handleFocusInput = () => {
    if (workflowStage !== 'understand') {
      setWorkflowStage('understand');
    }
    setTimeout(() => {
      if (scenarioInputRef.current) {
        scenarioInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        scenarioInputRef.current.focus();
      }
    }, 100);
  };

  // Explicit full reset to begin a fresh scenario without contamination
  const handleResetAndStartNew = () => {
    setActiveDemoId(null);
    setScenarioText('');
    setValidationError(null);
    setSessionDecisionContext(null);
    setSessionRouteData(null);
    setWorkflowStage('understand');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (scenarioInputRef.current) {
        scenarioInputRef.current.focus();
      }
    }, 100);
  };

  // Presentation Mode: "Explore a demo"
  const handleExploreDemo = (demoScenario?: PresentationDemoScenario) => {
    const selectedDemo = demoScenario || PRESENTATION_DEMO_SCENARIOS[0];
    setActiveDemoId(selectedDemo.id);
    setScenarioText(selectedDemo.scenarioStatement);
    setValidationError(null);

    const demoAnalysis = analyzeScenario(
      selectedDemo.scenarioStatement,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    );
    const demoContext: SharedDecisionContext = {
      scenarioStatement: selectedDemo.scenarioStatement,
      scenarioSourceType: 'bundled-demo',
      category: demoAnalysis.category,
      categoryLabel: demoAnalysis.categoryLabel,
      userGoal: demoAnalysis.editableGoal,
      goalSourceType: 'bundled-demo',
      selectedOption: demoAnalysis.options[0] || null,
      constraints: demoAnalysis.constraints,
      priorities: demoAnalysis.priorities,
      verificationTasks: demoAnalysis.verificationTasks,
      completedVerificationTaskIds: [],
      resolvedFindingIds: [],
      stakeholders: demoAnalysis.optionalStakeholders,
      includeStakeholders: demoAnalysis.optionalStakeholders.some(s => s.isIncluded),
      flaggedAssumptions: [],
      userDecisionStance: 'investigating',
      isPresentationDemo: true,
      demoScenarioId: selectedDemo.id,
      timestamp: Date.now()
    };
    setSessionDecisionContext(demoContext);
    setSessionRouteData(null);
    setWorkflowStage('decide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitDemo = () => {
    handleResetAndStartNew();
  };

  // 1. User starts from Hero: "Analyze a decision" (LifeLens)
  const handleAnalyzeDecision = () => {
    const validation = validateScenarioInput(scenarioText);
    if (!validation.isValid) {
      setValidationError(validation.error || "Please describe a decision or dilemma to analyze.");
      if (scenarioInputRef.current) {
        scenarioInputRef.current.focus();
      }
      return;
    }
    setValidationError(null);

    const trimmed = scenarioText.trim();
    // Prevent stale contamination if the scenario statement has changed
    if (sessionDecisionContext && sessionDecisionContext.scenarioStatement.trim() !== trimmed) {
      setSessionDecisionContext(null);
      setSessionRouteData(null);
    }

    setWorkflowStage('decide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. User starts from Hero: "Build my route"
  const handleBuildRouteFromHero = () => {
    const validation = validateScenarioInput(scenarioText);
    if (!validation.isValid) {
      setValidationError(validation.error || "Please describe a process or goal to build an action route.");
      if (scenarioInputRef.current) {
        scenarioInputRef.current.focus();
      }
      return;
    }
    setValidationError(null);

    const trimmed = scenarioText.trim();
    const isDemo = Boolean(activeDemoId);
    const sourceType = isDemo ? 'bundled-demo' : 'user-supplied';

    // If user already analyzed this exact scenario in LifeLens, reuse their context
    if (sessionDecisionContext && sessionDecisionContext.scenarioStatement.trim() === trimmed) {
      setWorkflowStage('plan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const initialAnalysis = analyzeScenario(
      trimmed,
      undefined,
      undefined,
      undefined,
      undefined,
      isDemo
    );
    const initialContext: SharedDecisionContext = {
      scenarioStatement: trimmed,
      scenarioSourceType: sourceType,
      category: initialAnalysis.category,
      categoryLabel: initialAnalysis.categoryLabel,
      userGoal: initialAnalysis.editableGoal,
      goalSourceType: isDemo ? 'bundled-demo' : 'rule-engine',
      selectedOption: initialAnalysis.options[0] || null,
      constraints: initialAnalysis.constraints,
      priorities: initialAnalysis.priorities,
      verificationTasks: initialAnalysis.verificationTasks,
      completedVerificationTaskIds: [],
      resolvedFindingIds: [],
      stakeholders: initialAnalysis.optionalStakeholders,
      includeStakeholders: initialAnalysis.optionalStakeholders.some(s => s.isIncluded),
      flaggedAssumptions: [],
      userDecisionStance: 'investigating',
      isPresentationDemo: isDemo,
      demoScenarioId: activeDemoId || undefined,
      timestamp: Date.now()
    };
    setSessionDecisionContext(initialContext);
    setSessionRouteData(null);
    setWorkflowStage('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation from Navbar or Module cards
  const handleSelectModuleFromNavOrCard = (mode: ModuleMode) => {
    setValidationError(null);

    if (mode === 'home') {
      setWorkflowStage('understand');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const validation = validateScenarioInput(scenarioText);
    let targetScenario = scenarioText.trim();
    if (!validation.isValid) {
      targetScenario = mode === 'lifelens'
        ? "I'm considering buying a used car."
        : "I want to renew an official document.";
      setScenarioText(targetScenario);
    }

    if (sessionDecisionContext && sessionDecisionContext.scenarioStatement.trim() !== targetScenario) {
      setSessionDecisionContext(null);
    }
    if (sessionRouteData && sessionRouteData.scenarioStatement?.trim() !== targetScenario) {
      setSessionRouteData(null);
    }

    if (mode === 'lifelens') {
      setWorkflowStage('decide');
    } else if (mode === 'liferoute') {
      setWorkflowStage('act');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setValidationError(null);
    setWorkflowStage('understand');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryScenarioPrompt = (promptText: string) => {
    setActiveDemoId(null);
    setScenarioText(promptText);
    setValidationError(null);
    if (sessionDecisionContext && sessionDecisionContext.scenarioStatement.trim() !== promptText.trim()) {
      setSessionDecisionContext(null);
      setSessionRouteData(null);
    }
    if (workflowStage !== 'understand') {
      setWorkflowStage('understand');
    }
    setTimeout(() => {
      if (scenarioInputRef.current) {
        scenarioInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        scenarioInputRef.current.focus();
      }
    }, 100);
  };

  // 3. User clicks "Build my route" inside LifeLensWorkspace
  const handleHandoffFromLifeLens = (context: SharedDecisionContext) => {
    setScenarioText(context.scenarioStatement);
    setSessionDecisionContext(context);
    setWorkflowStage('plan'); // Moves to Review Screen with transition animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. User confirms transferred details on RouteHandoffReviewScreen
  const handleConfirmHandoffToRoute = (confirmedContext: SharedDecisionContext) => {
    setScenarioText(confirmedContext.scenarioStatement);
    setSessionDecisionContext(confirmedContext);

    // Convert into LifeLensHandoffContext preserving all governance & accountability fields
    const handoff: LifeLensHandoffContext = {
      scenarioTitle: confirmedContext.scenarioStatement,
      scenarioSourceType: confirmedContext.scenarioSourceType,
      userGoal: confirmedContext.userGoal,
      goalSourceType: confirmedContext.goalSourceType,
      selectedOptionName: confirmedContext.selectedOption?.name,
      constraints: confirmedContext.constraints.map(c => ({
        label: c.label,
        value: c.value,
        sourceType: c.sourceType
      })),
      priorities: confirmedContext.priorities.filter(p => p.selected).map(p => p.label),
      stakeholders: confirmedContext.stakeholders,
      flaggedAssumptions: confirmedContext.flaggedAssumptions,
      userDecisionStance: confirmedContext.userDecisionStance,
      userDecisionNote: confirmedContext.userNotes,
      fromLifeLens: true
    };

    // Generate new route for the confirmed decision context
    const newRoute = generateRouteForScenario(confirmedContext.scenarioStatement, handoff);
    setSessionRouteData(newRoute);

    // Move to ACT stage (LifeRouteWorkspace)
    setWorkflowStage('act');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Workflow Stage Navigation (from the indicator)
  const handleStageNavigation = (targetStage: WorkflowStage) => {
    setValidationError(null);
    const validInput = validateScenarioInput(scenarioText).isValid;
    const effectiveScenario = validInput
      ? scenarioText.trim()
      : sessionDecisionContext?.scenarioStatement || "I'm considering buying a used car.";

    if (!validInput && targetStage !== 'understand') {
      setScenarioText(effectiveScenario);
    }

    if (targetStage === 'understand') {
      setWorkflowStage('understand');
    } else if (targetStage === 'decide') {
      if (sessionDecisionContext && sessionDecisionContext.scenarioStatement.trim() !== effectiveScenario) {
        setSessionDecisionContext(null);
      }
      setWorkflowStage('decide');
    } else if (targetStage === 'plan') {
      if (sessionDecisionContext && sessionDecisionContext.scenarioStatement.trim() === effectiveScenario) {
        setWorkflowStage('plan');
      } else {
        const isDemo = Boolean(activeDemoId);
        const sourceType = isDemo ? 'bundled-demo' : 'user-supplied';
        const analysis = analyzeScenario(
          effectiveScenario,
          undefined,
          undefined,
          undefined,
          undefined,
          isDemo
        );
        setSessionDecisionContext({
          scenarioStatement: effectiveScenario,
          scenarioSourceType: sourceType,
          category: analysis.category,
          categoryLabel: analysis.categoryLabel,
          userGoal: analysis.editableGoal,
          goalSourceType: isDemo ? 'bundled-demo' : 'rule-engine',
          selectedOption: analysis.options[0] || null,
          constraints: analysis.constraints,
          priorities: analysis.priorities,
          verificationTasks: analysis.verificationTasks,
          completedVerificationTaskIds: [],
          resolvedFindingIds: [],
          stakeholders: analysis.optionalStakeholders,
          includeStakeholders: analysis.optionalStakeholders.some(s => s.isIncluded),
          flaggedAssumptions: [],
          userDecisionStance: 'investigating',
          isPresentationDemo: isDemo,
          demoScenarioId: activeDemoId || undefined,
          timestamp: Date.now()
        });
        setWorkflowStage('plan');
      }
    } else if (targetStage === 'act') {
      if (sessionRouteData && sessionRouteData.scenarioStatement?.trim() !== effectiveScenario) {
        setSessionRouteData(null);
      }
      setWorkflowStage('act');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-violet-200 selection:text-violet-900 font-sans antialiased">
      {/* Premium Top Navigation */}
      <Navbar
        currentMode={currentNavMode}
        onNavigateHome={handleReturnHome}
        onSelectModule={handleSelectModuleFromNavOrCard}
        onFocusInput={handleFocusInput}
        onExploreDemo={() => handleExploreDemo()}
        isDemoActive={Boolean(activeDemoId)}
      />

      {/* Presentation Mode Banner when Demo is Active */}
      <PresentationDemoBanner
        activeDemoId={activeDemoId}
        onSelectDemo={(demo) => handleExploreDemo(demo)}
        onExitDemo={handleExitDemo}
      />

      {/* Integrated Workflow Progression Indicator */}
      <WorkflowIndicator
        currentStage={workflowStage}
        onNavigateStage={handleStageNavigation}
        canNavigate={true}
      />

      <main className="flex-1">
        {/* STAGE 1: UNDERSTAND (Home / Scenario Input) */}
        {workflowStage === 'understand' && (
          <>
            <Hero
              scenarioText={scenarioText}
              setScenarioText={(text) => {
                setScenarioText(text);
                if (activeDemoId) setActiveDemoId(null);
              }}
              onAnalyzeDecision={handleAnalyzeDecision}
              onBuildRoute={handleBuildRouteFromHero}
              onExploreDemo={() => handleExploreDemo()}
              validationError={validationError}
              setValidationError={setValidationError}
              inputRef={scenarioInputRef}
            />

            <ForesightScanSection
              onTryScenarioPrompt={handleTryScenarioPrompt}
            />

            <ModulesSection
              onSelectModule={handleSelectModuleFromNavOrCard}
              scenarioText={scenarioText}
            />

            <HowItWorksSection />

            <TrustGovernanceSection />
          </>
        )}

        {/* STAGE 2: DECIDE (LifeLens Decision Workspace) */}
        {workflowStage === 'decide' && (
          <LifeLensWorkspace
            initialScenarioText={scenarioText || "I'm considering buying a used car."}
            initialDecisionContext={sessionDecisionContext}
            onUpdateDecisionContext={(updated) => {
              setScenarioText(updated.scenarioStatement);
              setSessionDecisionContext(updated);
            }}
            onReturnHome={handleReturnHome}
            onResetScenario={handleResetAndStartNew}
            onTransferToLifeRoute={handleHandoffFromLifeLens}
          />
        )}

        {/* STAGE 3: PLAN (Handoff Transition & Review Screen) */}
        {workflowStage === 'plan' && (
          <RouteHandoffReviewScreen
            decisionContext={sessionDecisionContext || {
              scenarioStatement: scenarioText || "I'm considering buying a used car.",
              scenarioSourceType: activeDemoId ? 'bundled-demo' : 'user-supplied',
              category: 'used-car',
              categoryLabel: 'Used-Car Purchase',
              userGoal: 'Acquire reliable personal transportation at a fair price.',
              selectedOption: null,
              constraints: [],
              priorities: [],
              completedVerificationTaskIds: [],
              resolvedFindingIds: [],
              timestamp: Date.now()
            }}
            onConfirmAndGenerate={handleConfirmHandoffToRoute}
            onBackToLifeLens={() => {
              setWorkflowStage('decide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* STAGE 4: ACT (LifeRoute Action Execution Workspace) */}
        {workflowStage === 'act' && (
          <LifeRouteWorkspace
            initialScenarioText={scenarioText || "I want to renew an official document."}
            existingRouteData={sessionRouteData}
            onUpdateRouteData={(updated) => {
              if (updated.scenarioStatement) {
                setScenarioText(updated.scenarioStatement);
              }
              setSessionRouteData(updated);
            }}
            onReturnHome={handleReturnHome}
            onResetScenario={handleResetAndStartNew}
            onSwitchToLifeLens={() => {
              if (sessionRouteData?.scenarioStatement) {
                setScenarioText(sessionRouteData.scenarioStatement);
              }
              setWorkflowStage('decide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Site Footer */}
      <Footer
        onNavigateHome={handleReturnHome}
        onSelectModule={handleSelectModuleFromNavOrCard}
      />
    </div>
  );
}

