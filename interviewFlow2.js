// ---------------------------------------------------------
// INTERVIEW FLOW — MULTILINGUAL + VOICE + AUTO-LISTEN
// ---------------------------------------------------------

let currentQuestionIndex = 0;
let currentQuestions = translations["English"].questions;
let currentSummaryLabels = translations["English"].summaryLabels;

let patientAnswers = {
    name: "",
    dob: "",
    complaint: "",
    duration: "",
    allergies: "",
    medications: "",
    chronic: "",
    travel: "",
    surgeries: "",
    notes: ""
};

// ---------------------------------------------------------
// SET LANGUAGE (called by script.js)
// ---------------------------------------------------------
window.setInterviewLanguage = function(lang) {
    currentQuestions = translations[lang].questions;
    currentSummaryLabels = translations[lang].summaryLabels;
};

// ---------------------------------------------------------
// START INTERVIEW
// ---------------------------------------------------------
window.startInterview = function() {
    currentQuestionIndex = 0;

    const lang = languageSelect.value;
    currentQuestions = translations[lang].questions;
    currentSummaryLabels = translations[lang].summaryLabels;

    askNextQuestion();
};

// ---------------------------------------------------------
// ASK NEXT QUESTION
// ---------------------------------------------------------
function askNextQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        buildSummary();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    addMessage("Assistant", question);
    speak(question, () => {
        window.autoListenAfterQuestion();
    });
}

// ---------------------------------------------------------
// HANDLE USER RESPONSE
// ---------------------------------------------------------
window.handleUserResponse = function(text) {
    saveAnswer(text);
    currentQuestionIndex++;
    askNextQuestion();
};

// ---------------------------------------------------------
// SAVE ANSWERS INTO SUMMARY OBJECT
// ---------------------------------------------------------
function saveAnswer(text) {
    switch (currentQuestionIndex) {
        case 0: patientAnswers.name = text; break;
        case 1: patientAnswers.dob = text; break;
        case 2: patientAnswers.complaint = text; break;
        case 3: patientAnswers.duration = text; break;
        case 4: patientAnswers.allergies = text; break;
        case 5: patientAnswers.medications = text; break;
        case 6: patientAnswers.chronic = text; break;
        case 7: patientAnswers.travel = text; break;
        case 8: patientAnswers.surgeries = text; break;
        case 9: patientAnswers.notes = text; break;
    }
}

// ---------------------------------------------------------
// REPEAT CURRENT QUESTION
// ---------------------------------------------------------
document.getElementById("repeatBtn").addEventListener("click", () => {
    const question = currentQuestions[currentQuestionIndex];
    addMessage("Assistant", question);
    speak(question, () => {
        window.autoListenAfterQuestion();
    });
});

// ---------------------------------------------------------
// SKIP QUESTION
// ---------------------------------------------------------
document.getElementById("skipBtn").addEventListener("click", () => {
    currentQuestionIndex++;
    askNextQuestion();
});

// ---------------------------------------------------------
// FINISH EARLY
// ---------------------------------------------------------
document.getElementById("finishBtn").addEventListener("click", () => {
    buildSummary();
});

// ---------------------------------------------------------
// RESET INTERVIEW
// ---------------------------------------------------------
document.getElementById("resetBtn").addEventListener("click", () => {
    currentQuestionIndex = 0;

    patientAnswers = {
        name: "",
        dob: "",
        complaint: "",
        duration: "",
        allergies: "",
        medications: "",
        chronic: "",
        travel: "",
        surgeries: "",
        notes: ""
    };

    addMessage("Assistant", "Interview reset.");
});

// ---------------------------------------------------------
// BUILD SUMMARY (delegates to summaryBuilder2.js)
// ---------------------------------------------------------
function buildSummary() {
    if (window.buildSummary) {
        window.buildSummary(patientAnswers, currentSummaryLabels);
    }
}
