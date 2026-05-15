/* ------------------------------------------------------
   UI CONTROLLER — Handles all UI text + language updates
------------------------------------------------------ */

function updateUIText() {
    const t = translations[currentLanguage];

    // Buttons
    document.getElementById("startBtn").textContent = t.start;
    document.getElementById("pauseBtn").textContent = t.pause;
    document.getElementById("finishBtn").textContent = t.finish;
    document.getElementById("repeatBtn").textContent = t.repeat;
    document.getElementById("skipBtn").textContent = t.skip;
    document.getElementById("resetBtn").textContent = t.reset;
    document.getElementById("sendBtn").textContent = t.send;

    // Toggles
    document.querySelector("label[for='readAloudToggle'] span").textContent = t.readAloud;
    document.querySelector("label[for='voiceModeToggle'] span").textContent = t.voiceMode;

    // Form selector translations
    const formSelect = document.getElementById("formSelect");

    formSelect.options[0].textContent =
        currentLanguage === "Spanish" ? "Formulario de admisión" :
        currentLanguage === "Chinese" ? "入院表" :
        currentLanguage === "Hindi" ? "प्रवेश फ़ॉर्म" :
        currentLanguage === "Russian" ? "Форма поступления" :
        "Admission Form";

    formSelect.options[1].textContent =
        currentLanguage === "Spanish" ? "Formulario de sueño" :
        currentLanguage === "Chinese" ? "睡眠表" :
        currentLanguage === "Hindi" ? "नींद फ़ॉर्म" :
        currentLanguage === "Russian" ? "Форма сна" :
        "Sleep Form";

    // Search language placeholder
    document.getElementById("languageSearch").placeholder =
        currentLanguage === "Spanish" ? "Buscar idioma..." :
        currentLanguage === "Chinese" ? "搜索语言..." :
        currentLanguage === "Hindi" ? "भाषा खोजें..." :
        currentLanguage === "Russian" ? "Поиск языка..." :
        "Search language...";

    // Chat input placeholder
    document.getElementById("userInput").placeholder =
        currentLanguage === "Spanish" ? "Escriba su respuesta aquí..." :
        currentLanguage === "Chinese" ? "在此输入您的回答..." :
        currentLanguage === "Hindi" ? "अपना उत्तर यहाँ लिखें..." :
        currentLanguage === "Russian" ? "Введите свой ответ здесь..." :
        "Type your response here...";
}

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.updateUIText = updateUIText;
