// --- State & Tour Logic ---
let currentStep = 0;
let isPaused = false;
let currentLanguage = 'en';

function startTour() {
    const tourSteps = [
        { element: '#tour-step-1', msg: "Welcome! This assistant helps automate patient documentation." },
        { element: '#tour-step-2', msg: "Select from the top 10 languages here." },
        { element: '#tour-step-3', msg: "Voice Mode enables the 3.5s Auto-Listen feature." },
        { element: '#tour-step-4', msg: "Your clinical conversation will appear here." },
        { element: '#tour-step-5', msg: "Use these to Start, Pause, or Reset the intake." }
    ];
    // This triggers your onboarding overlay sequence
    runOnboardingSequence(tourSteps); 
}

// --- Combined Start Logic ---
function handleStart() {
    if (isPaused) {
        isPaused = false;
        addSystemMessage("Resuming clinical intake..."); 
        displayQuestion(); 
    } else {
        // Only run tour if it's the very first start
        if (currentStep === 0) startTour();
        currentStep = 0;
        displayQuestion();
    }
}

// --- Reset & Language Logic ---
function resetApp() {
    document.getElementById('chat-container').innerHTML = '';
    currentStep = 0;
    isPaused = false;
    updateProgressBar(0);
}

function updateLanguageState() {
    currentLanguage = document.getElementById('language-select').value;
}
