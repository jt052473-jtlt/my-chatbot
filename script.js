let currentStep = 0;
let isPaused = false;
let currentLanguage = 'en';

function updateLanguageState() {
    currentLanguage = document.getElementById('language-select').value;
}

function handleStart() {
    if (isPaused) {
        isPaused = false;
        addSystemMessage("Resuming interview..."); 
        displayQuestion(); 
    } else {
        currentStep = 0;
        isPaused = false;
        displayQuestion();
    }
}

function togglePause() {
    isPaused = true;
    addSystemMessage("Interview paused.");
}

function resetApp() {
    document.getElementById('chat-container').innerHTML = '';
    currentStep = 0;
    isPaused = false;
    if (typeof updateProgressBar === "function") updateProgressBar(0);
}

function displayQuestion() {
    if (isPaused) return;
    try {
        const questionText = interviewQuestions[currentLanguage][currentStep];
        addSystemMessage(questionText);
        if (typeof speakText === "function") speakText(questionText);
    } catch (e) {
        console.error("Question load error:", e);
    }
}

// Helper for adding messages (ensure this matches your UI classes)
function addSystemMessage(text) {
    const container = document.getElementById('chat-container');
    const msg = document.createElement('div');
    msg.className = 'message system';
    msg.innerText = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}
