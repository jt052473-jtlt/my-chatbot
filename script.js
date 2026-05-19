/* ------------------------------------------------------
   GLOBAL STATE
------------------------------------------------------ */
let currentLanguage = "English";
let currentStep = 0;
let isPaused = false;

/* ------------------------------------------------------
   DOM READY
------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------
       ELEMENTS
    ------------------------------------------------------ */
    const chatWindow = document.getElementById("chatWindow");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    const introLang = document.getElementById("introLanguageSelect");
    const mainLang = document.getElementById("languageSelect");

    const startDemoBtn = document.getElementById("startDemoBtn");
    const exitDemoBtn = document.getElementById("introExitBtn");

    /* ------------------------------------------------------
       LANGUAGE SYNC
    ------------------------------------------------------ */
    introLang.addEventListener("change", () => {
        currentLanguage = introLang.value;
        mainLang.value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    mainLang.addEventListener("change", () => {
        currentLanguage = mainLang.value;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    });

    /* ------------------------------------------------------
       SEND BUTTON — FIXED
    ------------------------------------------------------ */
    sendBtn.onclick = () => {
        const text = userInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        userInput.value = "";

        if (typeof processUserResponse === "function") {
            processUserResponse(text);
        }
    };

    /* ------------------------------------------------------
       ENTER KEY — FIXED
    ------------------------------------------------------ */
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    });

    /* ------------------------------------------------------
       START DEMO
    ------------------------------------------------------ */
    startDemoBtn.addEventListener("click", () => {
        document.getElementById("demoOverlay").style.display = "none";

        currentLanguage = introLang.value;
        mainLang.value = currentLanguage;

        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
        if (typeof showQuestion === "function") showQuestion();
        if (typeof startTour === "function") startTour();
    });

    exitDemoBtn.addEventListener("click", () => {
        document.getElementById("demoOverlay").style.display = "none";
    });

});

/* ------------------------------------------------------
   CHAT HELPERS
------------------------------------------------------ */
function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}
