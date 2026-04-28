/* ========================================================= */
/*   SPLASH SCREEN + INTRO + TOUR CONFIRMATION (TOP OF JS)   */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const splash = document.getElementById("splashScreen");
    const startDemoBtn = document.getElementById("startDemoBtn");
    const tourBtn = document.getElementById("tourBtn");
    const aboutBtn = document.getElementById("aboutBtn");

    /* ----------------------------- */
    /*   START DEMO → INTRO MESSAGE  */
    /* ----------------------------- */
    startDemoBtn.addEventListener("click", () => {
        splash.style.display = "none";
        startIntroMessage();
    });

    /* ----------------------------- */
    /*   TAKE A TOUR → YES/NO POPUP  */
    /* ----------------------------- */
    tourBtn.addEventListener("click", () => {
        const wantsTour = confirm(
            "Would you like a quick tour of the buttons?\n\n" +
            "This will highlight Start, Pause, Finish, Repeat, Skip, and Reset."
        );

        splash.style.display = "none";

        if (wantsTour) {
            startGuidedTour(); // Added in Block 6
        } else {
            startIntroMessage();
        }
    });

    /* ----------------------------- */
    /*   ABOUT PROTOTYPE BUTTON      */
    /* ----------------------------- */
    aboutBtn.addEventListener("click", () => {
        alert(
            "ABOUT THIS PROTOTYPE\n\n" +
            "This Clinical Intake Assistant demonstrates how conversational AI can streamline " +
            "patient intake before the patient reaches the clinic.\n\n" +
            "Although this demo uses a sleep intake workflow, the underlying engine supports " +
            "multi‑department intake including cardiology, pulmonary, neurology, pain management, " +
            "behavioral health, and more.\n\n" +
            "The goal is to reduce staff workload, improve data quality, and modernize the " +
            "patient experience using structured conversational flows."
        );
    });
});


/* ========================================================= */
/*                INTRO MESSAGE (DETAILED)                   */
/* ========================================================= */

function startIntroMessage() {
    addBotMessage(
        "<strong>Welcome to the Clinical Intake Assistant.</strong><br><br>" +
        "This prototype demonstrates how conversational AI can guide patients through structured " +
        "intake workflows before they arrive at the clinic. While this demo uses a " +
        "<strong>sleep intake</strong> example, the underlying system is designed to support " +
        "<strong>multiple departments</strong> including cardiology, pulmonary, neurology, " +
        "pain management, behavioral health, and more.<br><br>" +
        "The goal is to reduce staff workload, improve data accuracy, and create a smoother, " +
        "more modern patient experience. You can respond by typing or using voice. " +
        "When you're ready, we'll begin."
    );

    // Wait 3 seconds, then start the first question
    setTimeout(() => {
        if (typeof askNextQuestion === "function") {
            askNextQuestion();
        }
    }, 3000);
}


/* ========================================================= */
/*                BASIC BOT MESSAGE HELPER                   */
/* ========================================================= */

function addBotMessage(text) {
    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    msg.className = "message bot";
    msg.innerHTML = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}
<!-- =============================== -->
<!--   BUTTON EXPLANATION PANEL     -->
<!-- =============================== -->
<div id="buttonHelpPanel" class="help-panel">
    <div class="help-header">
        <span>❓ What do these buttons do?</span>
        <button id="toggleHelpBtn" class="help-toggle">▼</button>
    </div>

    <div class="help-body">
        <p><strong>▶ Start</strong> — Begins the intake session.</p>
        <p><strong>⏸ Pause</strong> — Temporarily stops the conversation.</p>
        <p><strong>🛑 Finish</strong> — Ends the session immediately.</p>
        <p><strong>🔁 Repeat</strong> — Repeats the last question.</p>
        <p><strong>⏭ Skip</strong> — Skips the current question.</p>
        <p><strong>🔄 Reset</strong> — Restarts the entire intake from the beginning.</p>
    </div>
</div>
/* =============================== */
/*     BUTTON EXPLANATION PANEL    */
/* =============================== */

.help-panel {
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    padding: 12px;
    margin-top: 10px;
    font-size: 13px;
}

.help-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
}

