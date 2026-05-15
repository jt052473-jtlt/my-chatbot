// -----------------------------------------
// UI CONTROLLER — CLEAN + FLUENT STYLE
// -----------------------------------------

// Update progress bar width
function updateProgressBar(percent) {
    const bar = document.getElementById("progressBar");
    bar.style.width = percent + "%";
}

// Clear chat window
function clearChat() {
    const chat = document.getElementById("chatWindow");
    chat.innerHTML = "";
}

// Add bot message (used by other files)
function addBotMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "bot-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Add user message (used by script.js)
function addUserMessage(text) {
    const chat = document.getElementById("chatWindow");
    const div = document.createElement("div");
    div.className = "user-message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Disable all control buttons
function disableControls() {
    document.getElementById("startBtn").disabled = true;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("finishBtn").disabled = true;
    document.getElementById("repeatBtn").disabled = true;
    document.getElementById("skipBtn").disabled = true;
}

// Enable all control buttons
function enableControls() {
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("finishBtn").disabled = false;
    document.getElementById("repeatBtn").disabled = false;
    document.getElementById("skipBtn").disabled = false;
}

// Reset UI to default state
function resetUI() {
    clearChat();
    updateProgressBar(0);

    // Reset mic + voice mode
    const mic = document.getElementById("micBtn");
    const toggle = document.getElementById("voiceModeToggle");

    mic.classList.remove("active");
    toggle.checked = false;

    enableControls();
}

// Show demo overlay
function showDemoOverlay() {
    document.getElementById("demoOverlay").style.display = "flex";
}

// Hide demo overlay
function hideDemoOverlay() {
    document.getElementById("demoOverlay").style.display = "none";
}

// Show guided tour tooltip
function showTourTooltip() {
    document.getElementById("tourTooltip").classList.remove("hidden");
    document.getElementById("tourOverlay").classList.remove("hidden");
}

// Hide guided tour tooltip
function hideTourTooltip() {
    document.getElementById("tourTooltip").classList.add("hidden");
    document.getElementById("tourOverlay").classList.add("hidden");
}
