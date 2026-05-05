// Inside your startDemoBtn listener
  startDemoBtn.addEventListener("click", () => {
    // Clear only chat messages
    const messages = chatWindow.querySelectorAll('div:not(.tour-tooltip):not(.tour-overlay)');
    messages.forEach(m => m.remove());

    demoOverlay.style.display = "none";
    tourOverlay.classList.remove("hidden");
    tourTooltip.classList.remove("hidden"); // Explicitly show the tooltip
    
    tourStep = 0;
    showTourStep();
  });

  // Updated Next Button Logic
  tourNextBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop click from bubbling up
    
    tourStep++;
    if (tourStep < tourSteps.length) {
      showTourStep();
    } else {
      // End of tour
      clearHighlights();
      tourTooltip.classList.add("hidden");
      tourOverlay.classList.add("hidden");
    }
  });
