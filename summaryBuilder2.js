function safe(v) {
  return v && v.trim() !== "" ? v : "N/A";
}

function buildSummaryTranslated(responses, lang) {
  const t = translations[lang].summary;

  return `
${t.title}

${t.patientSection}
- ${t.fullName}: ${safe(responses[0])}
- ${t.dob}: ${safe(responses[1])}

${t.reasonSection}
- ${t.primaryComplaint}: ${safe(responses[2])}
- ${t.duration}: ${safe(responses[3])}

${t.healthSection}
- ${t.allergies}: ${safe(responses[4])}
- ${t.medications}: ${safe(responses[5])}
- ${t.medicalHistory}: ${safe(responses[6])}

${t.travelSection}
- ${t.recentTravel}: ${safe(responses[7])}
- ${t.recentSurgeries}: ${safe(responses[8])}

${t.additionalNotes}
${safe(responses[9])}
`.trim();
}
