// translations.js
// UI text translations for the Clinical Intake Demo

const UI_TEXT = {
    en: {
        introTitle: "Clinical Intake Demo",
        introSubtitle: "A simple multilingual intake assistant",
        startButton: "Start Demo",
        nextButton: "Next",
        summaryTitle: "Summary of Responses"
    },

    es: {
        introTitle: "Demostración de Admisión Clínica",
        introSubtitle: "Un asistente de admisión multilingüe",
        startButton: "Iniciar Demostración",
        nextButton: "Siguiente",
        summaryTitle: "Resumen de Respuestas"
    },

    fr: {
        introTitle: "Démo d'Admission Clinique",
        introSubtitle: "Un assistant d'admission multilingue",
        startButton: "Démarrer la Démo",
        nextButton: "Suivant",
        summaryTitle: "Résumé des Réponses"
    }
};

// Returns translated UI text
function t(lang, key) {
    return UI_TEXT[lang]?.[key] || UI_TEXT["en"][key] || "";
}

export { UI_TEXT, t };
