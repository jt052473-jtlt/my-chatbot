let currentLanguage = "English";
let currentStep = 0;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Dropdowns
    const langs = ["English", "Spanish", "Chinese", "Hindi", "Russian"];
    const introSelect = document.getElementById("introLanguageSelect");
    const mainSelect = document.getElementById("languageSelect");

    if (introSelect && mainSelect) {
        [introSelect, mainSelect].forEach(s => {
            s.innerHTML = "";
            langs.forEach(l => s.add(new Option(l, l)));
            s.value = currentLanguage;
        });
    }

    // 2. Setup Listeners
    document.getElementById("startDemoBtn").onclick = startDemo;
    document.getElementById("sendBtn").onclick = handleInput;
    document.getElementById("userInput").onkeypress = (e) => { if (e.key === "Enter") handleInput(); };
    
    // Sync Language Changes
    introSelect.onchange = (e) => {
        currentLanguage = e.target.value;
        mainSelect.value = currentLanguage;
        if (typeof updateUIForLanguage === "function") updateUIForLanguage();
    };
});

function startDemo() {
    document.getElementById("demoOverlay").style.display = "none";
    // Trigger the actual intake flow
    if (typeof showQuestion === "function") showQuestion();
    // Trigger the tutorial
    if (typeof startTour === "function") startTour();
}

function handleInput() {
    const field = document.getElementById("userInput");
    const val = field.value.trim();
    if (val !== "") {
        if (typeof addUserMessage === "function") addUserMessage(val);
        field.value = "";
        if (typeof processUserResponse === "function") processUserResponse(val);
    }
}
