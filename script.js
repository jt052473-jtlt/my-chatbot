// ---------------------------------------------------------
// SCRIPT.JS — MULTILINGUAL + VOICE ENGINE + UI TRANSLATION
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // ELEMENT REFERENCES
  // -----------------------------
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const languageSelect = document.getElementById("languageSelect");
  const languageSearch = document.getElementById("languageSearch");
  const readAloudToggle = document.getElementById("readAloudToggle");
  const voiceModeToggle = document.getElementById("voiceModeToggle");
  const micBtn = document.getElementById("micBtn");

  // -----------------------------
  // TOP 10 LANGUAGES ONLY
  // -----------------------------
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

  // -----------------------------
  // LANGUAGE SEARCH FILTER
  // -----------------------------
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

  // -----------------------------
  // APPLY LANGUAGE TO UI
  // -----------------------------
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

  // -----------------------------
  // VOICE OUTPUT (TEXT-TO-SPEECH)
  // -----------------------------
  function speak(text) {
    if (!readAloudToggle.checked) return;

    const lang = languageSelect.value;
    const voiceCode = translations[lang].voiceCode;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voiceCode;

    speechSynthesis.speak(utter);
  }

  // -----------------------------
  // VOICE INPUT (SPEECH-TO-TEXT)
  // -----------------------------
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

  // -----------------------------
  // CHAT MESSAGE HELPERS
  // -----------------------------
  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.textContent = `${sender}: ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // -----------------------------
  // SEND BUTTON HANDLER
  // -----------------------------
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

  // -----------------------------
  // EXPOSE FUNCTIONS GLOBALLY
  // -----------------------------
  window.applyLanguage = applyLanguage;
  window.speak = speak;

  // Update UI when language changes
  languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
  });

});
