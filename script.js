/* ------------------------------------------------------
   SCRIPT.JS — Main Initializer + Event Wiring
------------------------------------------------------ */

window.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------------
       INITIAL SETUP
    -------------------------------------------------- */
    UIController.populateLanguageSelector();
    UIController.populateFormSelector();

    const startBtn = document.getElementById("startBtn");
    const micBtn = document.getElementById("micBtn");
    const voiceModeToggle = document.getElementById("voiceModeToggle");
    const languageSelect = document.getElementById("languageSelect");
    const formSelect = document.getElementById("formSelect");

    /* --------------------------------------------------
       INIT MIC ENGINE WITH DEFAULT LANGUAGE
    -------------------------------------------------- */
    const defaultLang = translations["English"].voiceCode;
    MicEngine.init(defaultLang);

    /* --------------------------------------------------
       START BUTTON
    -------------------------------------------------- */
    startBtn.addEventListener("click", () => {
        const lang = languageSelect.value;
        const form = formSelect.value;

        // Re-init mic engine with selected language
        MicEngine.init(translations[lang].voiceCode);

        // Start interview
        InterviewFlow.start(form, lang);

        // If Voice Mode is ON, activate continuous listening
        if (voiceModeToggle.checked) {
            UIController.setMicActive(true);
            MicEngine.enableContinuous();
        }
    });

    /* --------------------------------------------------
       VOICE MODE TOGGLE
    -------------------------------------------------- */
    voiceModeToggle.addEventListener("change", () => {
        if (voiceModeToggle.checked) {
            // Turn mic solid blue
            UIController.setMicActive(true);

            // Enable continuous listening
            MicEngine.enableContinuous();
        } else {
            // Turn mic white
            UIController.setMicActive(false);

            // Disable continuous listening
            MicEngine.disableContinuous();
        }
    });

    /* --------------------------------------------------
       MIC BUTTON (Push‑to‑Talk)
    -------------------------------------------------- */
    micBtn.addEventListener("click", () => {
        // If Voice Mode is ON, ignore manual mic button
        if (voiceModeToggle.checked) return;

        // Manual single-shot listening
        MicEngine.singleListen();
    });

});
