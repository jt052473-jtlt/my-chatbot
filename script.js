// ---------------------------------------------------------
// SCRIPT.JS — FULL VOICE MODE + MULTILINGUAL + TOUR
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------------------------
  // ELEMENT REFERENCES
  // -------------------------------------------------------
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const languageSelect = document.getElementById("languageSelect");
  const languageSearch = document.getElementById("languageSearch");
  const readAloudToggle = document.getElementById("readAloudToggle");
  const voiceModeToggle = document.getElementById("voiceModeToggle");
  const micBtn = document.getElementById("micBtn");

  const demoOverlay = document.getElementById("demoOverlay");
  const startDemoBtn = document.getElementById("startDemoBtn");
  const exitDemoBtn = document.getElementById("exitDemoBtn");

  const tourOverlay = document.getElementById("tourOverlay");
  const tourTooltip = document.getElementById("tourTooltip");
  const tourNextBtn = document.getElementById("tourNextBtn");
  const tourExitBtn = document.getElementById("tourExitBtn");
  const tourTitle = document.getElementById("tourTitle");
  const tourText = document.getElementById("tourText");

  // -------------------------------------------------------
  // TOP 10 LANGUAGES
  // -------------------------------------------------------
  const top10 = [
    "English","Spanish","Chinese","Tagalog","Vietnamese",
    "Arabic","French","Korean","Russian","German"
  ];

  top10.forEach(lang => {
    const opt = document.createElement("option");
    opt.value = lang;
    opt.textContent = lang;
    languageSelect.appendChild(opt);
  });

  languageSelect.value = "English";

  // -------------------------------------------------------
  // APPLY LANGUAGE TO UI
  // -------------------------------------------------------
  function applyLanguage(lang) {
    const t = translations[lang];

    document.querySelector(".app-header h2").textContent = t.ui.appTitle;

    document.getElementById("startBtn").textContent = t.ui.start;
    document.getElementById("pauseBtn").textContent = t.ui.pause;
    document.getElementById("finishBtn").textContent = t.ui.finish;
    document.getElementById("repeatBtn").textContent = t.ui.repeat;
    document.getElementById("skipBtn").textContent = t.ui.skip;
    document.getElementById("resetBtn").textContent = t.ui.reset;
    sendBtn.textContent = t.ui.send;
    userInput.placeholder = t.ui.typeHere;
  }

  applyLanguage("English");

  languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
  });

  // -------------------------------------------------------
  // LANGUAGE SEARCH
  // -------------------------------------------------------
  languageSearch.addEventListener("input", () => {
    const searchValue = languageSearch.value.toLowerCase();
    languageSelect.innerHTML = "";

    const filtered = top10.filter(lang =>
      lang.toLowerCase().includes(searchValue)
    );

    filtered.forEach(lang => {
      const opt = document.createElement("option");
      opt.value = lang;
      opt.textContent = lang;
      languageSelect.appendChild(opt);
    });

    if (filtered.length > 0) {
      languageSelect.value = filtered[0];
      applyLanguage(filtered[0]);
    }
  });

  // -------------------------------------------------------
  // TEXT-TO-SPEECH (SLOW FEMALE VOICE)
  // -------------------------------------------------------
  function speak(text, callback = null) {
    if (!readAloudToggle.checked) {
      if (callback) callback();
      return;
    }

    const lang = languageSelect.value;
    const voiceCode = translations[lang].voiceCode;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceCode;
    utter.rate = 0.85; // SLOWER VOICE
    utter.pitch = 1.0;

    utter.onend = () => {
      if (callback) callback();
    };

    speechSynthesis.speak(utter);
  }

  // -------------------------------------------------------
  // SPEECH RECOGNITION
  // -------------------------------------------------------
  let recognition;
  let retryCount = 0;

  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      micBtn.classList.add("listening");
    };

    recognition.onend = () => {
      micBtn.classList.remove("listening");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.trim();
      userInput.value = text;
      retryCount = 0;
      sendBtn.click();
    };

    recognition.onerror = () => {
      handleNoVoiceCaptured();
    };
  }

  // -------------------------------------------------------
  // HANDLE MISSED ANSWERS
  // -------------------------------------------------------
  function handleNoVoiceCaptured() {
    retryCount++;

    if (retryCount === 1) {
      speak("I didn’t catch that. Please say it again.", startListening);
    } else if (retryCount === 2) {
      speak("Still didn’t catch that. You can type your answer in the box.", () => {
        micBtn.classList.remove("listening");
      });
    }
  }

  // -------------------------------------------------------
  // START LISTENING (AUTO OR MANUAL)
  // -------------------------------------------------------
  function startListening() {
    if (!voiceModeToggle.checked) return;
    if (!recognition) return;

    const lang = languageSelect.value;
    const voiceCode = translations[lang].voiceCode;

    recognition.lang = voiceCode;
    recognition.start();
  }

  micBtn.addEventListener("click", () => {
    startListening();
  });

  // -------------------------------------------------------
  // CHAT MESSAGE
  // -------------------------------------------------------
  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.textContent = `${sender}: ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // -------------------------------------------------------
  // SEND BUTTON
  // -------------------------------------------------------
  sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("You", text);
    userInput.value = "";

    if (window.handleUserResponse) {
      window.handleUserResponse(text);
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

  // -------------------------------------------------------
  // GUIDED TOUR (WITH PROGRESS BAR + LANGUAGE SEARCH + MIC)
// -------------------------------------------------------
  let tourStep = 0;

  const tourSteps = [
    {
      title: "Welcome!",
      text: "This is the Clinical Intake Assistant. I’ll guide you through the main parts of the screen."
    },
    {
      title: "Progress Bar",
      text: "This bar shows how far the patient is in the intake process. It fills as questions are completed."
    },
    {
      title: "Language Settings",
      text: "Use the language dropdown to switch languages. The interface and questions will follow your choice."
    },
    {
      title: "Language Search",
      text: "Use the Search language box to quickly find one of the top 10 supported languages."
    },
    {
      title: "Voice Features",
      text: "Turn on Read Aloud to hear questions, and Voice Mode to answer by speaking. The mic turns blue when listening."
    },
    {
      title: "Chat Controls",
      text: "Use Start, Pause, Skip, Repeat, and Finish to control the interview flow."
    },
    {
      title: "You're Ready!",
      text: "You’re all set. Start the demo to see the full intake experience."
    }
  ];

  function showTourStep() {
    const step = tourSteps[tourStep];
    tourTitle.textContent = step.title;
    tourText.textContent = step.text;

    tourOverlay.classList.remove("hidden");
    tourTooltip.classList.remove("hidden");
  }

  tourNextBtn.addEventListener("click", () => {
    tourStep++;
    if (tourStep >= tourSteps.length) {
      tourOverlay.classList.add("hidden");
      tourTooltip.classList.add("hidden");
      return;
    }
    showTourStep();
  });

  tourExitBtn.addEventListener("click", () => {
    tourOverlay.classList.add("hidden");
    tourTooltip.classList.add("hidden");
  });

  // -------------------------------------------------------
  // START DEMO
  // -------------------------------------------------------
  startDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";

    tourStep = 0;
    showTourStep();

    if (window.startInterview) {
      window.startInterview();
    }
  });

  exitDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";
  });

  // -------------------------------------------------------
  // AUTO-LISTEN AFTER EACH QUESTION (QUESTIONS ONLY)
// -------------------------------------------------------
  window.autoListenAfterQuestion = function() {
    if (!voiceModeToggle.checked) return;

    setTimeout(() => {
      startListening();
    }, 3500); // ~3.5 second pause between question and listening
  };

  // -------------------------------------------------------
  // EXPOSE FUNCTIONS
  // -------------------------------------------------------
  window.speak = speak;
  window.applyLanguage = applyLanguage;

});
