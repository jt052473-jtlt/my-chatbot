document.addEventListener("DOMContentLoaded", () => {

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

    /* ---------------------------
       Chat system
    ----------------------------*/
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

    /* ---------------------------
       Guided Tour Steps
    ----------------------------*/
    let tourStep = 0;

    const tourSteps = [
        { title: "Welcome", text: "This is the Sleep Intake Assistant demo." },
        { title: "Chat Window", text: "All messages appear here in the chat window." },
        { title: "Input Box", text: "Type your response below and press Send." }
    ];

    function showTourStep() {
        const step = tourSteps[tourStep];
        tourTitle.textContent = step.title;
        tourText.textContent = step.text;
        tourTooltip.classList.remove("hidden");
    }

    /* ---------------------------
       Start Demo Button
    ----------------------------*/
    startDemoBtn.addEventListener("click", () => {
        demoOverlay.classList.add("hidden");
        tourOverlay.classList.remove("hidden");

        tourStep = 0;
        showTourStep();
    });

    /* ---------------------------
       Next Step
    ----------------------------*/
    tourNextBtn.addEventListener("click", () => {
        tourStep++;

        if (tourStep >= tourSteps.length) {
            tourTooltip.classList.add("hidden");
            tourOverlay.classList.add("hidden");
            return;
        }

        showTourStep();
    });

    /* ---------------------------
       Exit Tour
    ----------------------------*/
    tourExitBtn.addEventListener("click", () => {
        tourTooltip.classList.add("hidden");
        tourOverlay.classList.add("hidden");
    });

    /* ---------------------------
       Initial Bot Message
    ----------------------------*/
    addMessage("Bot", "Welcome! Click Start Demo to begin.");
});
