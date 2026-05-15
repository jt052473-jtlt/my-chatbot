// -----------------------------------------
// GUIDED TOUR — CLEAN + FLUENT STYLE
// -----------------------------------------

let tourStep = 0;

const tourSteps = [
    {
        title: "Welcome",
        text: "This guided tour will show you how to use the Clinical Intake Assistant."
    },
    {
        title: "Language Selection",
        text: "Choose your preferred language here. You can also search for a language."
    },
    {
        title: "Form Selection",
        text: "Select which intake form you want to use, such as Admission or Sleep."
    },
    {
        title: "Voice Controls",
        text: "Enable Read Aloud or Voice Mode. The mic button activates speech input."
    },
    {
        title: "Chat Window",
        text: "This is where the conversation appears. Your answers and system prompts show here."
    },
    {
        title: "Controls",
        text: "Use Start, Pause, Finish, Repeat, Skip, and Reset to control the interview."
    },
    {
        title: "You're Ready!",
        text: "That's the end of the tour. You're ready to begin using the assistant."
    }
];

// -----------------------------------------
// SHOW TOUR STEP
// -----------------------------------------
function showTourStep() {
    const tooltip = document.getElementById("tourTooltip");

    tooltip.querySelector("#tourTitle").textContent = tourSteps[tourStep].title;
    tooltip.querySelector("#tourText").textContent = tourSteps[tourStep].text;

    showTourTooltip();
}

// -----------------------------------------
// START TOUR
// -----------------------------------------
function startTour() {
    tourStep = 0;
    showTourStep();
}

// -----------------------------------------
// NEXT STEP
// -----------------------------------------
document.getElementById("tourNextBtn").addEventListener("click", () => {
    tourStep++;

    if (tourStep >= tourSteps.length) {
        endTour();
        return;
    }

    showTourStep();
});

// -----------------------------------------
// EXIT TOUR
// -----------------------------------------
document.getElementById("tourExitBtn").addEventListener("click", () => {
    endTour();
});

// -----------------------------------------
// END TOUR
// -----------------------------------------
function endTour() {
    hideTourTooltip();
    tourStep = 0;
}
