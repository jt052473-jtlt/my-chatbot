/* ------------------------------------------------------
   GUIDED TOUR — New Modular Version (Matches Old Behavior)
------------------------------------------------------ */

const TourController = (() => {

    let stepIndex = 0;
    let steps = [];

    /* --------------------------------------------------
       START TOUR
    -------------------------------------------------- */
    function start() {
        const tourData = translations[currentLanguage].tour;

        if (!tourData || !tourData.steps) return;

        steps = tourData.steps;
        stepIndex = 0;

        showStep();
    }

    /* --------------------------------------------------
       SHOW CURRENT STEP
    -------------------------------------------------- */
    function showStep() {
        if (stepIndex >= steps.length) {
            end();
            return;
        }

        const step = steps[stepIndex];

        document.getElementById("tourTitle").textContent = step.title;
        document.getElementById("tourText").textContent = step.text;

        document.getElementById("tourOverlay").classList.remove("hidden");
        document.getElementById("tourTooltip").classList.remove("hidden");

        updateButtons();
    }

    /* --------------------------------------------------
       NEXT STEP
    -------------------------------------------------- */
    function next() {
        stepIndex++;
        showStep();
    }

    /* --------------------------------------------------
       END TOUR
    -------------------------------------------------- */
    function end() {
        document.getElementById("tourOverlay").classList.add("hidden");
        document.getElementById("tourTooltip").classList.add("hidden");
    }

    /* --------------------------------------------------
       UPDATE BUTTON TEXT
    -------------------------------------------------- */
    function updateButtons() {
        const ui = translations[currentLanguage].ui;

        const nextBtn = document.getElementById("tourNextBtn");
        const exitBtn = document.getElementById("tourExitBtn");

        if (stepIndex >= steps.length - 1) {
            nextBtn.textContent = ui.finish;
        } else {
            nextBtn.textContent = ui.next;
        }

        exitBtn.textContent = ui.exit;
    }

    /* --------------------------------------------------
       EXPORT
    -------------------------------------------------- */
    return {
        start,
        next,
        end
    };

})();

window.TourController = TourController;
