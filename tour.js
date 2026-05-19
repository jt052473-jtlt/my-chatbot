/* ------------------------------------------------------
   GUIDED TOUR CONTROLLER — Multilingual Version
------------------------------------------------------ */

let tourStep = 0;

/* ------------------------------------------------------
   GET STEPS FOR CURRENT LANGUAGE
------------------------------------------------------ */
function getTourSteps() {
    return translations[currentLanguage].tour.steps;
}

/* ------------------------------------------------------
   START TOUR
------------------------------------------------------ */
function startTour() {
    tourStep = 0;

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");

    loadTourStep();
}

/* ------------------------------------------------------
   LOAD CURRENT STEP
------------------------------------------------------ */
function loadTourStep() {
    const steps = getTourSteps();
    const step = steps[tourStep];

    document.getElementById("tourTitle").textContent = step.title;
    document.getElementById("tourText").textContent = step.text;
}

/* ------------------------------------------------------
   NEXT STEP
------------------------------------------------------ */
function nextTourStep() {
    tourStep++;

    if (tourStep >= getTourSteps().length) {
        endTour();
        return;
    }

    loadTourStep();
}

/* ------------------------------------------------------
   END TOUR
------------------------------------------------------ */
function endTour() {
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

/* ------------------------------------------------------
   EVENT HOOKS
------------------------------------------------------ */
window.startTour = startTour;
window.nextTourStep = nextTourStep;
window.endTour = endTour;

document.getElementById("tourNextBtn").onclick = nextTourStep;
document.getElementById("tourExitBtn").onclick = endTour;

/* ------------------------------------------------------
   FIXED: START DEMO BUTTON NOW TRIGGERS THE TOUR
------------------------------------------------------ */
document.getElementById("startDemoBtn").addEventListener("click", () => {
    document.getElementById("demoOverlay").style.display = "none";
    startTour();
});

/* ------------------------------------------------------
   FIXED: INTRO EXIT BUTTON NOW WORKS
------------------------------------------------------ */
document.getElementById("introExitBtn").addEventListener("click", () => {
    document.getElementById("demoOverlay").style.display = "none";
});
