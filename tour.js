// ===============================
// GUIDED TOUR CONTROLLER
// ===============================

let tourStep = 0;
let tourActive = false;

const tourBox = document.getElementById("tourBox");
const tourTitle = document.getElementById("tourTitle");
const tourText = document.getElementById("tourText");
const tourNext = document.getElementById("tourNext");
const tourExit = document.getElementById("tourExit");

// Load the correct language tour steps
function loadTourStep() {
    const steps = translations[currentLanguage].tour.steps;

    if (tourStep >= steps.length) {
        endTour();
        return;
    }

    tourTitle.textContent = steps[tourStep].title;
    tourText.textContent = steps[tourStep].text;
}

// Start the guided tour
function startTour() {
    tourActive = true;
    tourStep = 0;
    tourBox.classList.remove("hidden");
    loadTourStep();
}

// Move to the next step
tourNext.addEventListener("click", () => {
    tourStep++;
    loadTourStep();
});

// Exit the tour
tourExit.addEventListener("click", () => {
    endTour();
});

// End the tour
function endTour() {
    tourActive = false;
    tourBox.classList.add("hidden");
}

// Expose globally
window.startTour = startTour;
window.endTour = endTour;
