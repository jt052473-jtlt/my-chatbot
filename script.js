document.addEventListener("DOMContentLoaded", () => {
    // Corrected references to match your CSS
    const chatContainer = document.getElementById("chat-container");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const languageSelect = document.getElementById("languageSelect");
    const resetBtn = document.getElementById("resetBtn");
    const readAloudLabel = document.getElementById("readAloudLabel");
    const voiceModeLabel = document.getElementById("voiceModeLabel");

    // 1. Total Language Change Function
    function applyLanguage(lang) {
        const t = translations[lang];
        document.getElementById("appTitle").textContent = t.ui.appTitle;
        document.getElementById("startBtn").textContent = t.ui.start;
        document.getElementById("pauseBtn").textContent = t.ui.pause;
        document.getElementById("finishBtn").textContent = t.ui.finish;
        document.getElementById("repeatBtn").textContent = t.ui.repeat;
        document.getElementById("skipBtn").textContent = t.ui.skip;
        document.getElementById("resetBtn").textContent = t.ui.reset;
        
        // Translates the labels next to the checkboxes
        if (readAloudLabel) readAloudLabel.textContent = t.ui.readAloud;
        if (voiceModeLabel) voiceModeLabel.textContent = t.ui.voiceMode;

        sendBtn.textContent = t.ui.send;
        userInput.placeholder = t.ui.typeHere;
    }

    // 2. Message Logic (Rounded Bubbles)
    function addMessage(sender, text) {
        const msg = document.createElement("div");
        const lang = languageSelect.value;
        const displayName = (sender === "Sam") ? (translations[lang].samName || "Sam") : sender;
        
        // Classes match your 'Apple-style' CSS
        msg.className = sender === "You" ? "message user-message" : "message system-message";
        msg.textContent = `${displayName}: ${text}`;
        chatContainer.appendChild(msg);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 3. Interactions
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    });

    sendBtn.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage("You", text);
        userInput.value = "";
        if (window.handleUserResponse) window.handleUserResponse(text);
    });

    // 4. Clean Reset (No "Sam: Reset" bubble)
    resetBtn.addEventListener("click", () => {
        chatContainer.innerHTML = ""; 
        userInput.value = "";
        if (window.resetInterview) window.resetInterview();
    });

    // Language Dropdown Setup
    const top10 = ["English","Spanish","Chinese","Tagalog","Vietnamese", "Arabic","French","Korean","Russian","German"];
    top10.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });

    languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
    languageSelect.value = "English";
    applyLanguage("English");
});
