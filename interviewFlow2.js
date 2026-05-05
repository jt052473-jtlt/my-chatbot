// ---------------------------------------------------------
// INTERVIEW FLOW CONTROLLER — MULTILINGUAL VERSION
// ---------------------------------------------------------

let currentStep = 0;
let interviewActive = false;
let lastBotMessage = "";
let responses = [];

// Get current language block
function getLang() {
  return translations[document.getElementById("languageSelect").value];
}

// BOT MESSAGE (with voice)
function botSay(text) {
  lastBotMessage = text;

  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "Sam: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Speak in selected language
  if (window.speak) {
    window.speak(text);
  }
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

  const lang = getLang();
  botSay(lang.questions[currentStep]);
}

// PAUSE
function pauseInterview() {
  interviewActive = false;
  botSay(getLang().ui.pause);
}

// FINISH
function finishInterview() {
  interviewActive = false;

  const lang = getLang();
  botSay(lang.ui.finish);

  const summary = buildSummaryTranslated(responses, lang);
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

  const lang = getLang();

  if (currentStep >= lang.questions.length) {
    finishInterview();
  } else {
    botSay(lang.questions[currentStep]);
  }
}

// RESET INTERVIEW
function resetInterview() {
  interviewActive = false;
  currentStep = 0;
  responses = [];

  document.getElementById("chatWindow").innerHTML = "";

  botSay(getLang().ui.reset);
}

// HANDLE USER RESPONSE
window.handleUserResponse = function (text) {
  userSay(text);

  const lang = getLang();

  responses[currentStep] = text;

  if (interviewActive) {
    currentStep++;

    if (currentStep >= lang.questions.length) {
      finishInterview();
    } else {
      botSay(lang.questions[currentStep]);
    }
  }
};

// BUTTON EVENTS
document.getElementById("startBtn").addEventListener("click", startInterview);
document.getElementById("pauseBtn").addEventListener("click", pauseInterview);
document.getElementById("finishBtn").addEventListener("click", finishInterview);
document.getElementById("repeatBtn").addEventListener("click", repeatLast);
document.getElementById("skipBtn").addEventListener("click", skipStep);
document.getElementById("resetBtn").addEventListener("click", resetInterview);
