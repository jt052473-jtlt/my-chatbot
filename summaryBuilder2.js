// ---------------------------------------------------------
// SUMMARY BUILDER — MULTILINGUAL + CLEAN OUTPUT
// ---------------------------------------------------------

window.buildSummary = function(patientAnswers, labels) {

    const chatWindow = document.getElementById("chatWindow");

    // Clear chat window
    chatWindow.innerHTML = "";

    // Header
    const header = document.createElement("div");
    header.style.fontWeight = "bold";
    header.style.fontSize = "18px";
    header.style.marginBottom = "12px";
    header.textContent = labels.header;
    chatWindow.appendChild(header);

    // Helper to add summary rows
    function addRow(label, value) {
        const row = document.createElement("div");
        row.style.background = "#f7f9ff";
        row.style.border = "1px solid #e0e6f5";
        row.style.padding = "10px 12px";
        row.style.borderRadius = "10px";
        row.style.marginBottom = "8px";
        row.textContent = `${label}: ${value || "—"}`;
        chatWindow.appendChild(row);
    }

    // Add each summary field
    addRow(labels.name, patientAnswers.name);
    addRow(labels.dob, patientAnswers.dob);
    addRow(labels.complaint, patientAnswers.complaint);
    addRow(labels.duration, patientAnswers.duration);
    addRow(labels.allergies, patientAnswers.allergies);
    addRow(labels.medications, patientAnswers.medications);
    addRow(labels.chronic, patientAnswers.chronic);
    addRow(labels.travel, patientAnswers.travel);
    addRow(labels.surgeries, patientAnswers.surgeries);
    addRow(labels.notes, patientAnswers.notes);

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
};
