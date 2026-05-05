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
       GUIDED TOUR — FLOATING TOOLTIP VERSION
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

    function showTourStep() {
        const step = tourSteps[tourStep];
        if (!step) return;

        tourTitle.textContent = step.title;
        tourText.textContent = step.text;

        tourTooltip.classList.remove("hidden");
    }

    /* ============================================================
       START DEMO
    ============================================================ */
    startDemoBtn.addEventListener("click", () => {
        demoOverlay.style.display = "none";

        // Dim background
        tourOverlay.classList.remove("hidden");

        // Reset chat
        chatWindow.innerHTML = "";

        // Start tour
        tourStep = 0;
        showTourStep();
    });

    /* ============================================================
       NEXT STEP
    ============================================================ */
    tourNextBtn.addEventListener("click", () => {
        tourStep++;

        if (tourStep >= tourSteps.length) {
            tourTooltip.classList.add("hidden");
            tourOverlay.classList.add("hidden");
            return;
        }

        showTourStep();
    });

    /* ============================================================
       EXIT TOUR
    ============================================================ */
    tourExitBtn.addEventListener("click", () => {
        tourTooltip.classList.add("hidden");
        tourOverlay.classList.add("hidden");
    });

    /* ============================================================
       INITIAL BOT MESSAGE
    ============================================================ */
    addMessage(
        "bot",
        "Welcome to the Sleep Intake Assistant. Click 'Start Demo' to see a guided tour, or begin interacting anytime."
    );
});
