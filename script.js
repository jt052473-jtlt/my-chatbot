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
            startGuidedTour();
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
            "multi‑department intake including:\n" +
            "• Cardiology\n" +
            "• Pulmonary\n" +
            "• Neurology\n" +
            "• Pain Management\n" +
            "• Behavioral Health\n" +
            "• Primary Care\n" +
            "• And more\n\n" +
            "The goal is to reduce staff workload, improve data quality, and modernize the " +
            "patient experience using structured conversational flows."
        );
    });
});


/* ========================================================= */
/*                INTRO MESSAGE (DETAILED)                   */
/* ========================================================= */

function startIntroMessage() {
    botSpeak(
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


/* ========================================================= */
/*     TYPING INDICATOR ENGINE + botSpeak() DELAY            */
/* ========================================================= */

function showTyping() {
    const indicator = document.getElementById("typingIndicator");
    indicator.style.display = "flex";
    scrollChatToBottom();
}

function hideTyping() {
    const indicator = document.getElementById("typingIndicator");
    indicator.style.display = "none";
}

function scrollChatToBottom() {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
}

function botSpeak(text, delay = 1200) {
    showTyping();

    setTimeout(() => {
        hideTyping();
        addBotMessage(text);
    }, delay);
}


/* ========================================================= */
/*        BUTTON EXPLANATION PANEL (HELP PANEL)              */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const helpPanel = document.getElementById("buttonHelpPanel");
    const helpBody = helpPanel.querySelector(".help-body");
    const toggleBtn = document.getElementById("toggleHelpBtn");

    toggleBtn.addEventListener("click", () => {
        const isOpen = helpBody.style.display === "block";
        helpBody.style.display = isOpen ? "none" : "block";
        toggleBtn.textContent = isOpen ? "▼" : "▲";
    });

    helpPanel.querySelector(".help-header").addEventListener("click", () => {
        toggleBtn.click();
    });
});


/* ========================================================= */
/*                GUIDED TOUR ENGINE (JS)                    */
/* ========================================================= */

let tourSteps = [];
let currentStep = 0;

function startGuidedTour() {
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

    spotlight.style.top = rect.top + window.scrollY - 50 + "px";
    spotlight.style.left = rect.left + window.scrollX - 50 + "px";

    textBox.innerHTML = step.text;

    tooltip.style.top = rect.bottom + window.scrollY + 20 + "px";
    tooltip.style.left = rect.left + window.scrollX + "px";
}

document.getElementById("tourNextBtn").addEventListener("click", () => {
    currentStep++;
    if (currentStep >= tourSteps.length) {
        endTour();
    } else {
        showTourStep();
    }
});

document.getElementById("tourSkipBtn").addEventListener("click", () => {
    endTour();
});

function endTour() {
    document.getElementById("tourOverlay").style.display = "none";
    startIntroMessage();
}


/* ========================================================= */
/*        BASIC SEND BUTTON + USER MESSAGE HANDLING          */
/* ========================================================= */

document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";

    if (typeof handleUserResponse === "function") {
        handleUserResponse(text);
    }
});

function addUserMessage(text) {
    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}
