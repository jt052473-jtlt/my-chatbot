// ---------------------------------------------------------
// SCRIPT.JS — FULL MULTILINGUAL EXPERIENCE + CLEAN RESET
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------
    // ELEMENT REFERENCES
    // -------------------------------------------------------
    const chatWindow = document.getElementById("chatWindow");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const languageSelect = document.getElementById("languageSelect");
    const languageSearch = document.getElementById("languageSearch");
    const readAloudToggle = document.getElementById("readAloudToggle");
    const voiceModeToggle = document.getElementById("voiceModeToggle");
    const micBtn = document.getElementById("micBtn");
    const demoOverlay = document.getElementById("demoOverlay");
    const startDemoBtn = document.getElementById("startDemoBtn");
    const exitDemoBtn = document.getElementById("exitDemoBtn");
    const tourOverlay = document.getElementById("tourOverlay");
    const tourTooltip = document.getElementById("tourTooltip");
    const tourNextBtn = document.getElementById("tourNextBtn");
    const tourExitBtn = document.getElementById("tourExitBtn");
    const tourTitle = document.getElementById("tourTitle");
    const tourText = document.getElementById("tourText");
    const resetBtn = document.getElementById("resetBtn");

    // Label References for Total Language Change
    const readAloudLabel = document.getElementById("readAloudLabel");
    const voiceModeLabel = document.getElementById("voiceModeLabel");

    // -------------------------------------------------------
    // LANGUAGE INITIALIZATION
    // -------------------------------------------------------
    const top10 = ["English","Spanish","Chinese","Tagalog","Vietnamese", "Arabic","French","Korean","Russian","German"];
    
    top10.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });
    languageSelect.value = "English";

    // -------------------------------------------------------
    // APPLY LANGUAGE TO ENTIRE UI (FIXED)
    // -------------------------------------------------------
    function applyLanguage(lang) {
        const t = translations[lang];
        
        // Update App Title
        document.querySelector(".app-header h2").textContent = t.ui.appTitle;
        
        // Update Controls
        document.getElementById("startBtn").textContent = t.ui.start;
        document.getElementById("pauseBtn").textContent = t.ui.pause;
        document.getElementById("finishBtn").textContent = t.ui.finish;
        document.getElementById("repeatBtn").textContent = t.ui.repeat;
        document.getElementById("skipBtn").textContent = t.ui.skip;
        document.getElementById("resetBtn").textContent = t.ui.reset;
        
        // Update Input & Send
        sendBtn.textContent = t.ui.send;
        userInput.placeholder = t.ui.typeHere;

        // FIX: Update Checkbox Labels
        if (readAloudLabel) readAloudLabel.textContent = t.ui.readAloud;
        if (voiceModeLabel) voiceModeLabel.textContent = t.ui.voiceMode;

        // If mid-interview, have Sam re-ask in the new language
        if (window.currentStep > 0) {
            const samName = t.samName || "Sam";
            const question = interviewQuestions[lang][window.currentStep];
            addMessage(samName, question);
            speak(question);
        }
    }

    applyLanguage("English");

    languageSelect.addEventListener("change", () => {
        applyLanguage(languageSelect.value);
    });

    // -------------------------------------------------------
    // LANGUAGE SEARCH
    // -------------------------------------------------------
    languageSearch.addEventListener("input", () => {
        const searchValue = languageSearch.value.toLowerCase();
        languageSelect.innerHTML = "";
        const filtered = top10.filter(lang => lang.toLowerCase().includes(searchValue));
        filtered.forEach(lang => {
            const opt = document.createElement("option");
            opt.value = lang;
            opt.textContent = lang;
            languageSelect.appendChild(opt);
        });
        if (filtered.length > 0) {
            languageSelect.value = filtered[0];
            applyLanguage(filtered[0]);
        }
    });

    // -------------------------------------------------------
    // SPEECH ENGINE (0.85 RATE)
    // -------------------------------------------------------
    function speak(text, callback = null) {
        if (!readAloudToggle.checked) {
            if (callback) callback();
            return;
        }
        const lang = languageSelect.value;
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = translations[lang].voiceCode;
        utter.rate = 0.85; 
        utter.onend = () => { if (callback) callback(); };
        speechSynthesis.speak(utter);
    }

    // -------------------------------------------------------
    // MESSAGE LOGIC (LOCALIZED NAMES)
    // -------------------------------------------------------
    function addMessage(sender, text) {
        const msg = document.createElement("div");
        const lang = languageSelect.value;
        
        // Use localized Sam name (e.g., Сэм) if the sender is Sam
        const displayName = (sender === "Sam") ? (translations[lang].samName || "Sam") : sender;
        
        msg.className = sender === "You" ? "message user-message" : "message system-message";
        msg.textContent = `${displayName}: ${text}`;
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // -------------------------------------------------------
    // SEND & ENTER KEY (FIXED)
    // -------------------------------------------------------
    sendBtn.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage("You", text);
        userInput.value = "";
        if (window.handleUserResponse) window.handleUserResponse(text);
    });

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Stop page refresh
            sendBtn.click();    // Trigger Send button click
        }
    });

    // -------------------------------------------------------
    // CLEAN RESET (ISSUE #3 FIXED)
    // -------------------------------------------------------
    resetBtn.addEventListener("click", () => {
        chatWindow.innerHTML = ""; // Total wipe
        userInput.value = "";
        if (window.resetInterview) window.resetInterview();
    });

    // -------------------------------------------------------
    // GUIDED TOUR (7 STEPS)
    // -------------------------------------------------------
    let tourStep = 0;
    const tourSteps = [
        { title: "Welcome!", text: "This is the Clinical Intake Assistant. I’ll guide you through the main parts of the screen." },
        { title: "Progress Bar", text: "This bar shows how far the patient is in the intake process. It fills as questions are completed." },
        { title: "Language Settings", text: "Use the language dropdown to switch languages. The interface and questions will follow your choice." },
        { title: "Language Search", text: "Use the Search language box to quickly find one of the top 10 supported languages." },
        { title: "Voice Features", text: "Turn on Read Aloud to hear questions, and Voice Mode to answer by speaking. The mic turns blue when listening." },
        { title: "Chat Controls", text: "Use Start, Pause, Skip, Repeat, and Finish to control the interview flow." },
        { title: "You're Ready!", text: "You’re all set. Start the demo to see the full intake experience." }
    ];

    function showTourStep() {
        const step = tourSteps[tourStep];
        tourTitle.textContent = step.title;
        tourText.textContent = step.text;
        tourOverlay.classList.remove("hidden");
        tourTooltip.classList.remove("hidden");
    }

    tourNextBtn.addEventListener("click", () => {
        tourStep++;
        if (tourStep >= tourSteps.length) {
            tourOverlay.classList.add("hidden");
            tourTooltip.classList.add("hidden");
            return;
        }
        showTourStep();
    });

    tourExitBtn.addEventListener("click", () => {
        tourOverlay.classList.add("hidden");
        tourTooltip.classList.add("hidden");
    });

    startDemoBtn.addEventListener("click", () => {
        demoOverlay.style.display = "none";
        tourStep = 0;
        showTourStep();
        if (window.startInterview) window.startInterview();
    });

    // Expose for external calls
    window.speak = speak;
    window.addMessage = addMessage;
});
