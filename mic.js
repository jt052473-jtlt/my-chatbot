const MicEngine = (() => {

    let recognition = null;
    let listening = false;
    let continuousMode = false;
    let languageCode = "en-US";

    function init(lang = "en-US") {
        languageCode = lang;

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        recognition = new SpeechRecognition();
        recognition.lang = languageCode;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript) {
                InterviewFlow.handleUserResponse(transcript);
            }
        };

        recognition.onend = () => {
            listening = false;
            if (continuousMode) {
                setTimeout(() => startListening(), 500);
            }
        };
    }

    function startListening() {
        if (!recognition) return;
        try {
            recognition.start();
            listening = true;
        } catch {}
    }

    function stopListening() {
        if (!recognition) return;
        continuousMode = false;
        listening = false;
        recognition.stop();
    }

    function enableContinuous() {
        continuousMode = true;
        startListening();
    }

    function disableContinuous() {
        continuousMode = false;
        stopListening();
    }

    function singleListen() {
        continuousMode = false;
        startListening();
    }

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
