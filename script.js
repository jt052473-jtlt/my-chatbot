document.addEventListener("DOMContentLoaded", () => {

    /* ELEMENTS */
    const demoOverlay = document.getElementById("demoOverlay");
    const startDemoBtn = document.getElementById("startDemoBtn");

    const tourOverlay = document.getElementById("tourOverlay");
    const tourTooltip = document.getElementById("tourTooltip");
    const tourTitle = document.getElementById("tourTitle");
    const tourText = document.getElementById("tourText");
    const tourNextBtn = document.getElementById("tourNextBtn");
    const tourExitBtn = document.getElementById("tourExitBtn");

    const chatWindow = document.getElementById("chatWindow");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    /* CHAT SYSTEM */
    function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.textContent = sender + ": " + text;
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    sendBtn.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage("You", text);
        userInput.value = "";
    });

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });

    /* FULL GUIDED TOUR STEPS */
    let tourStep = 0;

    const tourSteps = [
        { title: "Welcome", text: "This is Sam, your Sleep Intake Assistant. Let’s take a quick tour." },
        { title: "Chat Window", text: "All conversation with Sam appears here in the chat window." },
        { title: "Input Box", text: "Type your responses here and press Send to continue." },
        { title: "Start Button", text: "Start begins the intake process and moves Sam to the first question." },
        { title: "Pause Button", text: "Pause temporarily stops the intake if the patient needs a moment." },
        { title: "Finish Button", text: "Finish ends the intake early and moves to summary mode." },
        { title: "Repeat Button", text: "Repeat makes Sam repeat the last question or message." },
        { title: "Skip Button", text: "Skip moves past the current question if the patient cannot answer it." },
        { title: "Reset Button", text: "Reset clears the entire intake and starts over from the beginning." },
        { title: "Progress Bar", text: "This bar shows how far along the patient is in the intake process." },
        { title: "Language Select", text: "Choose the patient’s preferred language from this dropdown." },
        { title: "Language Search", text: "Use this search box to quickly find a language by typing its name." },
        { title: "Voice Mode", text: "Voice Mode allows the patient to speak their responses instead of typing." },
        { title: "Read Aloud", text: "When enabled, Sam will read questions and messages out loud." },
        { title: "Microphone Button", text: "Tap the microphone to begin voice input when Voice Mode is enabled." },
        { title: "Tour Complete", text: "That’s the full overview. You’re ready to begin the intake with Sam!" }
    ];

    function showTourStep() {
        const step = tourSteps[tourStep];
        tourTitle.textContent = step.title;
        tourText.textContent = step.text;
        tourTooltip.classList.remove("hidden");
    }

    /* START DEMO */
    startDemoBtn.addEventListener("click", () => {
        demoOverlay.classList.add("hidden");
        tourOverlay.classList.remove("hidden");

        tourStep = 0;
        showTourStep();
    });

    /* NEXT */
    tourNextBtn.addEventListener("click", () => {
        tourStep++;

        if (tourStep >= tourSteps.length) {
            tourTooltip.classList.add("hidden");
            tourOverlay.classList.add("hidden");
            return;
        }

        showTourStep();
    });

    /* EXIT */
    tourExitBtn.addEventListener("click", () => {
        tourTooltip.classList.add("hidden");
        tourOverlay.classList.add("hidden");
    });

    /* INITIAL MESSAGE */
    addMessage("Sam", "Welcome! Click Start Demo to begin.");
});
