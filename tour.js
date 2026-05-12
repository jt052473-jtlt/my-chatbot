let tourStep = 0;

function startTour() {
    isTourActive = true;
    tourStep = 0;
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

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

function endTour() {
    isTourActive = false;   // ⭐ REQUIRED
    isPaused = true;        // ⭐ Prevents intake from starting
    currentStep = 0;        // ⭐ Prevents auto-start

    stopSpeaking();         // ⭐ Prevents leftover speech events

    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

document.getElementById("tourExitBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    endTour();
});

document.getElementById("tourNextBtn").addEventListener("click", nextTourStep);

window.startTour = startTour;
window.nextTourStep = nextTourStep;
window.endTour = endTour;
