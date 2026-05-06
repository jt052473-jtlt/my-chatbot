// script.js — Main Controller for YOUR Layout

import { startTour } from "./tour.js";
import { QUESTIONS, getQuestion } from "./interviewQuestions2.js";
import { buildSummary } from "./summaryBuilder2.js";

let currentQuestion = 0;
let responses = [];
let intakeActive = false;

// Utility: Add message to chat window
function addMessage(sender, text) {
  const chat = document.getElementById("chatWindow");
  const bubble = document.createElement("div");
  bubble.className = sender === "bot" ? "bot-message" : "user-message";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

// Start Demo Overlay
document.getElementById("startDemoBtn").addEventListener("click", () => {
  document.getElementById("demoOverlay").style.display = "none";
  startTour();
});

// Exit Demo
document.getElementById("exitDemoBtn").addEventListener("click", () => {
  window.location.reload();
});

// Start Intake
document.getElementById("startBtn").addEventListener("click", () => {
  intakeActive = true;
  currentQuestion = 0;
  responses = [];
  addMessage("bot", "Starting the clinical intake...");
  askQuestion();
});

// Ask Question
function askQuestion() {
  const q = getQuestion("en", currentQuestion);
  addMessage("bot", q);
  updateProgress();
}

// Handle Send
document.getElementById("sendBtn").addEventListener("click", () => {
  if (!intakeActive) return;

  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  responses[currentQuestion] = text;
  input.value = "";

  currentQuestion++;

  if (currentQuestion >= QUESTIONS.en.length) {
    finishIntake();
  } else {
    askQuestion();
  }
});

// Finish Intake
function finishIntake() {
  intakeActive = false;
  addMessage("bot", "Thank you. Generating your summary...");

  const summaryHTML = buildSummary(responses, "en");
  addMessage("bot", "Summary:\n" + summaryHTML);

  updateProgress(true);
}

// Progress Bar
function updateProgress(done = false) {
  const bar = document.getElementById("progressBar");
  if (done) {
    bar.style.width = "100%";
    return;
  }
  const pct = ((currentQuestion) / QUESTIONS.en.length) * 100;
  bar.style.width = pct + "%";
}

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
  window.location.reload();
});
