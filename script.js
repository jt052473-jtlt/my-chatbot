/* ------------------------------------------------------ 
   GLOBAL STATE 
------------------------------------------------------ */
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;

/* ------------------------------------------------------ 
   INITIALIZATION 
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    if (typeof updateUIForLanguage === "function") updateUIForLanguage();
});

/* ------------------------------------------------------ 
   EVENT LISTENERS 
------------------------------------------------------ */
function setupEventListeners() {
    // Start Demo
    const startBtn = document.getElementById("startDemoBtn");
    if (startBtn) startBtn.addEventListener("click", startDemo);

    // Send Button Click
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", () => handleInput());
    }

    // Enter Key Press
    const userInput = document.getElementById("userInput");
    if (userInput) {
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleInput();
        });
    }

    // Language Selector Sync
    const introSelect = document.getElementById("introLanguageSelect");
    if (introSelect) {
        introSelect.addEventListener("change", (e) => {
            currentLanguage = e.target.value;
            document.getElementById("languageSelect").value = currentLanguage;
            if (typeof updateUIForLanguage === "function") updateUIForLanguage();
        });
    }
}

/* ------------------------------------------------------ 
   INPUT HANDLING
------------------------------------------------------ */
function handleInput() {
    const inputField = document.getElementById("userInput");
    const text = inputField.value.trim();
    
    if (text !== "") {
        // 1. Show user message in chat
        if (typeof addUserMessage === "function") addUserMessage(text);
        
        // 2. Clear the box
        inputField.value = "";
        
        // 3. Send to flow logic to move to next question
        if (typeof processUserResponse === "function") {
            processUserResponse(text);
        }
    }
}

/* ------------------------------------------------------ 
   START DEMO 
------------------------------------------------------ */
function startDemo() {
    const overlay = document.getElementById("demoOverlay");
    if (overlay) {
        overlay.style.display = "none";
        overlay.style.opacity = "0";
    }

    // Trigger the first question immediately
    if (typeof showQuestion === "function") {
        showQuestion();
    }
}
