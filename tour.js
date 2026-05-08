// ------------------------------------------------------
// GUIDED TOUR CONTROLLER (Optional helper file)
// This file is intentionally lightweight because the
// main tour logic now lives in script.js.
// ------------------------------------------------------

function startGuidedTour() {
    if (!translations[currentLanguage].tour ||
        !translations[currentLanguage].tour.steps ||
        translations[currentLanguage].tour.steps.length === 0) {
        console.warn("No tour steps available for:", currentLanguage);
        return;
    }

    isTourActive = true;
    tourStep = 0;
    showTourStep();
}

function showTourStep() {
    const steps = translations[currentLanguage].tour.steps;

    if (!steps || tourStep >= steps.length) {
        endGuidedTour();
        return;
    }

    const step = steps[tourStep];

    document.getElementById("tourTitle").textContent = step.title;
    document.getElementById("tourText").textContent = step.text;

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");
}

function nextGuidedTourStep() {
    tourStep++;
    showTourStep();
}

function endGuidedTour() {
    isTourActive = false;
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

// Expose globally
window.startGuidedTour = startGuidedTour;
window.nextGuidedTourStep = nextGuidedTourStep;
window.endGuidedTour = endGuidedTour;
