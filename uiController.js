/* ------------------------------------------------------
   UI CONTROLLER — Handles all UI text + language updates
   (FIXED: uses innerText instead of textContent so event
   listeners are NOT destroyed)
------------------------------------------------------ */

function updateUIText() {
    const t = translations[currentLanguage];

    // Buttons (SAFE)
    document.getElementById("startBtn").innerText = t.start;
    document.getElementById("pauseBtn").innerText = t.pause;
    document.getElementById("finishBtn").innerText = t.finish;
    document.getElementById("repeatBtn").innerText = t.repeat;
    document.getElementById("skipBtn").innerText = t.skip;
    document.getElementById("resetBtn").innerText = t.reset;
    document.getElementById("sendBtn").innerText = t.send;

    // Toggles (SAFE)
    document.querySelector("label[for='readAloudToggle'] span").innerText = t.readAloud;
    document.querySelector("label[for='voiceModeToggle'] span").innerText = t.voiceMode;

    // Form selector translations (SAFE)
    const formSelect = document.getElementById("formSelect");

    formSelect.options[0].innerText =
        currentLanguage === "Spanish" ? "Formulario de admisión" :
        currentLanguage === "Chinese" ? "入院表" :
        currentLanguage === "Hindi" ? "प्रवेश फ़ॉर्म" :
        currentLanguage === "Russian" ? "Форма поступления" :
        "Admission Form";

    formSelect.options[1].innerText =
        currentLanguage === "Spanish" ? "Formulario de sueño" :
        currentLanguage === "Chinese" ? "睡眠表" :
        currentLanguage === "Hindi" ? "नींद फ़ॉर्म" :
        currentLanguage === "Russian" ? "Форма сна" :
        "Sleep Form";

    // Search language placeholder (SAFE)
    document.getElementById("languageSearch").placeholder =
        currentLanguage === "Spanish" ? "Buscar idioma..." :
        currentLanguage === "Chinese" ? "搜索语言..." :
        currentLanguage === "Hindi" ? "भाषा खोजें..." :
        currentLanguage === "Russian" ? "Поиск языка..." :
        "Search language...";

    // Chat input placeholder (SAFE)
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