.help-toggle {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

.help-body {
    margin-top: 10px;
    display: none; /* Hidden until toggled */
    line-height: 1.45;
}

.help-body p {
    margin: 6px 0;
}
/* =============================== */
/*   BUTTON EXPLANATION PANEL JS   */
/* =============================== */

document.addEventListener("DOMContentLoaded", () => {
    const helpPanel = document.getElementById("buttonHelpPanel");
    const helpBody = helpPanel.querySelector(".help-body");
    const toggleBtn = document.getElementById("toggleHelpBtn");

    toggleBtn.addEventListener("click", () => {
        const isOpen = helpBody.style.display === "block";

        helpBody.style.display = isOpen ? "none" : "block";
        toggleBtn.textContent = isOpen ? "▼" : "▲";
    });

    // Clicking the header also toggles the panel
    helpPanel.querySelector(".help-header").addEventListener("click", () => {
        toggleBtn.click();
    });
});
<!-- ===================================== -->
<!--        GUIDED TOUR OVERLAY           -->
<!-- ===================================== -->
<div id="tourOverlay" class="tour-overlay" style="display:none;">
    <div id="tourSpotlight" class="tour-spotlight"></div>

    <div id="tourTooltip" class="tour-tooltip">
        <div id="tourText"></div>

        <div class="tour-controls">
            <button id="tourNextBtn" class="tour-btn">Next</button>
            <button id="tourSkipBtn" class="tour-btn secondary">Skip</button>
        </div>
    </div>
</div>
/* ===================================== */
/*        GUIDED TOUR ENGINE (JS)        */
/* ===================================== */

let tourSteps = [];
let currentStep = 0;

function startGuidedTour() {
    // Define the steps of the tour
    tourSteps = [
        {
            element: document.getElementById("startBtn"),
            text: "This is the <strong>Start</strong> button. It begins the intake session."
        },
        {
            element: document.getElementById("pauseBtn"),
            text: "The <strong>Pause</strong> button temporarily stops the conversation."
        },
        {
            element: document.getElementById("finishBtn"),
            text: "The <strong>Finish</strong> button ends the session immediately."
        },
        {
            element: document.getElementById("repeatBtn"),
            text: "The <strong>Repeat</strong> button repeats the last question."
        },
        {
            element: document.getElementById("skipBtn"),
            text: "The <strong>Skip</strong> button skips the current question."
        },
        {
            element: document.getElementById("resetBtn"),
            text: "The <strong>Reset</strong> button restarts the entire intake from the beginning."
        }
    ];

    currentStep = 0;
    document.getElementById("tourOverlay").style.display = "block";
    showTourStep();
}

function showTourStep() {
    const step = tourSteps[currentStep];
    if (!step) return endTour();

    const spotlight = document.getElementById("tourSpotlight");
    const tooltip = document.getElementById("tourTooltip");
    const textBox = document.getElementById("tourText");

    const rect = step.element.getBoundingClientRect();

    // Position spotlight
    spotlight.style.top = rect.top + window.scrollY - 50 + "px";
    spotlight.style.left = rect.left + window.scrollX - 50 + "px";

    // Update tooltip text
    textBox.innerHTML = step.text;

    // Position tooltip under the spotlight
    tooltip.style.top = rect.bottom + window.scrollY + 20 + "px";
    tooltip.style.left = rect.left + window.scrollX + "px";
}

// NEXT button
document.getElementById("tourNextBtn").addEventListener("click", () => {
    currentStep++;
    if (currentStep >= tourSteps.length) {
        endTour();
    } else {
        showTourStep();
    }
});

// SKIP button
document.getElementById("tourSkipBtn").addEventListener("click", () => {
    endTour();
});

function endTour() {
    document.getElementById("tourOverlay").style.display = "none";
    startIntroMessage(); // After tour, begin intro
}
function startIntroMessage() {
    addBotMessage(
        "<strong>Welcome to the Clinical Intake Assistant.</strong><br><br>" +
        "This prototype demonstrates how conversational AI can guide patients through structured " +
        "intake workflows before they arrive at the clinic. While this demo uses a " +
        "<strong>sleep intake</strong> example, the underlying system is designed to support " +
        "<strong>multiple clinical departments</strong> including cardiology, pulmonary, neurology, " +
        "pain management, behavioral health, and more.<br><br>" +
        "The goal is to reduce staff workload, improve data accuracy, and create a smoother, " +
        "more modern patient experience. You can respond by typing or using voice. " +
        "When you're ready, we'll begin."
    );

    setTimeout(() => {
        if (typeof askNextQuestion === "function") {
            askNextQuestion();
        }
    }, 3000);
}
/* =============================== */
/*         TYPING INDICATOR        */
/* =============================== */

.typing-indicator {
    display: flex;
    gap: 4px;
    padding: 10px 14px;
    margin: 6px;
    background: #e5e5ea;
    border-radius: 12px;
    width: fit-content;
}

.typing-indicator span {
    width: 8px;
    height: 8px;
    background: #888;
    border-radius: 50%;
    animation: blink 1.4s infinite both;
}

.typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes blink {
    0% { opacity: .2; }
    20% { opacity: 1; }
    100% { opacity: .2; }
}
