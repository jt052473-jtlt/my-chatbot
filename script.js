// ---------------------------------------------------------
// SCRIPT.JS — RESTORED LAYOUT + TOTAL LANGUAGE TAKEOVER
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------
    // 1. ELEMENT REFERENCES (Matches Original CSS IDs)
    // -------------------------------------------------------
    const chatContainer = document.getElementById("chat-container");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const languageSelect = document.getElementById("languageSelect");
    const languageSearch = document.getElementById("languageSearch");
    const readAloudToggle = document.getElementById("readAloudToggle");
    const voiceModeToggle = document.getElementById("voiceModeToggle");
    const micBtn = document.getElementById("micBtn");
    const resetBtn = document.getElementById("resetBtn");
    
    // Labels for translation takeover
    const readAloudLabel = document.getElementById("readAloudLabel");
    const voiceModeLabel = document.getElementById("voiceModeLabel");

    // -------------------------------------------------------
    // 2. APPLY LANGUAGE (Repaints the entire UI)
    // -------------------------------------------------------
    function applyLanguage(lang) {
        const t = translations[lang];
        
        // Update Header & Buttons
        document.getElementById("appTitle").textContent = t.ui.appTitle;
        document.getElementById("startBtn").textContent = t.ui.start;
        document.getElementById("pauseBtn").textContent = t.ui.pause;
        document.getElementById("finishBtn").textContent = t.ui.finish;
        document.getElementById("repeatBtn").textContent = t.ui.repeat;
        document.getElementById("skipBtn").textContent = t.ui.skip;
        document.getElementById("resetBtn").textContent = t.ui.reset;
        
        // Update Checkbox Labels
        if (readAloudLabel) readAloudLabel.textContent = t.ui.readAloud;
        if (voiceModeLabel) voiceModeLabel.textContent = t.ui.voiceMode;

        // Update Input Area
        sendBtn.textContent = t.ui.send;
        userInput.placeholder = t.ui.typeHere;

        // If an interview is active, have Sam re-ask in the new language
        if (window.currentStep > 0) {
            const samName = t.samName || "Sam";
            const question = interviewQuestions[lang][window.currentStep];
            addMessage("Sam", question);
            speak(question);
        }
    }

    // -------------------------------------------------------
    // 3. MESSAGE LOGIC (Uses original Bubble CSS)
    // -------------------------------------------------------
    function addMessage(sender, text) {
        const msg = document.createElement("div");
        const lang = languageSelect.value;
        const displayName = (sender === "Sam") ? (translations[lang].samName || "Sam") : sender;
        
        // className matches your original style.css
        msg.className = sender === "You" ? "message user-message" : "message system-message";
        msg.textContent = `${displayName}: ${text}`;
        chatContainer.appendChild(msg);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // -------------------------------------------------------
    // 4. INTERACTION LOGIC (Enter Key & Reset)
    // -------------------------------------------------------
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

    resetBtn.addEventListener("click", () => {
        chatContainer.innerHTML = ""; // Clean wipe (Issue #3 Fix)
        userInput.value = "";
        if (window.resetInterview) window.resetInterview();
    });

    // -------------------------------------------------------
    // 5. INITIALIZATION
    // -------------------------------------------------------
    const top10 = ["English","Spanish","Chinese","Tagalog","Vietnamese", "Arabic","French","Korean","Russian","German"];
    top10.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });

    languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
    
    // Default Start
    languageSelect.value = "English";
    applyLanguage("English");

    // Expose functions for other script files (tour.js, voiceEngine.js)
    window.addMessage = addMessage;
});
