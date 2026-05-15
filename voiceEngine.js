/* ------------------------------------------------------
   VOICE ENGINE — Text‑to‑Speech Controller
   (Aligned, cleaned, same logic, same names)
------------------------------------------------------ */

let synth = window.speechSynthesis;

/* ------------------------------------------------------
   SPEAK TEXT
------------------------------------------------------ */
function speakText(text, language) {
    if (!document.getElementById("readAloudToggle").checked) return;

    if (!synth) return;

    const utter = new SpeechSynthesisUtterance(text);

    // Map UI language to TTS language codes
    const langMap = {
        English: "en-US",
        Spanish: "es-ES",
        Chinese: "zh-CN",
        Hindi: "hi-IN",
        Russian: "ru-RU"
    };

    utter.lang = langMap[language] || "en-US";
    utter.rate = 1;
    utter.pitch = 1;

    synth.cancel();
    synth.speak(utter);
}

/* ------------------------------------------------------
   STOP SPEAKING
------------------------------------------------------ */
function stopSpeaking() {
    if (synth) synth.cancel();
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.speakText = speakText;
window.stopSpeaking = stopSpeaking;
