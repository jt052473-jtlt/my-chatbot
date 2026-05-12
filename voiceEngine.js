let synth = window.speechSynthesis;
let speaking = false;

function speakText(text) {
    const readAloud = document.getElementById("readAloudToggle").checked;
    if (!readAloud) return;

    const utter = new SpeechSynthesisUtterance(text);

    const langMap = {
        English: "en-US",
        Spanish: "es-ES",
        Chinese: "zh-CN",
        Hindi: "hi-IN",
        Russian: "ru-RU"
    };

    utter.lang = langMap[currentLanguage] || "en-US";

    speaking = true;

    utter.onend = () => {
        speaking = false;

        // Prevent intake from starting after exiting tour
        if (isTourActive) return;

        if (document.getElementById("voiceModeToggle").checked) {
            currentStep++;
            showQuestion();
        }
    };

    synth.cancel();
    synth.speak(utter);
}

function stopSpeaking() {
    if (synth && speaking) {
        synth.cancel();
        speaking = false;
    }
}

window.speakText = speakText;
window.stopSpeaking = stopSpeaking;
