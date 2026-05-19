/**
 * Clinical Intake Assistant - Core UI and Event Listeners
 */

// Global state variables
let currentLanguage = "English";
let currentForm = "admission";
let currentStep = 0;
window.interviewAnswers = window.interviewAnswers || {};
window.currentQuestionText = "";

// Wait for the DOM to fully load before initializing
window.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    if (typeof window.updateUIText === "function") {
        window.updateUIText();
    }
});

/**
 * Initializes all core UI event listeners
 */
function initEventListeners() {
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const introExitBtn = document.getElementById("introExitBtn");
    const languageSelect = document.getElementById("languageSelect");
    const formSelect = document.getElementById("formSelect");

    // 1. Handle Message Submission (Clicking 'Send')
    if (sendBtn) {
        sendBtn.addEventListener("click", handleSubmission);
    }

    // 2. Handle Message Submission (Pressing 'Enter' key)
    if (userInput) {
        userInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevents accidental page refreshes or line breaks
                handleSubmission();
            }
        });
    }

    // 3. Sync Language Selection from the Intro Overlay Modal
    if (introExitBtn) {
        introExitBtn.addEventListener("click", () => {
            const introLang = document.getElementById("introLanguageSelect")?.value || "English";
            currentLanguage = introLang;
            
            if (languageSelect) {
                languageSelect.value = introLang;
                // Dispatch a synthetic change event so mic.js and voiceEngine.js synchronize
                languageSelect.dispatchEvent(new Event("change"));
            }
            
            if (typeof window.updateUIText === "function") {
                window.updateUIText();
            }
        });
    }

    // 4. Handle Direct Language Dropdown Changes
    if (languageSelect) {
        languageSelect.addEventListener("change", (e) => {
            currentLanguage = e.target.value;
            if (typeof window.updateUIText === "function") {
                window.updateUIText();
            }
            // Sync voice recognition language if mic framework exists
            if (typeof window.setRecognitionLanguage === "function") {
                window.setRecognitionLanguage(currentLanguage);
            }
        });
    }

    // 5. Handle Form Type Selection Changes
    if (formSelect) {
        formSelect.addEventListener("change", (e) => {
            currentForm = e.target.value;
            resetInterview();
        });
    }
}

/**
 * Captures, processes, and cleanly resets the input field
 */
function handleSubmission() {
    const userInput = document.getElementById("userInput");
    if (!userInput) return;

    const message = userInput.value.trim();

    if (message !== "") {
        // Step 1: Pass the clean string into your active flow script
        if (typeof window.handleUserResponse === "function") {
            window.handleUserResponse(message);
        } else if (typeof window.interviewAnswers !== "undefined") {
            // Fallback: Save answer directly if modular pipeline isn't fully linked
            window.interviewAnswers[`question_${currentStep}`] = message;
            currentStep++;
            if (typeof window.showQuestion === "function") {
                window.showQuestion();
            }
        }

        // Step 2: THE FIX — Reset the DOM input value to empty immediately
        userInput.value = "";
    }
}

/**
 * Resets the active session tracking
 */
function resetInterview() {
    currentStep = 0;
    window.interviewAnswers = {};
    window.currentQuestionText = "";
    
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) chatContainer.innerHTML = "";
    
    if (typeof window.updateProgressBar === "function") {
        window.updateProgressBar();
    }
    if (typeof window.showQuestion === "function") {
        window.showQuestion();
    }
}
