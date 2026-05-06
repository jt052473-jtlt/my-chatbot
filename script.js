// script.js — Main Controller

import { startTour } from "./tour.js";
import { QUESTIONS, getQuestion } from "./interviewQuestions2.js";
import { buildSummary } from "./summaryBuilder2.js";

let currentQuestion = 0;
let responses = [];
let intakeActive = false;

function addMessage(sender, text) {
  const chat = document.getElementById("chatWindow");
  const bubble = document.createElement("div");
  bubble.className = sender === "bot" ? "bot-message" : "user-message";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("startDemoBtn").addEventListener("click", () => {
  document.getElementById("demoOverlay").style.display = "none";
  startTour();
});

document.getElementById("exitDemoBtn").addEventListener("click", () => window.location.reload());

document.getElementById("startBtn").addEventListener("click", () => {
  intakeActive = true;
  currentQuestion = 0;
  responses = [];
  addMessage("bot", "Starting the clinical intake...");
  askQuestion();
});

function askQuestion() {
  const q = getQuestion("en", currentQuestion);
  addMessage("bot", q);
  updateProgress();
}

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

function finishIntake() {
  intakeActive = false;
  addMessage("bot", "Thank you. Generating your summary...");
  const summaryHTML = buildSummary(responses, "en");
  addMessage("bot", "Summary:\n" + summaryHTML);
  updateProgress(true);
}

function updateProgress(done = false) {
  const bar = document.getElementById("progressBar");
  bar.style.width = done ? "100%" : ((currentQuestion / QUESTIONS.en.length) * 100) + "%";
}

document.getElementById("resetBtn").addEventListener("click", () => window.location.reload());
