// interviewQuestions2.js

export const QUESTIONS = {
  en: [
    "What is your full name?",
    "What is your date of birth?",
    "What brings you in today?",
    "How long have you had these symptoms?",
    "Are you currently taking any medications?",
    "Do you have any allergies?",
    "Do you have any chronic conditions?",
    "Have you recently traveled?",
    "Have you experienced fever or chills?",
    "Have you been exposed to anyone sick?",
    "Is there anything else you'd like to share?"
  ]
};

export function getQuestion(lang, index) {
  return QUESTIONS[lang][index];
}
