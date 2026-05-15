/* ------------------------------------------------------
   UI CONTROLLER — Handles UI updates + helpers
   (Aligned, cleaned, same logic, same names)
------------------------------------------------------ */

/* ------------------------------------------------------
   UPDATE LANGUAGE UI TEXT
------------------------------------------------------ */
function updateUIText() {
    const t = translations[currentLanguage];

    document.getElementById("startBtn").textContent = t.start;
    document.getElementById("pauseBtn").textContent = t.pause;
    document.getElementById("finishBtn").textContent = t.finish;
    document.getElementById("repeatBtn").textContent = t.repeat;
    document.getElementById("skipBtn").textContent = t.skip;
    document.getElementById("resetBtn").textContent = t.reset;
    document.getElementById("sendBtn").textContent = t.send;
}

/* ------------------------------------------------------
   SHOW LOADING MESSAGE
------------------------------------------------------ */
function showLoading() {
    const t = translations[currentLanguage];
    addBotMessage(t.searching);
}

/* ------------------------------------------------------
   SHOW LISTENING MESSAGE
------------------------------------------------------ */
function showListening() {
    const t = translations[currentLanguage];
    addBotMessage(t.listening);
}

/* ------------------------------------------------------
   SHOW SPEAK NOW MESSAGE
------------------------------------------------------ */
function showSpeakNow() {
    const t = translations[currentLanguage];
    addBotMessage(t.speakNow);
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.updateUIText = updateUIText;
window.showLoading = showLoading;
window.showListening = showListening;
window.showSpeakNow = showSpeakNow;
