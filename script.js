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
