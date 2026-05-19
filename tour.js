/* ------------------------------------------------------
   GUIDED TOUR CONTROLLER — Multilingual
------------------------------------------------------ */

let tourStep = 0;

function getTourSteps() {
    return translations[currentLanguage].tour.steps;
}

function startTour() {
    tourStep = 0;

    document.getElementById("tourOverlay").classList.remove("hidden");
    document.getElementById("tourTooltip").classList.remove("hidden");

    updateTourButtons();   // ⭐ REQUIRED
    loadTourStep();
}

function loadTourStep() {
    const step = getTourSteps()[tourStep];

    document.getElementById("tourTitle").textContent = step.title;
    document.getElementById("tourText").textContent = step.text;
}

function nextTourStep() {
    tourStep++;

    if (tourStep >= getTourSteps().length) {
        endTour();
        return;
    }

    loadTourStep();
}

function endTour() {
    document.getElementById("tourOverlay").classList.add("hidden");
    document.getElementById("tourTooltip").classList.add("hidden");
}

document.getElementById("tourNextBtn").onclick = nextTourStep;
document.getElementById("tourExitBtn").onclick = endTour;

document.getElementById("startDemoBtn").addEventListener("click", () => {
    currentLanguage = document.getElementById("introLanguageSelect").value;
    document.getElementById("languageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();
    updateTourButtons();

    document.getElementById("demoOverlay").style.display = "none";
    startTour();
});

document.getElementById("introExitBtn").addEventListener("click", () => {
    currentLanguage = document.getElementById("introLanguageSelect").value;
    document.getElementById("languageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();
    updateTourButtons();

    document.getElementById("demoOverlay").style.display = "none";
});
