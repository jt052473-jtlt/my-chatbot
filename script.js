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

  const tourSteps = [
    { title: "Welcome", text: "This is Sam, your Clinical Intake Assistant." },
    { title: "Chat Window", text: "Conversation appears here." },
    { title: "Input Box", text: "Type responses here." },
    { title: "Tour Complete", text: "You’re ready to begin." }
  ];

  let tourStep = 0;

  function showTourStep() {
    const step = tourSteps[tourStep];
    tourTitle.textContent = step.title;
    tourText.textContent = step.text;
    tourTooltip.classList.remove("hidden");
  }

  startDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";
    // Clear chat bubbles only, leaving tour box intact
    const bubbles = chatWindow.querySelectorAll('div:not(.tour-tooltip):not(.tour-overlay)');
    bubbles.forEach(b => b.remove());
    tourOverlay.classList.remove("hidden");
    tourStep = 0;
    showTourStep();
  });

  tourNextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tourStep++;
    if (tourStep < tourSteps.length) {
      showTourStep();
    } else {
      tourTooltip.classList.add("hidden");
      tourOverlay.classList.add("hidden");
    }
  });

  tourExitBtn.addEventListener("click", () => {
    tourTooltip.classList.add("hidden");
    tourOverlay.classList.add("hidden");
  });
});
