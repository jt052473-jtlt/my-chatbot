/* ------------------------------------------------------
   MAIN SCRIPT — Language, Form, Chat, Tour Refresh
------------------------------------------------------ */

let currentLanguage = "English";
let currentForm = "admission";
let currentStep = 0;

window.onload = () => {
    populateLanguageSelect();
    populateFormSelect();
    updateUIText();
    updateIntroText();
    updateTourButtons();
};

function populateLanguageSelect() {
    const langSelect = document.getElementById("languageSelect");
    const introLangSelect = document.getElementById("introLanguageSelect");

    Object.keys(translations).forEach(lang => {
        langSelect.add(new Option(lang, lang));
        introLangSelect.add(new Option(lang, lang));
    });

    langSelect.value = currentLanguage;
    introLangSelect.value = currentLanguage;
}

function populateFormSelect() {
    document.getElementById("formSelect").value = currentForm;
}

function updateIntroText() {
    const t = translations[currentLanguage];

    document.querySelector("#demoOverlay h2").textContent = t.introTitle;
    document.querySelector("#demoOverlay p").textContent = t.introDesc;
    document.querySelector("label[for='introLanguageSelect']").textContent = t.introLanguage;
    document.getElementById("startDemoBtn").textContent = t.introStart;
    document.getElementById("introExitBtn").textContent = t.introExit;
}

function updateTourButtons() {
    const t = translations[currentLanguage];
    document.getElementById("tourNextBtn").textContent = t.tourNext;
    document.getElementById("tourExitBtn").textContent = t.tourExit;
}

document.getElementById("introLanguageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    document.getElementById("languageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();
    updateTourButtons();

    if (!document.getElementById("tourOverlay").classList.contains("hidden")) {
        loadTourStep();
    }
});

document.getElementById("languageSelect").addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    document.getElementById("introLanguageSelect").value = currentLanguage;

    updateUIText();
    updateIntroText();
    updateTourButtons();

    if (!document.getElementById("tourOverlay").classList.contains("hidden")) {
        loadTourStep();
    }
});
