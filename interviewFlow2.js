// interviewFlow2.js
// Controls question flow, language selection, and response storage

import { getQuestion, getTotalQuestions } from "./interviewQuestions2.js";

let currentQuestionIndex = 0;
let selectedLanguage = "en";
let responses = [];

// Called when user selects a language on the intro screen
function setLanguage(lang) {
    selectedLanguage = lang;
}

// Start the interview
function startInterview() {
    currentQuestionIndex = 0;
    responses = [];
    showQuestion();
}

// Display the current question
function showQuestion() {
    const questionText = getQuestion(selectedLanguage, currentQuestionIndex);
    document.getElementById("questionText").innerText = questionText;

    // Clear input field
    const input = document.getElementById("responseInput");
    input.value = "";
    input.focus();

    updateProgress();
}

// Save response and move to next question
function nextQuestion() {
    const input = document.getElementById("responseInput").value.trim();
    responses[currentQuestionIndex] = input;

    currentQuestionIndex++;

    if (currentQuestionIndex < getTotalQuestions(selectedLanguage)) {
        showQuestion();
    } else {
        showSummary();
    }
}

// Update progress bar and counter
function updateProgress() {
    const total = getTotalQuestions(selectedLanguage);
    const progress = ((currentQuestionIndex + 1) / total) * 100;

    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressCount").innerText =
        `${currentQuestionIndex + 1} / ${total}`;
}

// Build and display the final summary
function showSummary() {
    const summaryContainer = document.getElementById("summaryContent");
    summaryContainer.innerHTML = "";

    const total = getTotalQuestions(selectedLanguage);

    for (let i = 0; i < total; i++) {
        const q = getQuestion(selectedLanguage, i);
        const a = responses[i] || "";

        const block = document.createElement("div");
        block.className = "summary-block";

        block.innerHTML = `
            <h3>${q}</h3>
            <p>${a}</p>
        `;

        summaryContainer.appendChild(block);
    }

    document.getElementById("interviewSection").style.display = "none";
    document.getElementById("summarySection").style.display = "block";
}

export { setLanguage, startInterview, nextQuestion };
