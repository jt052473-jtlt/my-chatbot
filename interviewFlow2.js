let currentStep = 0;
let interviewActive = false;
let lastBotMessage = "";
let responses = [];

function botSay(text) {
  lastBotMessage = text;
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "Sam: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function userSay(text) {
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "You: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function startInterview() {
  interviewActive = true;
  currentStep = 0;
  responses = [];
  botSay(interviewQuestions[currentStep]);
}

function pauseInterview() {
  interviewActive = false;
  botSay("Okay, pausing for now.");
}

function finishInterview() {
  interviewActive = false;
  botSay("Thank you. The interview is now complete.");
  const summary = buildSummary(responses);
  botSay(summary);
}

function repeatLast() {
  if (lastBotMessage) botSay(lastBotMessage);
}

function skipStep() {
  if (!interviewActive) return;
  currentStep++;

  if (currentStep >= interviewQuestions.length) {
    finishInterview();
  } else {
    botSay(interviewQuestions[currentStep]);
  }
}

function resetInterview() {
  interviewActive = false;
  currentStep = 0;
  responses = [];
  document.getElementById("chatWindow").innerHTML = "";
  botSay("Interview reset. Press Start to begin again.");
}

document.getElementById("startBtn").addEventListener("click", startInterview);
document.getElementById("pauseBtn").addEventListener("click", pauseInterview);
document.getElementById("finishBtn").addEventListener("click", finishInterview);
document.getElementById("repeatBtn").addEventListener("click", repeatLast);
document.getElementById("skipBtn").addEventListener("click", skipStep);
document.getElementById("resetBtn").addEventListener
