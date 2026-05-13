/* ------------------------------------------------------
   MULTI‑FORM SYSTEM — 5 questions per form
------------------------------------------------------ */

const forms = {
    /* --------------------------------------------------
       FORM 1 — ADMISSION FORM (your current form)
    -------------------------------------------------- */
    admission: {
        name: "Admission Form",

        questions: [
            "What is your full name?",
            "What is your date of birth?",
            "What brings you in today?",
            "How long have you had these symptoms?",
            "Do you have any allergies?"
        ],

        summaryLabels: {
            name: "Name",
            dob: "Date of Birth",
            reason: "Reason for Visit",
            duration: "Duration",
            allergies: "Allergies"
        }
    },

    /* --------------------------------------------------
       FORM 2 — SLEEP FORM (new)
    -------------------------------------------------- */
    sleep: {
        name: "Sleep Form",

        questions: [
            "How many hours do you sleep per night?",
            "Do you have trouble falling asleep?",
            "Do you wake up during the night?",
            "Do you feel rested in the morning?",
            "Do you take any sleep medications?"
        ],

        summaryLabels: {
            q1: "Hours of Sleep",
            q2: "Trouble Falling Asleep",
            q3: "Night Awakenings",
            q4: "Morning Rested",
            q5: "Sleep Medications"
        }
    }
};

window.forms = forms;
