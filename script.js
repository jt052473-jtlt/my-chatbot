document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       ELEMENT REFERENCES
    ============================================================ */
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

    const languageSelect = document.getElementById("languageSelect");
    const languageSearch = document.getElementById("languageSearch");

    /* ============================================================
       LANGUAGE LIST — TOP 5 USA LANGUAGES
    ============================================================ */
    const languages = [
        { code: "en-US", name: "English" },
        { code: "es-US", name: "Spanish" },
        { code: "zh",    name: "Chinese" },
        { code: "tl",    name: "Tagalog" },
        { code: "vi",    name: "Vietnamese" }
    ];

    function loadLanguages() {
        languageSelect.innerHTML = "";

        languages.forEach(lang => {
            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.name;
            languageSelect.appendChild(option);
        });

        // Default to English
        languageSelect.value = "en-US";
    }

    loadLanguages();

    /* ============================================================
       LANGUAGE SEARCH FILTER
    ============================================================ */
    languageSearch.addEventListener("input", () => {
        const query = languageSearch.value.toLowerCase();
        languageSelect.innerHTML = "";

        languages
            .filter(lang => lang.name.toLowerCase().includes(query))
            .forEach(lang => {
                const option = document.createElement("option");
                option.value = lang.code;
                option.textContent = lang.name;
                languageSelect.appendChild(option);
            });
    });

    /* ============================================================
       CHAT SYSTEM
    ============================================================ */
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

    /* ============================================================
       CHAT-BASED GUIDED TOUR (NO TOOLTIP MOVEMENT)
    ============================================================ */
    let tourStep = 0;

    const tourSteps = [
        {
            title: "Welcome",
            text: "This is your Sleep Intake Assistant. It guides patients through a structured clinical intake."
        },
        {
            title: "Progress Bar",
            text: "The progress bar below the language row fills as the patient answers questions."
        },
        {
            title: "Chat Window",
            text: "This fixed chat window in the center shows all instructions and patient responses."
        },
        {
            title: "Controls",
            text: "The control buttons manage the intake flow: start, pause, finish, repeat, skip, and reset."
        },
        {
            title: "Input Box",
            text: "Patients type their responses in the input box at the bottom and click Send or press Enter."
        }
    ];

    function showTourStepInChat() {
        const step = tourSteps[tourStep];
        if (!step) return;
        addMessage("bot", `${step.title}: ${step.text}`);
    }

    /* Demo start: hide overlay, show tour overlay, start chat tour */
    startDemoBtn.addEventListener("click", () => {
        demoOverlay.style.display = "none";
        tourOverlay.classList.remove("hidden");

        // Clear chat and start fresh tour
        chatWindow.innerHTML = "";
        tourStep = 0;
        showTourStepInChat();

        // Optional: small label in the tour panel
        tourTitle.textContent = "Guided Tour";
        tourText.textContent = "Follow the instructions in the chat window. Use Next to continue or Exit to stop.";
    });

    /* Tour next: advance chat-based steps */
    tourNextBtn.addEventListener("click", () => {
        tourStep++;
        if (tourStep >= tourSteps.length) {
            tourOverlay.classList.add("hidden");
            return;
        }
        showTourStepInChat();
    });

    /* Tour exit: just hide overlay, chat stays as-is */
    tourExitBtn.addEventListener("click", () => {
        tourOverlay.classList.add("hidden");
    });

    /* ============================================================
       OPTIONAL: INITIAL BOT MESSAGE (OUTSIDE TOUR)
    ============================================================ */
    addMessage(
        "bot",
        "Welcome to the Sleep Intake Assistant. Click 'Start Demo' to see a guided tour, or begin interacting anytime."
    );
});
