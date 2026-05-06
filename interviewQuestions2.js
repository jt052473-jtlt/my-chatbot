// interviewQuestions2.js
// Multilingual question bank for the 11‑question Clinical Intake Demo

const QUESTIONS = {
    en: [
        "What is your full name?",
        "What is your date of birth?",
        "What brings you in today?",
        "How long have you had this issue?",
        "Do you have any allergies?",
        "Are you currently taking any medications?",
        "Do you have any chronic conditions?",
        "Have you experienced this issue before?",
        "Have you recently traveled?",
        "Is there anything that makes the issue better or worse?",
        "Is there anything else you would like the clinician to know?"
    ],

    es: [
        "¿Cuál es su nombre completo?",
        "¿Cuál es su fecha de nacimiento?",
        "¿Qué lo trae hoy?",
        "¿Cuánto tiempo ha tenido este problema?",
        "¿Tiene alguna alergia?",
        "¿Está tomando algún medicamento actualmente?",
        "¿Tiene alguna condición crónica?",
        "¿Ha experimentado este problema antes?",
        "¿Ha viajado recientemente?",
        "¿Hay algo que mejore o empeore el problema?",
        "¿Hay algo más que le gustaría que el clínico supiera?"
    ],

    fr: [
        "Quel est votre nom complet?",
        "Quelle est votre date de naissance?",
        "Qu'est‑ce qui vous amène aujourd'hui?",
        "Depuis combien de temps avez‑vous ce problème?",
        "Avez‑vous des allergies?",
        "Prenez‑vous actuellement des médicaments?",
        "Avez‑vous des conditions chroniques?",
        "Avez‑vous déjà eu ce problème auparavant?",
        "Avez‑vous voyagé récemment?",
        "Y a‑t‑il quelque chose qui améliore ou aggrave le problème?",
        "Y a‑t‑il autre chose que vous souhaitez que le clinicien sache?"
    ]
};

// Returns the question text for a given index and language
function getQuestion(lang, index) {
    const list = QUESTIONS[lang] || QUESTIONS["en"];
    return list[index] || "";
}

// Total number of questions (dynamic, no hardcoding)
function getTotalQuestions(lang) {
    const list = QUESTIONS[lang] || QUESTIONS["en"];
    return list.length;
}

export { QUESTIONS, getQuestion, getTotalQuestions };
