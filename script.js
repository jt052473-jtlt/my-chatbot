// ---------------------------------------------------------
// SCRIPT.JS — MULTILINGUAL + VOICE + START DEMO + TOUR
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
  // TOP 10 LANGUAGES ONLY
  // -------------------------------------------------------
  const top10 = [
    "English",
    "Spanish",
    "Chinese",
    "Tagalog",
    "Vietnamese",
    "Arabic",
    "French",
    "Korean",
    "Russian",
    "German"
  ];

  // Populate dropdown
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
  // LANGUAGE SEARCH FILTER
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
  // VOICE OUTPUT (TEXT-TO-SPEECH)
  // -------------------------------------------------------
  function speak(text) {
    if (!readAloudToggle.checked) return;

    const lang = languageSelect.value;
    const voiceCode = translations[lang].voiceCode;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceCode;

    speechSynthesis.speak(utter);
  }

  // -------------------------------------------------------
  // VOICE INPUT (SPEECH-TO-TEXT)
  // -------------------------------------------------------
  let recognition;

  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      userInput.value = text;
      sendBtn.click();
    };
  }

  micBtn.addEventListener("click", () => {
    if (!voiceModeToggle.checked) return;

    const lang = languageSelect.value;
    const voiceCode = translations[lang].voiceCode;

    recognition.lang = voiceCode;
    recognition.start();
  });

  // -------------------------------------------------------
  // CHAT MESSAGE HELPERS
  // -------------------------------------------------------
  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.textContent = `${sender}: ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // -------------------------------------------------------
  // SEND BUTTON HANDLER
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
  // GUIDED TOUR STEPS
  // -------------------------------------------------------
  let tourStep = 0;

  const tourSteps = [
    {
      title: "Welcome!",
      text: "This is the Clinical Intake Assistant. I'll guide you through the interface."
    },
    {
      title: "Language Settings",
      text: "Use the dropdown to switch languages. Everything updates instantly."
    },
    {
      title: "Voice Features",
      text: "Enable Read Aloud or Voice Mode for hands-free interaction."
    },
    {
      title: "Chat Controls",
      text: "Use Start, Pause, Skip, Repeat, and Finish to control the interview."
    },
    {
      title: "You're Ready!",
      text: "Start the demo anytime using the Start Demo button."
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
  // START DEMO LOGIC (Option C)
  // -------------------------------------------------------
  startDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";

    // Start the guided tour AFTER the demo begins
    tourStep = 0;
    showTourStep();

    // Start the interview
    startInterview();
  });

  exitDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";
  });

  // -------------------------------------------------------
  // EXPOSE FUNCTIONS
  // -------------------------------------------------------
  window.speak = speak;
  window.applyLanguage = applyLanguage;

});
