// Inside your DOMContentLoaded block...

  // 1. FIXED START DEMO: Starts the tour when clicked
  startDemoBtn.addEventListener("click", () => {
    demoOverlay.style.display = "none";
    
    // Clear only chat messages, not Sam's tour box
    const messages = chatWindow.querySelectorAll('div:not(.tour-tooltip):not(.tour-overlay)');
    messages.forEach(m => m.remove());

    tourOverlay.classList.remove("hidden");
    tourTooltip.classList.remove("hidden");
    
    tourStep = 0;
    showTourStep();
  });

  // 2. FIXED NEXT BUTTON: Moves through the tour
  tourNextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents the click from bleeding into the background
    tourStep++;
    
    if (tourStep < tourSteps.length) {
      showTourStep();
    } else {
      // Tour is over
      clearHighlights();
      tourTooltip.classList.add("hidden");
      tourOverlay.classList.add("hidden");
    }
  });

  // 3. EXIT BUTTON: Stops the tour immediately
  tourExitBtn.addEventListener("click", () => {
    clearHighlights();
    tourTooltip.classList.add("hidden");
    tourOverlay.classList.add("hidden");
  });
