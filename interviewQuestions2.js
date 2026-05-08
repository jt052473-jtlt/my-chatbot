// ------------------------------------------------------
// INTERVIEW QUESTIONS (GLOBAL MASTER LIST)
// These are the base English questions.
// Other languages override these via translations.js
// ------------------------------------------------------

const interviewQuestions = [
    { id: 1, text: "What brings you in today?" },
    { id: 2, text: "How long have you been experiencing these symptoms?" },
    { id: 3, text: "Do you have any allergies?" },
    { id: 4, text: "Are you currently taking any medications?" }
];

// Expose globally
window.interviewQuestions = interviewQuestions;
