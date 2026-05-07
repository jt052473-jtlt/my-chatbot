let currentStep = 0;
let isPaused = false;
let currentLanguage = 'en';

// --- Guided Tour Logic ---
function startTour() {
    const tourSteps = [
        { element: '#tour-step-1', msg: "Welcome! This helps automate clinical documentation." },
        { element: '#tour-step-2', msg: "You can change languages here at any time." },
        { element: '#tour-step-3', msg: "Voice Mode enables the automated 3.5s listener." },
        { element: '#tour-step-4', msg: "The conversation will appear in this window." },
        { element: '#tour-step-5', msg: "Use these controls to manage the flow." }
    ];
    if (typeof runOnboardingSequence === "function") {
        runOnboardingSequence(tourSteps);
    }
}

// --- Combined Flow Logic ---
function handleStart() {
    if (isPaused) {
        isPaused = false;
        addSystemMessage("Resuming intake..."); 
        displayQuestion(); 
    } else {
        if (currentStep === 0) startTour(); // Triggers tour on first start
        currentStep = 0;
        displayQuestion();
    }
}

function resetApp() {
    document.getElementById('chat-container').innerHTML = '';
    currentStep = 0;
    isPaused = false;
    if (typeof updateProgressBar === "function") updateProgressBar(0);
}

function updateLanguageState() {
    currentLanguage = document.getElementById('language-select').value;
}

function displayQuestion() {
    if (isPaused) return;
    try {
        const questionText = interviewQuestions[currentLanguage][currentStep];
        addSystemMessage(questionText);
    } catch (e) { console.error(e); }
}

function addSystemMessage(text) {
    const container = document.getElementById('chat-container');
    const msg = document.createElement('div');
    msg.className = 'message system';
    msg.innerText = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}
