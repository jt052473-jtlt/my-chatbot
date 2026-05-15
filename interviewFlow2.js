/* ------------------------------------------------------
   INTERVIEW FLOW — Clean, Modular, No Conflicts
------------------------------------------------------ */

const InterviewFlow = (() => {

    let currentForm = "admission";
    let currentLanguage = "English";
    let questionIndex = 0;
    let interviewAnswers = {};

    /* --------------------------------------------------
       START INTERVIEW
    -------------------------------------------------- */
    function start(formName, language) {
        currentForm = formName;
        currentLanguage = language;
        questionIndex = 0;
        interviewAnswers = {};

        UIController.clearChat();
        UIController.resetProgress();

        askNextQuestion();
    }

    /* --------------------------------------------------
       ASK NEXT QUESTION
    -------------------------------------------------- */
    function askNextQuestion() {
        const form = forms[currentForm];
        const questions = form.questions;

        if (questionIndex >= questions.length) {
            finishInterview();
            return;
        }

        const question = questions[questionIndex];

        // Show the question immediately
        UIController.addBotMessage(question);

        // Speak the question immediately
        const langCode = translations[currentLanguage].voiceCode;
        VoiceEngine.speak(question, langCode);

        // If Voice Mode is ON, restart recognition after 500ms
        if (voiceModeToggle.checked) {
            setTimeout(() => {
                MicEngine.enableContinuous();
            }, 500);
        }
    }

    /* --------------------------------------------------
       HANDLE USER RESPONSE
    -------------------------------------------------- */
    function handleUserResponse(text) {
        if (!text) return;

        // Show user message
        UIController.addUserMessage(text);

        // Save answer
        const key = getAnswerKey();
        interviewAnswers[key] = text;

        // Move to next question
        questionIndex++;

        // Update progress bar
        const total = forms[currentForm].questions.length;
        UIController.updateProgress(questionIndex, total);

        // Ask next question
        askNextQuestion();
    }

    /* --------------------------------------------------
       GET ANSWER KEY (Matches summaryLabels)
    -------------------------------------------------- */
    function getAnswerKey() {
        const form = forms[currentForm];
        const keys = Object.keys(form.summaryLabels);
        return keys[questionIndex];
    }

    /* --------------------------------------------------
       FINISH INTERVIEW
    -------------------------------------------------- */
    function finishInterview() {
        // Stop recognition
        MicEngine.disableContinuous();

        // Build summary
        const summary = SummaryBuilder.buildSummary(
            currentForm,
            interviewAnswers
        );

        // Show summary as ONE bot bubble
        UIController.addBotMessage(summary);
    }

    /* --------------------------------------------------
       EXPORT
    -------------------------------------------------- */
    return {
        start,
        handleUserResponse
    };

})();

window.InterviewFlow = InterviewFlow;
