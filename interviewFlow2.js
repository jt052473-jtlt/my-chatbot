/* ------------------------------------------------------ 
   INTERVIEW FLOW LOGIC 
------------------------------------------------------ */
let interviewAnswers = {};

function processUserResponse(input) {
    if (isPaused) return;

    // Save the answer to our collection
    interviewAnswers[`step_${currentStep}`] = input;

    // Move to the next question
    currentStep++;

    // Wait a moment so the user can see their message, then show next bot prompt
    setTimeout(() => {
        showQuestion();
    }, 600);
}

function showQuestion() {
    // Get questions from translations.js
    if (typeof translations === 'undefined') return;
    const questions = translations[currentLanguage].questions;

    // If we run out of questions, show completion
    if (currentStep >= questions.length) {
        addBotMessage("Thank you. Your intake is complete.");
        return;
    }

    // Show the current question
    addBotMessage(questions[currentStep]);
}

function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "message bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;

    // Read aloud if enabled
    if (typeof speakText === "function") speakText(text);
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "message user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}
