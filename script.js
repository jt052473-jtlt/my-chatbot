document.addEventListener("DOMContentLoaded", () => {
    // Standard references
    const chatWindow = document.getElementById("chatWindow");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const languageSelect = document.getElementById("languageSelect");
    const resetBtn = document.getElementById("resetBtn");

    // 1. THE TOTAL LANGUAGE CHANGER
    function applyGlobalLanguage(lang) {
        const t = translations[lang];
        
        // Update Header and UI Buttons
        document.querySelector(".app-header h2").textContent = t.ui.appTitle;
        document.getElementById("startBtn").textContent = t.ui.start;
        document.getElementById("pauseBtn").textContent = t.ui.pause;
        document.getElementById("finishBtn").textContent = t.ui.finish;
        document.getElementById("repeatBtn").textContent = t.ui.repeat;
        document.getElementById("skipBtn").textContent = t.ui.skip;
        document.getElementById("resetBtn").textContent = t.ui.reset;
        
        // Update Input and Send Button
        sendBtn.textContent = t.ui.send;
        userInput.placeholder = t.ui.typeHere;

        // Update Sam's personality in the chat
        // If we are mid-interview, have Sam re-ask the question in the new language
        if (typeof currentStep !== 'undefined' && currentStep > 0) {
            const localizedSam = t.samName || "Sam";
            const localizedQuestion = interviewQuestions[lang][currentStep];
            addMessage(localizedSam, localizedQuestion);
            speak(localizedQuestion);
        }
    }

    // Listener for the Language Dropdown
    languageSelect.addEventListener("change", () => {
        const newLang = languageSelect.value;
        applyGlobalLanguage(newLang);
    });

    // 2. UPDATED ADD MESSAGE (Supports Localized Names)
    function addMessage(sender, text) {
        const msg = document.createElement("div");
        // If the sender is 'Sam', we use the localized name from translations
        const lang = languageSelect.value;
        const displayName = (sender === "Sam") ? translations[lang].samName : sender;
        
        msg.className = sender === "You" ? "message user-message" : "message system-message";
        msg.textContent = `${displayName}: ${text}`;
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // 3. ENTER KEY & SEND LOGIC
    sendBtn.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage("You", text);
        userInput.value = "";
        if (window.handleUserResponse) window.handleUserResponse(text);
    });

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // 4. CLEAN RESET (Issue #3 Fix)
    resetBtn.addEventListener("click", () => {
        chatWindow.innerHTML = "";
        userInput.value = "";
        if (window.resetInterview) window.resetInterview();
    });

    // Initialize with default language
    applyGlobalLanguage("English");

    // Expose for other scripts
    window.addMessage = addMessage;
});
