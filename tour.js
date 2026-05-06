// tour.js
// Guided tour for the Clinical Intake Demo

import { t } from "./translations.js";

let tourStep = 0;
let tourLanguage = "en";

const TOUR_STEPS = {
    en: [
        "Welcome to the Clinical Intake Demo. This quick tour will show you how it works.",
        "Use the language selector to choose English, Spanish, or French.",
        "Click 'Start Demo' to begin the intake process.",
        "Answer each question and click Next to continue.",
        "At the end, you'll see a clean summary of all your responses."
    ],
    es: [
        "Bienvenido a la Demostración de Admisión Clínica. Este recorrido le mostrará cómo funciona.",
        "Use el selector de idioma para elegir inglés, español o francés.",
        "Haga clic en 'Iniciar Demostración' para comenzar el proceso.",
        "Responda cada pregunta y haga clic en Siguiente para continuar.",
        "Al final, verá un resumen limpio de todas sus respuestas."
    ],
    fr: [
        "Bienvenue dans la Démo d'Admission Clinique. Cette visite vous montrera comment cela fonctionne.",
        "Utilisez le sélecteur de langue pour choisir anglais, espagnol ou français.",
        "Cliquez sur 'Démarrer la Démo' pour commencer le processus.",
        "Répondez à chaque question et cliquez sur Suivant pour continuer.",
        "À la fin, vous verrez un résumé clair de toutes vos réponses."
    ]
};

function startTour(lang) {
    tourLanguage = lang;
    tourStep = 0;
    showTourStep();
}

function showTourStep() {
    const overlay = document.getElementById("tourOverlay");
    const textBox = document.getElementById("tourText");
    const nextBtn = document.getElementById("tourNextBtn");

    overlay.style.display = "flex";
    textBox.innerText = TOUR_STEPS[tourLanguage][tourStep];

    nextBtn.innerText = t(tourLanguage, "nextButton");
}

function nextTourStep() {
    tourStep++;

    if (tourStep >= TOUR_STEPS[tourLanguage].length) {
        endTour();
        return;
    }

    showTourStep();
}

function endTour() {
    document.getElementById("tourOverlay").style.display = "none";
}

document.getElementById("tourNextBtn").addEventListener("click", nextTourStep);

export { startTour, nextTourStep, endTour };
