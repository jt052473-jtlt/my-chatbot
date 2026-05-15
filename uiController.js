/* ------------------------------------------------------
   UI CONTROLLER — Clean, Modular, No Duplicates
------------------------------------------------------ */

const UIController = (() => {

    /* -------------------------------
       DOM ELEMENTS
    ------------------------------- */
    const chatWindow = document.getElementById("chatWindow");
    const progressBar = document.getElementById("progressBar");
    const languageSelect = document.getElementById("languageSelect");
    const formSelect = document.getElementById("formSelect");
    const micBtn = document.getElementById("micBtn");
    const readAloudToggle = document.getElementById("readAloudToggle");
    const voiceModeToggle = document.getElementById("voiceModeToggle");

    /* -------------------------------
       CHAT MESSAGE HELPERS
    ------------------------------- */
    function addBotMessage(text) {
        const bubble = document.createElement("div");
        bubble.className = "bot-message";
        bubble.textContent = text;
        chatWindow.appendChild(bubble);
        scrollToBottom();
    }

    function addUserMessage(text) {
        const bubble = document.createElement("div");
        bubble.className = "user-message";
        bubble.textContent = text;
        chatWindow.appendChild(bubble);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    /* -------------------------------
       PROGRESS BAR
    ------------------------------- */
    function updateProgress(currentIndex, totalQuestions) {
        const percent = Math.floor((currentIndex / totalQuestions) * 100);
        progressBar.style.width = percent + "%";
    }

    function resetProgress() {
        progressBar.style.width = "0%";
    }

    /* -------------------------------
       MIC BUTTON STATE
    ------------------------------- */
    function setMicActive(active) {
        if (active) {
            micBtn.classList.add("mic-active");   // solid blue
        } else {
            micBtn.classList.remove("mic-active");
        }
    }

    /* -------------------------------
       LANGUAGE + FORM SELECTORS
    ------------------------------- */
    function populateLanguageSelector() {
        languageSelect.innerHTML = "";
        Object.keys(translations).forEach(lang => {
            const opt = document.createElement("option");
            opt.value = lang;
            opt.textContent = lang;
            languageSelect.appendChild(opt);
        });
    }

    function populateFormSelector() {
        // Already defined in index.html, but we keep this for future expansion
    }

    /* -------------------------------
       CLEAR CHAT
    ------------------------------- */
    function clearChat() {
        chatWindow.innerHTML = "";
    }

    /* -------------------------------
       DEMO OVERLAY
    ------------------------------- */
    function showDemoOverlay() {
        document.getElementById("demoOverlay").style.display = "flex";
    }

    function hideDemoOverlay() {
        document.getElementById("demoOverlay").style.display = "none";
    }

    /* -------------------------------
       TOUR OVERLAY
    ------------------------------- */
    function showTourOverlay() {
        document.getElementById("tourOverlay").classList.remove("hidden");
        document.getElementById("tourTooltip").classList.remove("hidden");
    }

    function hideTourOverlay() {
        document.getElementById("tourOverlay").classList.add("hidden");
        document.getElementById("tourTooltip").classList.add("hidden");
    }

    /* -------------------------------
       EXPORT
    ------------------------------- */
    return {
        addBotMessage,
        addUserMessage,
        updateProgress,
        resetProgress,
        clearChat,
        setMicActive,
        populateLanguageSelector,
        populateFormSelector,
        showDemoOverlay,
        hideDemoOverlay,
        showTourOverlay,
        hideTourOverlay
    };

})();

window.UIController = UIController;
