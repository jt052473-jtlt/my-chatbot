// ------------------------------------------------------
// GUIDED TOUR CONTROLLER
// Works with script.js + translations.js
// ------------------------------------------------------

function startTour() {
    const tourData = translations[currentLanguage].tour;

    if (!tourData || !tourData.steps || tourData.steps.length === 0) {
        console.warn("No tour steps available for:", currentLanguage);
        return;
    }

    isTourActive = true;
    tourStep = 0;

    updateTourButtons();
    showTourStep();
}

function showTourStep() {
    const steps = translations[currentLanguage].tour.steps;

    if (!steps || tourStep >= steps.length) {
        endTour();
        return;
    }

    const step = steps[tourStep];

    document.getElementById("tourTitle").textContent = step.title;
    document.getElementById("tourText").textContent = step.text;

    updateTourButtons();

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

function endTour() {
    isTourActive = false;
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

// ------------------------------------------------------
// UPDATE NEXT + EXIT BUTTONS BASED ON LANGUAGE
// ------------------------------------------------------
function updateTourButtons() {
    const ui = translations[currentLanguage].ui;

    document.getElementById("tourNextBtn").textContent = ui.next;
    document.getElementById("tourExitBtn").textContent = ui.exit;
}

// Expose globally
window.startTour = startTour;
window.nextTourStep = nextTourStep;
window.endTour = endTour;
window.updateTourButtons = updateTourButtons;
