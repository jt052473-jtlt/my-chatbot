let currentStep = 0;
let isPaused = false;
let currentLanguage = 'en';

// Fixes the "Sam: Reset" bubble issue by clearing the window properly
function resetApp() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) chatContainer.innerHTML = ''; 
    currentStep = 0;
    isPaused = false;
    if (typeof updateProgressBar === "function") updateProgressBar(0);
}

function handleStart() {
    if (isPaused) {
        isPaused = false;
        addSystemMessage("Resuming..."); 
        displayQuestion(); 
    } else {
        // This triggers your 7-step guided tour logic
        if (currentStep === 0 && typeof startTour === "function") startTour();
        currentStep = 0;
        displayQuestion();
    }
}

// ... include your existing displayQuestion and speakText functions here ...
