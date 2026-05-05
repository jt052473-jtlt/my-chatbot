const steps = [
  { title: "Welcome", element: null, text: "This tour will guide you through the interface." },
  { title: "Chat Window", element: "#chatWindow", text: "This is where messages appear." },
  { title: "Progress Bar", element: "#progressBar", text: "Shows how far the patient is in the intake." },
  { title: "Input Box", element: "#userInput", text: "Type responses here." },
  { title: "Start Button", element: "#startBtn", text: "Begins the intake process." },
  { title: "Pause Button", element: "#pauseBtn", text: "Temporarily pauses the intake." },
  { title: "Finish Button", element: "#finishBtn", text: "Ends the intake early." },
  { title: "Repeat Button", element: "#repeatBtn", text: "Repeats the last message." },
  { title: "Skip Button", element: "#skipBtn", text: "Skips the current question." },
  { title: "Reset Button", element: "#resetBtn", text: "Restarts the entire intake." },
  { title: "Language Select", element: "#languageSelect", text: "Choose the patient’s preferred language." },
  { title: "Language Search", element: "#languageSearch", text: "Search for a language by typing." },
  { title: "Voice Mode", element: "#voiceModeToggle", text: "Enable voice input." },
  { title: "Read Aloud", element: "#readAloudToggle", text: "Sam will read messages aloud." },
  { title: "Microphone", element: "#micBtn", text: "Tap to speak instead of typing." },
  { title: "Tour Complete", element: null, text: "You're ready to begin!" }
];

let currentStep = 0;

const overlay = document.getElementById("tourOverlay");
const tooltip = document.getElementById("tourTooltip");
const titleEl = document.getElementById("tourTitle");
const textEl = document.getElementById("tourText");

function clearHighlights() {
  document.querySelectorAll(".highlighted").forEach(el => {
    el.classList.remove("highlighted");
  });
}

function showStep() {
  clearHighlights();

  const step = steps[currentStep];
  titleEl.textContent = step.title;
  textEl.textContent = step.text;

  if (step.element) {
    const el = document.querySelector(step.element);
    if (el) el.classList.add("highlighted");
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }

  tooltip.classList.remove("hidden");
}

document.getElementById("tourNextBtn").onclick = () => {
  currentStep++;
  if (currentStep >= steps.length) {
    endTour();
  } else {
    showStep();
  }
};

function endTour() {
  tooltip.classList.add("hidden");
  overlay.classList.add("hidden");
  clearHighlights();
}

document.getElementById("tourExitBtn").onclick = endTour;

/* --- START DEMO --- */
document.getElementById("startDemoBtn").onclick = () => {
  document.getElementById("demoOverlay").style.display = "none";
  currentStep = 0;
  showStep();
};

/* --- EXIT DEMO --- */
document.getElementById("exitDemoBtn").onclick = () => {
  document.getElementById("demoOverlay").style.display = "none";
};
