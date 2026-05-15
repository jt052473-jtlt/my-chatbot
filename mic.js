// -----------------------------------------
// MIC.JS — COPILOT FLUENT BLUE MIC CONTROLLER
// -----------------------------------------

let micActive = false;

// Get elements
const micBtn = document.getElementById("micBtn");
const voiceModeToggle = document.getElementById("voiceModeToggle");

// -----------------------------------------
// TOGGLE MIC (manual click)
// -----------------------------------------
micBtn.addEventListener("click", () => {
    if (micActive) {
        deactivateMic();
    } else {
        activateMic();
    }
});

// -----------------------------------------
// ACTIVATE MIC
// -----------------------------------------
function activateMic() {
    micActive = true;

    // UI update
    micBtn.classList.add("active");
    voiceModeToggle.checked = true;

    // Start listening
    if (typeof startListening === "function") {
        startListening();
    }
}

// -----------------------------------------
// DEACTIVATE MIC
// -----------------------------------------
function deactivateMic() {
    micActive = false;

    // UI update
    micBtn.classList.remove("active");
    voiceModeToggle.checked = false;

    // Stop listening
    if (typeof stopListening === "function") {
        stopListening();
    }
}

// -----------------------------------------
// VOICE MODE CHECKBOX
// -----------------------------------------
voiceModeToggle.addEventListener("change", () => {
    if (voiceModeToggle.checked) {
        activateMic();
    } else {
        deactivateMic();
    }
});

// -----------------------------------------
// EXTERNAL CONTROL (optional)
// -----------------------------------------
function micOffFromOutside() {
    deactivateMic();
}

function micOnFromOutside() {
    activateMic();
}
