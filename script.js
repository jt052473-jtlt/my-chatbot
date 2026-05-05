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
    { title: "Chat Window", text: "All conversation appears here." },
    { title: "Input Box", text: "Type your responses here and press Send." },
    { title: "Start", text: "Start begins the intake process." },
    { title: "Pause", text: "Pause temporarily stops the intake." },
    { title: "Finish", text: "Finish ends the intake early." },
    { title: "Repeat", text: "Repeat makes Sam repeat the last message." },
    { title: "Skip", text: "Skip moves past the current question." },
    { title: "Reset", text: "Reset clears the intake and starts over." },
    { title: "Language Select", text: "Choose the patient’s preferred language." },
    { title: "Language Search", text: "Search for a language by typing its name." },
    { title: "Voice Mode", text: "Enable voice input for spoken responses." },
    { title: "Read Aloud", text: "Sam will read messages out loud when enabled." },
    { title: "Microphone", text: "Tap the microphone to begin voice input." },
    { title: "Tour Complete", text: "You're ready to begin the demo." }
  ];

  let tourStep = 0;

  function showTourStep() {
    const step = tourSteps[tourStep];
    tourTitle.textContent = step.title;
    tourText.textContent = step.text;
    tourTooltip.classList.remove("hidden");
  }

  // Start Demo button (opens tour, hides overlay)
  startDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";

    const bubbles = chatWindow.querySelectorAll("div:not(#tourTooltip)");
    bubbles.forEach(b => b.remove());

    tourOverlay.classList.remove("hidden");
    tourStep = 0;
    showTourStep();
  });

  // Next button in tour
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

  // Exit button in tour
  tourExitBtn.addEventListener("click", () => {
    tourTooltip.classList.add("hidden");
    tourOverlay.classList.add("hidden");
  });
});
