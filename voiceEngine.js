/* ------------------------------------------------------
   VOICE ENGINE — Handles text-to-speech + voice mode
------------------------------------------------------ */

let synth = window.speechSynthesis;
let speaking = false;

/* ------------------------------------------------------
   SPEAK TEXT (Read Aloud)
------------------------------------------------------ */
function speakText(text) {
    const readAloud = document.getElementById("readAloudToggle").checked;
    if (!readAloud) return;

    if (!synth) return;

    const utter = new SpeechSynthesisUtterance(text);

    /* Choose language voice */
    const langMap = {
        "English": "en-US",
        "Spanish": "es-ES",
        "Chinese": "zh-CN",
        "Hindi": "hi-IN",
        "Russian": "ru-RU"
    };

    utter.lang = langMap[currentLanguage] || "en-US";

    speaking = true;

    utter.onend = () => {
        speaking = false;

        /* Auto-advance if Voice Mode is ON */
        if (document.getElementById("voiceModeToggle").checked) {
            currentStep++;
            showQuestion();
        }
    };

    synth.cancel(); // stop previous speech
    synth.speak(utter);
}

/* ------------------------------------------------------
   STOP SPEAKING
------------------------------------------------------ */
function stopSpeaking() {
    if (synth && speaking) {
        synth.cancel();
        speaking = false;
    }
}

/* ------------------------------------------------------
   EXPORT FUNCTIONS
------------------------------------------------------ */
window.speakText = speakText;
window.stopSpeaking = stopSpeaking;
