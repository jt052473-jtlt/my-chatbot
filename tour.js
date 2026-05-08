// ------------------------------------------------------
// GUIDED TOUR CONTROLLER
// Works with script.js + translations.js
// ------------------------------------------------------

function startGuidedTour() {
    const tourData = translations[currentLanguage].tour;

    if (!tourData || !tourData.steps || tourData.steps.length === 0) {
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
