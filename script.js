// ---------------------------------------------------------
// BASIC CHAT FUNCTIONS
// ---------------------------------------------------------

function botSpeak(text) {
    const chat = document.getElementById("chatWindow");
    const typing = document.getElementById("typingIndicator");

    typing.style.display = "block";

    setTimeout(() => {
        typing.style.display = "none";

        const msg = document.createElement("div");
        msg.className = "message bot";
        msg.innerHTML = text;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;

        // Read aloud every bot message
        speakText(msg.innerText);
    }, 900);
}

function userSpeak(text) {
    const chat = document.getElementById("chatWindow");
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}



// ---------------------------------------------------------
// SPLASH SCREEN → START DEMO
// ---------------------------------------------------------

document.getElementById("startDemoBtn").addEventListener("click", () => {
    document.getElementById("splashScreen").style.display = "none";
    startIntroMessage();
});



// ---------------------------------------------------------
// INTRO MESSAGE (with literacy)
// ---------------------------------------------------------

function startIntroMessage() {
    botSpeak(
        "<strong>Welcome to the Clinical Intake Assistant.</strong><br><br>" +
        "This demo uses a <strong>sleep intake</strong> example, but the same system can support " +
        "cardiology, pulmonary, neurology, pain management, behavioral health, and more.<br><br>" +
        "In our service area, more than <strong>1 in 5 adults have low literacy</strong>, so this assistant " +
        "includes <strong>Read‑Aloud</strong> and <strong>Voice Input</strong> to help patients who prefer listening " +
        "and speaking instead of reading and typing.<br><br>" +
        "<strong>To begin:</strong><br>" +
        "• Click <strong>Start</strong> to begin the demo.<br>" +
        "• Or click <strong>“What do these buttons do?”</strong> for a quick explanation first."
    );
}



// ---------------------------------------------------------
// ABOUT POPUP (with literacy)
// ---------------------------------------------------------

document.getElementById("btnAbout").addEventListener("click", () => {
    alert(
        "ABOUT THIS PROTOTYPE\n\n" +
        "This Clinical Intake Assistant demonstrates how conversational AI can streamline " +
        "patient intake before the patient reaches the clinic.\n\n" +
        "Although this demo uses a sleep intake workflow, the underlying engine supports " +
        "multi‑department intake including cardiology, pulmonary, neurology, pain management, " +
        "behavioral health, primary care, and more.\n\n" +
        "Local data shows that more than 1 in 5 adults in the NGHS service area struggle " +
        "with low literacy, meaning many patients have difficulty understanding medical " +
        "forms, prescription instructions, and discharge papers.\n\n" +
        "Because of this, the assistant includes Read‑Aloud mode and full voice support, " +
        "allowing patients to listen to questions and speak their answers instead of " +
        "reading and typing.\n\n" +
        "The goal is to reduce staff workload, improve data quality, and modernize the " +
        "patient experience using structured conversational flows."
    );
});



// ---------------------------------------------------------
// ADVANCED VOICE SYSTEM (RESTORED)
// ---------------------------------------------------------

let recognition;
let isListening = false;
let voiceMode = false;

// Initialize Speech Recognition
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.trim();
        userSpeak(transcript);
        handleVoiceLogic(transcript);
    };

    recognition.onend = function() {
        isListening = false;
        micButton.classList.remove("listening");

        if (voiceMode) {
            setTimeout(() => recognition.start(), 400);
        }
    };
}



// ---------------------------------------------------------
// TEXT-TO-SPEECH (Female voice only)
// ---------------------------------------------------------

function speakText(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;
    utter.lang = "en-US";

    // Force female voice if available
    const voices = speechSynthesis.getVoices();
    const female = voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("google us english")
    );
    if (female) utter.voice = female;

    speechSynthesis.speak(utter);
}



// ---------------------------------------------------------
// VOICE MODE CHECKBOX + MIC BUTTON
// ---------------------------------------------------------

const voiceCheckbox = document.getElementById("voiceModeCheckbox");
const micButton = document.getElementById("micButton");

// Voice Mode OFF on startup
voiceCheckbox.checked = false;

