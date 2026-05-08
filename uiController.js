// ------------------------------------------------------
// UI CONTROLLER
// Centralizes all UI updates for language switching,
// labels, buttons, placeholders, and titles.
// ------------------------------------------------------

function updateUIForLanguage() {
    const lang = translations[currentLanguage];
    if (!lang || !lang.ui) return;

    // App title
    const header = document.querySelector(".app-header h2");
    if (header) header.textContent = lang.ui.appTitle;

    // Buttons
    setText("startBtn", lang.ui.start);
    setText("pauseBtn", lang.ui.pause);
    setText("finishBtn", lang.ui.finish);
    setText("repeatBtn", lang.ui.repeat);
    setText("skipBtn", lang.ui.skip);
    setText("resetBtn", lang.ui.reset);
    setText("sendBtn", lang.ui.send);

    // Input placeholder
    const input = document.getElementById("userInput");
    if (input) input.placeholder = lang.ui.typeHere;

    // Toggles
    updateToggleLabel("readAloudToggle", lang.ui.readAloud);
    updateToggleLabel("voiceModeToggle", lang.ui.voiceMode);
}

// Helper to set button text
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// Helper to update toggle labels
function updateToggleLabel(toggleId, labelText) {
    const toggle = document.getElementById(toggleId);
    if (!toggle) return;

    const label = toggle.parentElement.querySelector("span");
    if (label) label.textContent = labelText;
}

// Expose globally
window.updateUIForLanguage = updateUIForLanguage;
