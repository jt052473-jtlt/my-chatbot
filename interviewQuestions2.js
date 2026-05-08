// ------------------------------------------------------
// INTERVIEW QUESTIONS (LANGUAGE‑AWARE)
// This file simply exposes a helper that returns the
// correct question list for the current language.
// The actual questions live inside translations.js
// under: translations[LANG].questions
// ------------------------------------------------------

function getInterviewQuestions(language) {
    if (!translations[language] || !translations[language].questions) {
        console.warn("No questions found for language:", language);
        return [];
    }
    return translations[language].questions;
}

// ------------------------------------------------------
// EXPORT (GLOBAL)
// ------------------------------------------------------
window.getInterviewQuestions = getInterviewQuestions;
