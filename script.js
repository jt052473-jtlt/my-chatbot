document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const chatWindow = document.getElementById("chatWindow");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const progressBar = document.getElementById("progressBar");

    const demoOverlay = document.getElementById("demoOverlay");
    const startDemoBtn = document.getElementById("startDemoBtn");

    const tourOverlay = document.getElementById("tourOverlay");
    const tourTooltip = document.getElementById("tourTooltip");
    const tourTitle = document.getElementById("tourTitle");
    const tourText = document.getElementById("tourText");
    const tourNextBtn = document.getElementById("tourNextBtn");
    const tourExitBtn = document.getElementById("tourExitBtn");

    const controlsEl = document.querySelector(".control-buttons");
    const inputAreaEl = document.querySelector(".input-area");

    // Tour steps
    let tourStep = 0;

    const tourSteps = [
        {
            title: "Welcome",
            text: "This is your Sleep Intake Assistant. It guides patients through structured clinical intake.",
            element: null
        },
        {
            title: "Progress Bar",
            text: "This bar fills as the patient answers questions.",
            element: progressBar
        },
        {
            title: "Chat Window",
            text: "All patient interactions appear here.",
            element: chatWindow
        },
        {
            title: "Controls",
            text: "These buttons manage the intake flow.",
            element: controlsEl,
            lowerTooltip: true
        },
        {
            title: "Input Box",
            text: "Patients can type responses here.",
            element: inputAreaEl
        }
    ];

    // Tooltip positioning
    function positionTooltip(target) {
        if (!target) {
            tourTooltip.style.top = "50%";
            tourTooltip.style.left = "50%";
            tourTooltip.style.transform = "translate(-50%, -50%)";
            return;
        }

        const rect = target.getBoundingClientRect();
        const tooltipHeight = tourTooltip.offsetHeight;

        let top = rect.top - tooltipHeight - 10;
        if (top < 10) {
            top = rect.bottom + 10;
        }

        tourTooltip.style.top = `${top}px`;
        tourTooltip.style.left = `${rect.left}px`;
        tourTooltip.style.transform = "translateX(0)";
    }

    function applyTooltipLower(apply) {
        if (apply) {
            tourTooltip.classList.add("tooltip-lower");
        } else {
            tourTooltip.classList.remove("tooltip-lower");
        }
    }

    function showTourStep() {
        const step = tourSteps[tourStep];
        tourTitle.textContent = step.title;
        tourText.textContent = step.text;
        applyTooltipLower(step.lowerTooltip === true);
        positionTooltip(step.element);
    }

    // Demo start
    startDemoBtn.addEventListener("click", () => {
        demoOverlay.style.display = "none";
        tourOverlay.classList.remove("hidden");
        tourStep = 0;
        showTourStep();
    });

    // Tour next
    tourNextBtn.addEventListener("click", () => {
        tourStep++;
        if (tourStep >= tourSteps.length) {
            tourOverlay.classList.add("hidden");
            return;
        }
        showTourStep();
    });

    // Tour exit
    tourExitBtn.addEventListener("click", () => {
        tourOverlay.classList.add("hidden");
    });

    // Basic chat
    function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = sender === "bot" ? "bot-message" : "user-message";
        msg.textContent = text;
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    sendBtn.addEventListener("click", () => {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage("user", text);
        userInput.value = "";
    });

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendBtn.click();
        }
    });
});
