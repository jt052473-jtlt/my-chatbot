/* ------------------------------------------------------
   GUIDED TOUR CONTROLLER
------------------------------------------------------ */

function startTour() {
    const tourData = translations[currentLanguage].tour;

    if (!tourData || !tourData.steps) return;

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

/* ------------------------------------------------------
   FIX: Prevent Exit from closing the entire demo
------------------------------------------------------ */
document.getElementById("tourExitBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    endTour();
});

/* ------------------------------------------------------
   BUTTON STATE HANDLER
------------------------------------------------------ */
function updateTourButtons() {
    const steps = translations[currentLanguage].tour.steps;

    const nextBtn = document.getElementById("tourNextBtn");
    const exitBtn = document.getElementById("tourExitBtn");

    if (!steps) return;

    if (tourStep >= steps.length - 1) {
        nextBtn.textContent = translations[currentLanguage].ui.finish;
    } else {
        nextBtn.textContent = translations[currentLanguage].ui.next;
    }

    exitBtn.textContent = translations[currentLanguage].ui.exit;
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.startTour = startTour;
window.nextTourStep = nextTourStep;
window.endTour = endTour;
window.updateTourButtons = updateTourButtons;
