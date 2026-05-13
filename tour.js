let tourStep = 0;

function startTour() {
    tourStep = 0;
    const tour = document.getElementById("tourOverlay");
    if (tour) {
        tour.style.display = "flex";
        tour.classList.remove("hidden");
        showTourStep();
    }
}

function showTourStep() {
    const steps = translations[currentLanguage].tour.steps;
    if (tourStep >= steps.length) return endTour();
    
    document.getElementById("tourTitle").textContent = steps[tourStep].title;
    document.getElementById("tourText").textContent = steps[tourStep].text;
}

function nextTourStep() {
    tourStep++;
    showTourStep();
}

function endTour() {
    const tour = document.getElementById("tourOverlay");
    if (tour) {
        tour.style.display = "none";
        tour.classList.add("hidden");
    }
}

// BULLETPROOF BUTTON LISTENER
document.addEventListener("click", (e) => {
    if (e.target.id === "tourExitBtn") {
        e.preventDefault();
        endTour();
    }
    if (e.target.id === "tourNextBtn") {
        e.preventDefault();
        nextTourStep();
    }
});

window.startTour = startTour;
