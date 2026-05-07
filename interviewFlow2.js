// ---------------------------------------------
// INTERVIEW FLOW LOGIC
// Uses global variables from script.js:
// currentStep, currentLanguage, isPaused
// ---------------------------------------------

// ---------------------------------------------
// GET QUESTIONS FOR CURRENT LANGUAGE
// ---------------------------------------------
function getQuestionsForLanguage() {
    if (!translations[currentLanguage] || !translations[currentLanguage].questions) {
        console.warn("No questions found for language:", currentLanguage);
        return [];
    }
    return translations[currentLanguage].questions;
}

// ---------------------------------------------
// RENDER USER MESSAGE
// ---------------------------------------------
function addUserMessage(text) {
    const chatWindow = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "chat-message user-message";
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ---------------------------------------------
// RENDER BOT MESSAGE
// ---------------------------------------------
function addBotMessage(text) {
    const chatWindow = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "chat-message bot-message";
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    handleReadAloud(text);
}

// ---------------------------------------------
// READ ALOUD SUPPORT
// ---------------------------------------------
function handleReadAloud(text) {
    const toggle = document.getElementById("readAloudToggle");
    if (!toggle || !toggle.checked) return;

    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const langConfig = translations[currentLanguage];
    if (langConfig && langConfig.voiceCode) {
        utterance.lang = langConfig.voiceCode;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// ---------------------------------------------
// PROGRESS BAR
// ---------------------------------------------
function updateProgressBar() {
    const questions = getQuestionsForLanguage();
    const progressBar = document.getElementById("progressBar");

    if (!progressBar || questions.length === 0) return;

    const percent = Math.min(
        100,
        Math.round((currentStep / questions.length) * 100)
    );

    progressBar.style.width = percent + "%";
}

// ---------------------------------------------
// SHOW QUESTION
// ---------------------------------------------
function showQuestion() {
    if (isPaused) return;

    const questions = getQuestionsForLanguage();

    if (currentStep >= questions.length) {
        addBotMessage("Thank you. We've reached the end of the interview.");
        updateProgressBar();

        try {
            buildSummary();
        } catch (e) {
            console.warn("Summary builder not available:", e);
        }

        return;
    }

    const q = questions[currentStep];
    addBotMessage(q.text);
    updateProgressBar();
}

// ---------------------------------------------
// PROCESS USER RESPONSE
// ---------------------------------------------
function processUserResponse(input) {
    const questions = getQuestionsForLanguage();

    if (currentStep >= questions.length) {
        addBotMessage("We've already completed the interview.");
        return;
    }

    const q = questions[currentStep];

    // Store answers globally
    if (!window.interviewAnswers) {
        window.interviewAnswers = {};
    }

    window.interviewAnswers[q.id || currentStep] = input;

    currentStep++;
    showQuestion();
}
