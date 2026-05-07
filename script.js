let currentStep = 0;
let isPaused = false;
let currentLanguage = 'en';

// Updates language state when dropdown changes
function updateLanguageState() {
    currentLanguage = document.getElementById('language-select').value;
    // Optional: add a message saying language changed
}

// Logic to handle both initial Start and Resuming from Pause
function handleStart() {
    if (isPaused) {
        isPaused = false;
        addSystemMessage("Resuming interview..."); 
        displayQuestion(); 
    } else {
        currentStep = 0;
        startInterview();
    }
}

function togglePause() {
    isPaused = true;
    addSystemMessage("Interview paused.");
}

// Clears the screen and resets the progress
function resetApp() {
    document.getElementById('chat-container').innerHTML = '';
    currentStep = 0;
    isPaused = false;
    if (typeof updateProgressBar === "function") updateProgressBar(0);
}

// Fetches the question based on the selected language
function displayQuestion() {
    if (isPaused) return;

    // Pulls from the language-specific array in interviewQuestions2.js
    const questionText = interviewQuestions[currentLanguage][currentStep];
    
    addSystemMessage(questionText);
    
    if (typeof speakText === "function") {
        speakText(questionText);
    }
}
