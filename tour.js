/* ------------------------------------------------------
   GUIDED TOUR CONTROLLER
   (Aligned, cleaned, same logic, same names)
------------------------------------------------------ */

let tourStep = 0;

const tourSteps = [
    {
        title: "Welcome",
        text: "This is the Clinical Intake Assistant. I will guide you through the interface."
    },
    {
        title: "Language Selector",
        text: "Choose your preferred language here."
    },
    {
        title: "Form Selector",
        text: "Select which intake form you want to complete."
    },
    {
        title: "Chat Window",
        text: "This is where the conversation appears."
    },
    {
        title: "Controls",
        text: "Use these buttons to start, skip, repeat, or finish the interview."
    }
];

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
    const step = tourSteps[tourStep];
    document.getElementById("tourTitle").textContent = step.title;
    document.getElementById("tourText").textContent = step.text;
}

/* ------------------------------------------------------
   NEXT STEP
------------------------------------------------------ */
function nextTourStep() {
    tourStep++;

    if (tourStep >= tourSteps.length) {
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
