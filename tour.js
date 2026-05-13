/* ------------------------------------------------------ 
   GUIDED TOUR CONTROLLER 
------------------------------------------------------ */
function startTour() {
    // translations is global from translations.js
    const tourData = translations[currentLanguage].tour;
    if (!tourData || !tourData.steps) return;

    isTourActive = true;
    tourStep = 0;
    
    // Show the tour elements defined in index.html
    const tourOverlay = document.getElementById("tourOverlay");
    const tourTooltip = document.getElementById("tourTooltip");
    
    if (tourOverlay && tourTooltip) {
        tourOverlay.classList.remove("hidden");
        tourOverlay.style.display = "flex"; // Ensure it's visible
        tourTooltip.classList.remove("hidden");
        showTourStep();
    }
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
    
    if (typeof updateTourButtons === "function") updateTourButtons();
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

function endTour() {
    isTourActive = false;
    const tourOverlay = document.getElementById("tourOverlay");
    const tourTooltip = document.getElementById("tourTooltip");

    if (tourOverlay) {
        tourOverlay.classList.add("hidden");
        tourOverlay.style.display = "none";
    }
    if (tourTooltip) {
        tourTooltip.classList.add("hidden");
    }
    console.log("Tour ended.");
}

/* ------------------------------------------------------ 
   EXPORT TO GLOBAL SCOPE
------------------------------------------------------ */
window.startTour = startTour;
window.nextTourStep = nextTourStep;
window.endTour = endTour;

// Ensure the Exit button works whenever it appears
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "tourExitBtn") {
        e.preventDefault();
        e.stopPropagation();
        endTour();
    }
});
