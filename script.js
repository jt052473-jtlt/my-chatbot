document.addEventListener("DOMContentLoaded", () => {
  const demoOverlay = document.getElementById("demoOverlay");
  const startDemoBtn = document.getElementById("startDemoBtn");
  const tourOverlay = document.getElementById("tourOverlay");
  const tourTooltip = document.getElementById("tourTooltip");
  const tourTitle = document.getElementById("tourTitle");
  const tourText = document.getElementById("tourText");
  const tourNextBtn = document.getElementById("tourNextBtn");
  const tourExitBtn = document.getElementById("tourExitBtn");
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  const controls = {
    Start: document.getElementById("startBtn"),
    Pause: document.getElementById("pauseBtn"),
    Finish: document.getElementById("finishBtn"),
    Repeat: document.getElementById("repeatBtn"),
    Skip: document.getElementById("skipBtn"),
    Reset: document.getElementById("resetBtn"),
    "Language Select": document.getElementById("languageSelect"),
    "Language Search": document.getElementById("languageSearch"),
    "Read Aloud": document.getElementById("readAloudToggle"),
    "Voice Mode": document.getElementById("voiceModeToggle"),
    Microphone: document.getElementById("micBtn"),
  };

  function clearHighlights() {
    Object.values(controls).forEach((el) => el.classList.remove("highlight"));
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.textContent = `${sender}: ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;
    addMessage("You", text);
    userInput.value = "";
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

  const tourSteps = [
    { title: "Welcome", text: "This is Sam, your Sleep Intake Assistant." },
    { title: "Chat Window", text: "All conversation appears here." },
    { title: "Input Box", text: "Type your responses here." },
    { title: "Start", text: "Start begins the intake process." },
    { title: "Pause", text: "Pause temporarily stops the intake." },
    { title: "Finish", text: "Finish ends the intake early." },
    { title: "Repeat", text: "Repeat makes Sam repeat the last message." },
    { title: "Skip", text: "Skip moves past the current question." },
    { title: "Reset", text: "Reset clears the intake and starts over." },
    { title: "Language Select", text: "Choose the patient’s preferred language." },
    { title: "Language Search", text: "Search for a language by typing its name." },
    { title: "Voice Mode", text: "Voice Mode allows spoken responses." },
    { title: "Read Aloud", text: "Sam will read messages out loud." },
    { title: "Microphone", text: "Tap the microphone to begin voice input." },
    { title: "Tour Complete", text: "You're ready to begin!" }
  ];

  let tourStep = 0;

  function showTourStep() {
    clearHighlights();
    const step = tourSteps[tourStep];

    tourTitle.textContent = step.title;
    tourText.textContent = step.text;

    if (controls[step.title]) {
      controls[step.title].classList.add("highlight");
    }

    tourTooltip.classList.remove("hidden");
  }

  startDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";
    tourOverlay.classList.remove("hidden");

    tourStep = 0;
    showTourStep();
  });

  tourNextBtn.addEventListener("click", () => {
    tourStep++;

    if (tourStep >= tourSteps.length) {
      clearHighlights();
      tourTooltip.classList.add("hidden");
      tourOverlay.classList.add("hidden");
      return;
    }

    showTourStep();
  });

  tourExitBtn.addEventListener("click", () => {
    clearHighlights();
    tourTooltip.classList.add("hidden");
    tourOverlay.classList.add("hidden");
  });

  addMessage("Sam", "Welcome! Click Start Demo to begin.");
});
