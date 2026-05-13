/* ------------------------------------------------------ 
   TOUR LOGIC
------------------------------------------------------ */
let tourStep = 0;
let isTourActive = false;

function startTour() {
    isTourActive = true;
    tourStep = 0;
    const tourOverlay = document.getElementById("tourOverlay");
    if (tourOverlay) {
        tourOverlay.style.display = "flex"; 
        tourOverlay.classList.remove("hidden");
        showTourStep();
    }
}

function showTourStep() {
    const steps = translations[currentLanguage].tour.steps;
    if (!steps || tourStep >= steps.length) {
        endTour();
        return;
    }
    document.getElementById("tourTitle").textContent = steps[tourStep].title;
    document.getElementById("tourText").textContent = steps[tourStep].text;
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

// THE FIX: Direct Style Manipulation
function endTour() {
    isTourActive = false;
    const tourOverlay = document.getElementById("tourOverlay");
    if (tourOverlay) {
        tourOverlay.style.display = "none";
        tourOverlay.classList.add("hidden");
    }
}

// Global exposure
window.startTour = startTour;
window.endTour = endTour;
window.nextTourStep = nextTourStep;
