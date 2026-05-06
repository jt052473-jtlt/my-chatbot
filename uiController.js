// uiController.js
// Connects UI buttons and screen transitions to interviewFlow2.js

import { setLanguage, startInterview, nextQuestion } from "./interviewFlow2.js";

// Handle language selection on intro screen
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        setLanguage(lang);
    });
});

// Start Demo button
document.getElementById("startDemoBtn").addEventListener("click", () => {
    document.getElementById("introSection").style.display = "none";
    document.getElementById("interviewSection").style.display = "block";
    startInterview();
});

// Next button during interview
document.getElementById("nextBtn").addEventListener("click", () => {
    nextQuestion();
});

// Optional: allow Enter key to submit response
document.getElementById("responseInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        nextQuestion();
    }
});
