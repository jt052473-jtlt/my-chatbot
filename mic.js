/* ------------------------------------------------------
   MIC ENGINE — Continuous Speech Recognition
   Clean, Modular, Auto‑Send, 500ms Restart Delay
------------------------------------------------------ */

const MicEngine = (() => {

    let recognition = null;
    let listening = false;
    let continuousMode = false;
    let languageCode = "en-US";

    /* --------------------------------------------------
       INIT SPEECH RECOGNITION
    -------------------------------------------------- */
    function init(lang = "en-US") {
        languageCode = lang;

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported.");
            return;
        }

        recognition = new SpeechRecognition();
        recognition.lang = languageCode;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript) {
                // Auto-send immediately
                InterviewFlow.handleUserResponse(transcript);
            }
        };

        recognition.onend = () => {
            listening = false;

            // Restart only if continuous mode is ON
            if (continuousMode) {
                setTimeout(() => {
                    startListening();
                }, 500); // 500ms delay (your choice)
            }
        };
    }

    /* --------------------------------------------------
       START LISTENING
    -------------------------------------------------- */
    function startListening() {
        if (!recognition) return;

        try {
            recognition.start();
            listening = true;
        } catch (e) {
            // Ignore "already started" errors
        }
    }

    /* --------------------------------------------------
       STOP LISTENING
    -------------------------------------------------- */
    function stopListening() {
        if (!recognition) return;

        continuousMode = false;
        listening = false;
        recognition.stop();
    }

    /* --------------------------------------------------
       ENABLE CONTINUOUS MODE
    -------------------------------------------------- */
    function enableContinuous() {
        continuousMode = true;
        startListening();
    }

    /* --------------------------------------------------
       DISABLE CONTINUOUS MODE
    -------------------------------------------------- */
    function disableContinuous() {
        continuousMode = false;
        stopListening();
    }

    /* --------------------------------------------------
       PUSH‑TO‑TALK (Manual Mic Button)
    -------------------------------------------------- */
    function singleListen() {
        continuousMode = false;
        startListening();
    }

    /* --------------------------------------------------
       EXPORT
    -------------------------------------------------- */
    return {
        init,
        startListening,
        stopListening,
        enableContinuous,
        disableContinuous,
        singleListen
    };

})();

window.MicEngine = MicEngine;
