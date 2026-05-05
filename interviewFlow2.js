// --------------------------------------
// INTERVIEW FLOW CONTROLLER
// --------------------------------------

let currentStep = 0;
let interviewActive = false;
let lastBotMessage = "";
let responses = [];

// BOT MESSAGE
function botSay(text) {
  lastBotMessage = text;
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "Sam: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// USER MESSAGE
function userSay(text) {
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "You: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// START INTERVIEW
function startInterview() {
  interviewActive = true;
  currentStep = 0;
  responses = [];
  botSay(interviewQuestions[currentStep]);
}

// PAUSE
function pauseInterview() {
  interviewActive = false;
  botSay("Okay, pausing for now.");
}

// FINISH
function finishInterview() {
  interviewActive = false;
  botSay("Thank you. The interview is now complete.");

  const summary = buildSummary(responses);
  botSay(summary);
}

// REPEAT LAST BOT MESSAGE
function repeatLast() {
  if (lastBotMessage) botSay(lastBotMessage);
}

// SKIP STEP
function skipStep() {
  if (!interviewActive) return;

  currentStep++;

  if (currentStep >= interviewQuestions.length) {
    finishInterview();
  } else {
    botSay(interviewQuestions[currentStep]);
  }
}

// RESET INTERVIEW
function resetInterview() {
  interviewActive = false;
  currentStep = 0;
  responses = [];
  document.getElementById("chatWindow").innerHTML = "";
  botSay("Interview reset. Press Start to begin again.");
}

// BUTTON EVENTS
document.getElementById("startBtn").addEventListener("click", startInterview);
document.getElementById("pauseBtn").addEventListener("click", pauseInterview);
document.getElementById("finishBtn").addEventListener("click", finishInterview);
document.getElementById("repeatBtn").addEventListener("click", repeatLast);
document.getElementById("skipBtn").addEventListener("click", skipStep);
document.getElementById("resetBtn").addEventListener("click", resetInterview);

// SEND BUTTON HANDLER
document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  userSay(text);
  responses[currentStep] = text;
  input.value = "";

  if (interviewActive) {
    currentStep++;

    if (currentStep >= interviewQuestions.length) {
      finishInterview();
    } else {
      botSay(interviewQuestions[currentStep]);
    }
  }
});
