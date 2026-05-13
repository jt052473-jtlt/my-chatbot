let interviewAnswers = {};

function processUserResponse(input) {
    interviewAnswers[`q${currentStep}`] = input;
    currentStep++;
    setTimeout(() => showQuestion(), 500);
}

function showQuestion() {
    const questions = translations[currentLanguage].questions;
    if (currentStep >= questions.length) {
        addBotMessage("Thank you. Intake complete.");
        return;
    }
    addBotMessage(questions[currentStep]);
}

function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "message bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    if (typeof speakText === "function") speakText(text);
}

function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "message user-message";
    div.textContent = text;
    chat.appendChild(div);
}
