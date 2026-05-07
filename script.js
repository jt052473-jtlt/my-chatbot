let currentStep = 0;
let isPaused = false;
let currentLanguage = 'en';

// --- RESTORED: Your Original Tour Logic ---
function startTour() {
    // These steps look for the IDs we put back in the HTML
    const steps = [
        { element: '#tour-step-1', intro: "Welcome! This helps automate clinical intake." },
        { element: '#tour-step-2', intro: "Switch between the top 10 languages here." },
        { element: '#tour-step-3', intro: "Voice mode enables the automated 3.5s listener." },
        { element: '#tour-step-4', intro: "The clinical conversation appears here." },
        { element: '#tour-step-5', intro: "Use these buttons to control the session." }
    ];
    // This calls your onboarding library (e.g., intro.js or custom overlay)
    if (typeof introJs === "function") {
        introJs().setOptions({ steps: steps }).start();
    }
}

// --- ADDED: Smart Feature Logic ---
function handleStart() {
    if (isPaused) {
        isPaused = false;
        addSystemMessage("Resuming interview..."); 
        displayQuestion(); 
    } else {
        // Triggers the tour only on the very first start
        if (currentStep === 0) startTour();
        currentStep = 0;
        displayQuestion();
    }
}

function resetApp() {
    // Clears screen WITHOUT typing "Reset"
    document.getElementById('chat-container').innerHTML = '';
    currentStep = 0;
    isPaused = false;
    if (typeof updateProgressBar === "function") updateProgressBar(0);
}
