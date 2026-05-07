document.addEventListener("DOMContentLoaded", () => {
    // UI References
    const chatContainer = document.getElementById("chat-container");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const languageSelect = document.getElementById("languageSelect");
    const resetBtn = document.getElementById("resetBtn");
    
    // Voice Label References
    const readAloudLabel = document.getElementById("readAloudLabel");
    const voiceModeLabel = document.getElementById("voiceModeLabel");

    // 1. Function to change the entire UI language
    function applyLanguage(lang) {
        const t = translations[lang].ui;

        // Update Title and Buttons
        document.getElementById("appTitle").textContent = t.appTitle;
        document.getElementById("startBtn").textContent = t.start;
        document.getElementById("pauseBtn").textContent = t.pause;
        document.getElementById("finishBtn").textContent = t.finish;
        document.getElementById("repeatBtn").textContent = t.repeat;
        document.getElementById("skipBtn").textContent = t.skip;
        document.getElementById("resetBtn").textContent = t.reset;
        
        // Update Voice Labels (Matches your button logic)
        if (readAloudLabel) readAloudLabel.textContent = t.readAloud;
        if (voiceModeLabel) voiceModeLabel.textContent = t.voiceMode;

        // Update Input Area
        sendBtn.textContent = t.send;
        userInput.placeholder = t.typeHere;
    }

    // 2. Setup Language Dropdown
    const top10 = ["English","Spanish","Chinese","Tagalog","Vietnamese", "Arabic","French","Korean","Russian","German"];
    top10.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });

    languageSelect.addEventListener("change", () => {
        applyLanguage(languageSelect.value);
    });

    // 3. Clean Reset Logic (No "Sam: Reset" bubble)
    resetBtn.addEventListener("click", () => {
        chatContainer.innerHTML = ""; 
        userInput.value = "";
        if (window.resetInterview) window.resetInterview();
    });

    // Initialize the app in English
    languageSelect.value = "English";
    applyLanguage("English");
});
