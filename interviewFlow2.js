// ---------------------------------------------------------
// INTERVIEW FLOW CONTROLLER — MULTILINGUAL + VOICE MODE
// ---------------------------------------------------------

let currentStep = 0;
let interviewActive = false;
let lastBotMessage = "";
let responses = [];

// ---------------------------------------------------------
// GET CURRENT LANGUAGE BLOCK
// ---------------------------------------------------------
function getLang() {
  return translations[document.getElementById("languageSelect").value];
}

// ---------------------------------------------------------
// UPDATE PROGRESS BAR
// ---------------------------------------------------------
function updateProgress() {
  const lang = getLang();
  const total = lang.questions.length;
  const percent = Math.floor((currentStep / total) * 100);

  document.getElementById("progressBar").style.width = percent + "%";
}

// ---------------------------------------------------------
// BOT MESSAGE (WITH VOICE + AUTO-LISTEN)
// ---------------------------------------------------------
function botSay(text, isQuestion = false) {
  lastBotMessage = text;

  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "Sam: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Speak in selected language
  if (window.speak) {
    window.speak(text, () => {
      // Auto-listen ONLY for questions
      if (isQuestion && window.autoListenAfterQuestion) {
        window.autoListenAfterQuestion();
      }
    });
  }
}

// ---------------------------------------------------------
// USER MESSAGE
// ---------------------------------------------------------
function userSay(text) {
  const chatWindow = document.getElementById("chatWindow");
  const msg = document.createElement("div");
  msg.textContent = "You: " + text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ---------------------------------------------------------
// START INTERVIEW
// ---------------------------------------------------------
function startInterview() {
  interviewActive = true;
  currentStep = 0;
  responses = [];

  const lang = getLang();
  updateProgress();
  botSay(lang.questions[currentStep], true);
}

// ---------------------------------------------------------
// PAUSE
// ---------------------------------------------------------
function pauseInterview() {
  interviewActive = false;
  botSay(getLang().ui.pause);
}

// ---------------------------------------------------------
// FINISH
// ---------------------------------------------------------
function finishInterview() {
  interviewActive = false;

  const lang = getLang();
  botSay(lang.ui.finish);

  const summary = buildSummaryTranslated(responses, lang);

  // Summary should NOT trigger auto-listen
  botSay(summary, false);
}

// ---------------------------------------------------------
// REPEAT LAST BOT MESSAGE
// ---------------------------------------------------------
function repeatLast() {
  if (lastBotMessage) botSay(lastBotMessage);
}

// ---------------------------------------------------------
// SKIP STEP
// ---------------------------------------------------------
function skipStep() {
  if (!interviewActive) return;

  currentStep++;
  updateProgress();

  const lang = getLang();

  if (currentStep >= lang.questions.length) {
    finishInterview();
  } else {
    botSay(lang.questions[currentStep], true);
  }
}

// ---------------------------------------------------------
// RESET INTERVIEW
// ---------------------------------------------------------
function resetInterview() {
  interviewActive = false;
  currentStep = 0;
  responses = [];

  document.getElementById("chatWindow").innerHTML = "";

  updateProgress();
  botSay(getLang().ui.reset);
}

// ---------------------------------------------------------
// HANDLE USER RESPONSE
// ---------------------------------------------------------
window.handleUserResponse = function (text) {
  userSay(text);

  const lang = getLang();
  responses[currentStep] = text;

  if (interviewActive) {
    currentStep++;
    updateProgress();

    if (currentStep >= lang.questions.length) {
      finishInterview();
    } else {
      botSay(lang.questions[currentStep], true);
    }
  }
};

// ---------------------------------------------------------
// BUTTON EVENTS
// ---------------------------------------------------------
document.getElementById("startBtn").addEventListener("click", startInterview);
document.getElementById("pauseBtn").addEventListener("click", pauseInterview);
document.getElementById("finishBtn").addEventListener("click", finishInterview);
document.getElementById("repeatBtn").addEventListener("click", repeatLast);
document.getElementById("skipBtn").addEventListener("click", skipStep);
document.getElementById("resetBtn").addEventListener("click", resetInterview);

