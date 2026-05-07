document.addEventListener("DOMContentLoaded", () => {
    // UI References
    const chatContainer = document.getElementById("chat-container");
    const languageSelect = document.getElementById("languageSelect");
    
    // Voice Label References
    const readAloudLabel = document.getElementById("readAloudLabel");
    const voiceModeLabel = document.getElementById("voiceModeLabel");

    // Function to change the entire UI language
    function applyLanguage(lang) {
        const t = translations[lang].ui;

        // Header & Main Buttons
        document.getElementById("appTitle").textContent = t.appTitle;
        document.getElementById("startBtn").textContent = t.start;
        document.getElementById("pauseBtn").textContent = t.pause;
        document.getElementById("finishBtn").textContent = t.finish;
        document.getElementById("repeatBtn").textContent = t.repeat;
        document.getElementById("skipBtn").textContent = t.skip;
        document.getElementById("resetBtn").textContent = t.reset;
        
        // Voice Mode & Read Aloud Labels (Matching Button Logic)
        if (readAloudLabel) readAloudLabel.textContent = t.readAloud;
        if (voiceModeLabel) voiceModeLabel.textContent = t.voiceMode;

        // Input Field
        document.getElementById("sendBtn").textContent = t.send;
        document.getElementById("userInput").placeholder = t.typeHere;
    }

    // Initialize Dropdown
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

    // Default Start
    languageSelect.value = "English";
    applyLanguage("English");
});
