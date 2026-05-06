// ======================================================
// Guided Tour (Multilingual)
// Pulls all text from translations.js based on currentLanguage
// ======================================================

let tour = null;

function startGuidedTour() {
    if (!currentLanguage || !translations[currentLanguage]) {
        currentLanguage = "en";
    }

    const t = translations[currentLanguage];

    // Apply RTL if needed
    document.body.dir = t.direction || "ltr";

    // Build steps dynamically from translations.js
    const steps = t.tourSteps.map((stepText, index) => {
        return {
            title: t.demoTitle,
            text: stepText,
            attachTo: getTourAttachment(index),
            buttons: getTourButtons(index, t)
        };
    });

    // Initialize Shepherd tour
    tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: { enabled: true },
            classes: "shepherd-theme-default",
            scrollTo: false
        }
    });

    steps.forEach(step => tour.addStep(step));

    tour.start();
}

// ======================================================
// Attach each step to the correct UI element
// ======================================================
function getTourAttachment(index) {
    switch (index) {
        case 0: return { element: "#appTitle", on: "bottom" };
        case 1: return { element: "#chatWindow", on: "top" };
        case 2: return { element: "#inputArea", on: "top" };
        case 3: return { element: "#voiceBtn", on: "bottom" };
        case 4: return { element: "#readAloudBtn", on: "bottom" };
        case 5: return { element: "#startDemoBtn", on: "bottom" };
        default: return null;
    }
}

// ======================================================
// Build multilingual buttons for each step
// ======================================================
function getTourButtons(index, t) {
    const buttons = [];

    // Back button (except first step)
    if (index > 0) {
        buttons.push({
            text: t.skipDemoBtn, // natural translation
            action() { tour.back(); }
        });
    }

    // Next button (except last step)
    if (index < t.tourSteps.length - 1) {
        buttons.push({
            text: t.startDemoBtn, // natural translation
            action() { tour.next(); }
        });
    }

    // Finish button (last step)
    if (index === t.tourSteps.length - 1) {
        buttons.push({
            text: t.startDemoBtn,
            action() {
                tour.complete();
                document.getElementById("startDemoOverlay").style.display = "none";
                startDemo();
            }
        });
    }

    return buttons;
}
