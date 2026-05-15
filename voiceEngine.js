/* ------------------------------------------------------
   VOICE ENGINE — TTS ONLY (No Speech Recognition Here)
   Clean, Modular, No Conflicts
------------------------------------------------------ */

const VoiceEngine = (() => {

    let currentUtterance = null;
    let isSpeaking = false;

    /* --------------------------------------------------
       SPEAK TEXT (TTS)
    -------------------------------------------------- */
    function speak(text, langCode = "en-US") {
        stop(); // stop any previous speech

        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = langCode;
        utter.rate = 1;
        utter.pitch = 1;

        currentUtterance = utter;
        isSpeaking = true;

        utter.onend = () => {
            isSpeaking = false;
        };

        speechSynthesis.speak(utter);
    }

    /* --------------------------------------------------
       STOP SPEAKING
    -------------------------------------------------- */
    function stop() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        isSpeaking = false;
        currentUtterance = null;
    }

    /* --------------------------------------------------
       CHECK IF SPEAKING
    -------------------------------------------------- */
    function speaking() {
        return isSpeaking;
    }

    /* --------------------------------------------------
       EXPORT
    -------------------------------------------------- */
    return {
        speak,
        stop,
        speaking
    };

})();

window.VoiceEngine = VoiceEngine;
