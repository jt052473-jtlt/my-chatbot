/* ------------------------------------------------------
   GLOBAL STATE
------------------------------------------------------ */
let currentLanguage = "English";
let currentForm = "admission";
let currentQuestionIndex = 0;
let isVoiceMode = false;
let isReadAloud = false;

/* ------------------------------------------------------
   INITIALIZATION
------------------------------------------------------ */
window.onload = function () {
    initLanguageSelector();
    initFormSelector();
    initButtons();
    initDemoOverlay();
    initTourButtons();
    initMic(); // from mic.js
    updateUIText();
};

/* ------------------------------------------------------
   LANGUAGE SELECTOR
------------------------------------------------------ */
function initLanguageSelector() {
    const langSelect = document.getElementById("languageSelect");
    const introLangSelect = document.getElementById("introLanguageSelect");

    const languages = ["English", "Spanish", "Chinese", "Hindi", "Russian"];

    languages.forEach(lang => {
        let opt1 = document.createElement("option");
        opt1.value = lang;
        opt1.textContent = lang;
        langSelect.appendChild(opt1);

        let opt2 = document.createElement("option");
        opt2.value = lang;
        opt2.textContent = lang;
        introLangSelect.appendChild(opt2);
    });

    langSelect.value = currentLanguage;
    introLangSelect.value = currentLanguage;

    langSelect.addEventListener("change", () => {
        currentLanguage = langSelect.value;
        updateUIText();
    });

    introLangSelect.addEventListener("change", () => {
        currentLanguage = introLangSelect.value;
        updateUIText();
    });
}

/* ------------------------------------------------------
   FORM SELECTOR
------------------------------------------------------ */
function initFormSelector() {
    const formSelect = document.getElementById("formSelect");

    formSelect.addEventListener("change", () => {
        currentForm = formSelect.value;
        currentQuestionIndex = 0;
        startForm();
    });
}

/* ------------------------------------------------------
   BUTTONS
------------------------------------------------------ */
function initButtons() {
    document.getElementById("startBtn").onclick = startForm;
    document.getElementById("pauseBtn").onclick = pauseForm;
    document.getElementById("finishBtn").onclick = finishForm;
    document.getElementById("repeatBtn").onclick = repeatQuestion;
    document.getElementById("skipBtn").onclick = skipQuestion;
    document.getElementById("resetBtn").onclick = resetForm;
    document.getElementById("sendBtn").onclick = sendUserMessage;

    // ENTER KEY SUPPORT
    document.getElementById("userInput").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("sendBtn").click();
        }
    });

    // Toggles
    document.getElementById("voiceModeToggle").addEventListener("change", (e) => {
        isVoiceMode = e.target.checked;
    });

    document.getElementById("readAloudToggle").addEventListener("change", (e) => {
        isReadAloud = e.target.checked;
    });
}

/* ------------------------------------------------------
   DEMO OVERLAY
------------------------------------------------------ */
function initDemoOverlay() {
    document.getElementById("startDemoBtn").onclick = () => {
        document.getElementById("demoOverlay").style.display = "none";
        startForm();
    };

    document.getElementById("introExitBtn").onclick = () => {
        document.getElementById("demoOverlay").style.display = "none";
    };
}

/* ------------------------------------------------------
   TOUR BUTTONS
------------------------------------------------------ */
function initTourButtons() {
    document.getElementById("tourExitBtn").onclick = () => {
        document.getElementById("tourOverlay").classList.add("hidden");
        document.getElementById("tourTooltip").classList.add("hidden");
    };

    document.getElementById("tourNextBtn").onclick = () => {
        nextTourStep();
    };
}

/* ------------------------------------------------------
   CHAT + FORM LOGIC
------------------------------------------------------ */
function startForm() {
    const questions = forms[currentForm][currentLanguage];
    currentQuestionIndex = 0;
    showMessage("assistant", questions[currentQuestionIndex]);
    updateProgress();
}

function pauseForm() {
    showMessage("assistant", "Form paused.");
}

function finishForm() {
    showMessage("assistant", "Form completed.");
}

function repeatQuestion() {
    const questions = forms[currentForm][currentLanguage];
    showMessage("assistant", questions[currentQuestionIndex]);
}

function skipQuestion() {
    const questions = forms[currentForm][currentLanguage];
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        finishForm();
        return;
    }

    showMessage("assistant", questions[currentQuestionIndex]);
    updateProgress();
}

function resetForm() {
    currentQuestionIndex = 0;
    startForm();
}

function sendUserMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    showMessage("user", text);
    input.value = "";

    skipQuestion();
}

/* ------------------------------------------------------
   CHAT WINDOW
------------------------------------------------------ */
function showMessage(sender, text) {
    const chat = document.getElementById("chatWindow");
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "assistant-message";
    bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

/* ------------------------------------------------------
   PROGRESS BAR
------------------------------------------------------ */
function updateProgress() {
    const questions = forms[currentForm][currentLanguage];
    const percent = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.updateUIText = updateUIText;
