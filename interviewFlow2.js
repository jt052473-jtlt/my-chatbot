/* ------------------------------------------------------ 
   INTERVIEW FLOW LOGIC — FIXED
------------------------------------------------------ */
let interviewAnswers = {};

// This function processes what the user typed or said
function processUserResponse(input) {
    if (!input || isPaused) return;

    // 1. Store the answer based on the current step
    // Using a simple switch to map answers to labels
    switch (currentStep) {
        case 0: interviewAnswers.name = input; break;
        case 1: interviewAnswers.dob = input; break;
        case 2: interviewAnswers.reason = input; break;
        case 3: interviewAnswers.duration = input; break;
        case 4: interviewAnswers.allergies = input; break;
    }

    // 2. Increment the step to the next question
    currentStep++;

    // 3. Show the next question or the summary
    // We add a small delay so the user can see their own message in the chat first
    setTimeout(() => {
        showQuestion();
    }, 500);
}

// This function displays the current question
function showQuestion() {
    const questions = translations[currentLanguage].questions;
    const chatWindow = document.getElementById("chatWindow");

    // If we've reached the end of the questions, show the summary
    if (currentStep >= questions.length) {
        if (typeof buildSummary === "function") {
            const summaryText = buildSummary(interviewAnswers);
            addBotMessage(summaryText);
        }
        return;
    }

    // Display the next question
    const nextQuestion = questions[currentStep];
    addBotMessage(nextQuestion);

    // Update the progress bar
    if (typeof updateProgressBar === "function") {
        updateProgressBar();
    }
}

// Helper to add a bot message to the UI
function addBotMessage(text) {
    const chatWindow = document.getElementById("chatWindow");
    const msgDiv = document.createElement("div");
    msgDiv.className = "message bot-message";
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Trigger voice if Read Aloud is on
    if (typeof speakText === "function") {
        speakText(text);
    }
}

// Helper to add a user message to the UI
function addUserMessage(text) {
    const chatWindow = document.getElementById("chatWindow");
    const msgDiv = document.createElement("div");
    msgDiv.className = "message user-message";
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
