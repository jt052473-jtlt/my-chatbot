// tour.js — Centered Tooltip Guided Tour

let tourStep = 0;

const TOUR_STEPS = [
  { title: "Welcome", text: "This guided tour will walk you through the Clinical Intake Assistant." },
  { title: "Language Options", text: "Use the language selector and search box to choose your preferred language." },
  { title: "Voice Features", text: "Enable Read Aloud or Voice Mode to enhance accessibility." },
  { title: "Chat Window", text: "All questions and responses will appear here during the intake." },
  { title: "Controls", text: "Use Start, Pause, Finish, Repeat, Skip, and Reset to manage the intake flow." },
  { title: "Input Area", text: "Type your response here and click Send to continue." }
];

function startTour() {
  tourStep = 0;
  showTourStep();
}

function showTourStep() {
  const overlay = document.getElementById("tourOverlay");
  const tooltip = document.getElementById("tourTooltip");

  overlay.classList.remove("hidden");
  tooltip.classList.remove("hidden");

  document.getElementById("tourTitle").textContent = TOUR_STEPS[tourStep].title;
  document.getElementById("tourText").textContent = TOUR_STEPS[tourStep].text;
}

function nextTourStep() {
  tourStep++;
  if (tourStep >= TOUR_STEPS.length) {
    endTour();
  } else {
    showTourStep();
  }
}

function endTour() {
  document.getElementById("tourOverlay").classList.add("hidden");
  document.getElementById("tourTooltip").classList.add("hidden");
}

document.getElementById("tourNextBtn").addEventListener("click", nextTourStep);
document.getElementById("tourExitBtn").addEventListener("click", endTour);

export { startTour };
