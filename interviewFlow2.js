// interviewFlow2.js
// Handles question flow, answer saving, and DOB normalization

import { getQuestionsForLanguage } from "./interviewQuestions2.js";

/* ---------------------------------------------------------
   NORMALIZE DOB (MM/DD/YYYY)
--------------------------------------------------------- */
function normalizeDOB(input) {
  try {
    const date = new Date(input);
    if (isNaN(date.getTime())) return input;

    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
  } catch {
    return input;
  }
}

/* ---------------------------------------------------------
   SAVE ANSWER INTO PACKET
--------------------------------------------------------- */
export function saveAnswer(key, value, packetData) {
  if (!key) return;

  if (key === "patient_date_of_birth") {
    value = normalizeDOB(value);
  }

  packetData[key] = value;
}

/* ---------------------------------------------------------
   INTERVIEW FLOW CLASS
--------------------------------------------------------- */
export class InterviewFlow {
  constructor(language = "en", existingPacket = null, existingIndex = 0) {
    this.language = language;

    // Load questions in selected language
    this.questions = getQuestionsForLanguage(language);

    // Restore or start fresh
    this.currentIndex = existingIndex || 0;
    this.packetData = existingPacket || {};

    // Store metadata
    this.packetData.language = language;
  }

  /* ---------------------------------------------------------
     GET CURRENT QUESTION
  --------------------------------------------------------- */
  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  /* ---------------------------------------------------------
     SAVE ANSWER + MOVE TO NEXT
  --------------------------------------------------------- */
  recordAnswer(value) {
    const question = this.getCurrentQuestion();

    if (question && question.key) {
      saveAnswer(question.key, value, this.packetData);
    }

    this.currentIndex++;
  }

  /* ---------------------------------------------------------
     CHECK IF FINISHED
  --------------------------------------------------------- */
  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  /* ---------------------------------------------------------
     GET PACKET FOR BACKEND
  --------------------------------------------------------- */
  getPacket() {
    return this.packetData;
  }

  /* ---------------------------------------------------------
     PROGRESS HELPERS
  --------------------------------------------------------- */
  getTotalQuestions() {
    return this.questions.length;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  next() {
    this.currentIndex++;
  }
}
