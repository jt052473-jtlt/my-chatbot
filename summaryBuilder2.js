// -------------------------------
// SUMMARY BUILDER
// -------------------------------

function buildSummary(responses) {
  return `
    Patient Summary:
    -------------------------
    Name: ${responses[0] || "N/A"}
    DOB: ${responses[1] || "N/A"}
    Chief Complaint: ${responses[2] || "N/A"}
    Duration: ${responses[3] || "N/A"}
    Allergies: ${responses[4] || "N/A"}
    Medications: ${responses[5] || "N/A"}
    Chronic Conditions: ${responses[6] || "N/A"}
    Recent Travel: ${responses[7] || "N/A"}
    Recent Surgeries: ${responses[8] || "N/A"}
    Additional Notes: ${responses[9] || "N/A"}
  `;
}