voiceCheckbox.addEventListener("change", () => {
    voiceMode = voiceCheckbox.checked;

    if (voiceMode) {
        botSpeak("Voice Mode enabled. I will listen after each question.");
        startListening();
    } else {
        botSpeak("Voice Mode disabled.");
        stopListening();
    }
});

micButton.addEventListener("click", () => {
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
});

function startListening() {
    if (!recognition) {
        botSpeak("Voice input is not supported in this browser.");
        return;
    }

    isListening = true;
    micButton.classList.add("listening");
    recognition.start();
}

function stopListening() {
    isListening = false;
    micButton.classList.remove("listening");
    if (recognition) recognition.stop();
}



// ---------------------------------------------------------
// NATURAL YES/NO DETECTION + MEDICATION LOGIC
// ---------------------------------------------------------

function handleVoiceLogic(text) {
    const lower = text.toLowerCase();

    if (lower.includes("yes")) {
        botSpeak("Okay. Please list the medications you're currently taking.");
        return;
    }

    if (lower.includes("no")) {
        botSpeak("Understood. Moving to the next question.");
        return;
    }

    botSpeak("Thank you. I recorded your response.");
}



// ---------------------------------------------------------
// GUIDED TOUR
// ---------------------------------------------------------

const tourSteps = [
    { selector: "#btnStart", text: "This begins the intake session." },
    { selector: "#btnPause", text: "This pauses the session." },
    { selector: "#btnFinish", text: "This ends the session." },
    { selector: "#btnRepeat", text: "This repeats the last question." },
    { selector: "#btnSkip", text: "This skips the current question." },
    { selector: "#btnReset", text: "This resets the entire session." },
    { selector: "#btnAbout", text: "This shows information about the prototype." }
];

let tourIndex = 0;

document.getElementById("btnTour").addEventListener("click", startTour);
document.getElementById("tourNext").addEventListener("click", nextTourStep);
document.getElementById("tourSkip").addEventListener("click", endTour);

function startTour() {
    tourIndex = 0;
    document.getElementById("tourOverlay").style.display = "block";
    document.getElementById("tourTooltip").style.display = "block";
    document.getElementById("tourArrow").style.display = "block";
    document.getElementById("tourControls").style.display = "flex";
    showTourStep();
}

function nextTourStep() {
    tourIndex++;
    if (tourIndex >= tourSteps.length) {
        endTour();
        return;
    }
    showTourStep();
}

function endTour() {
    document.getElementById("tourOverlay").style.display = "none";
    document.getElementById("tourTooltip").style.display = "none";
    document.getElementById("tourArrow").style.display = "none";
    document.getElementById("tourControls").style.display = "none";
}

function showTourStep() {
    const step = tourSteps[tourIndex];
    const element = document.querySelector(step.selector);
    const rect = element.getBoundingClientRect();

    const tooltip = document.getElementById("tourTooltip");
    const arrow = document.getElementById("tourArrow");

    tooltip.innerHTML = step.text;

    tooltip.style.top = rect.top + window.scrollY - 70 + "px";
    tooltip.style.left = rect.left + window.scrollX + "px";

    arrow.style.top = rect.bottom + window.scrollY + 8 + "px";
    arrow.style.left = rect.left + (rect.width / 2) - 12 + window.scrollX + "px";
}



// ---------------------------------------------------------
// BASIC BUTTON ACTIONS
// ---------------------------------------------------------

document.getElementById("btnStart").addEventListener("click", () => {
    userSpeak("Start");
    botSpeak("Beginning the intake session.");
});

document.getElementById("btnPause").addEventListener("click", () => {
    userSpeak("Pause");
    botSpeak("Pausing the session.");
});

document.getElementById("btnFinish").addEventListener("click", () => {
    userSpeak("Finish");
    botSpeak("Ending the session.");
});

document.getElementById("btnRepeat").addEventListener("click", () => {
    userSpeak("Repeat");
    botSpeak("Repeating the last question.");
});

document.getElementById("btnSkip").addEventListener("click", () => {
    userSpeak("Skip");
    botSpeak("Skipping this question.");
});

document.getElementById("btnReset").addEventListener("click", () => {
    userSpeak("Reset");
    botSpeak("Resetting the session.");
});
