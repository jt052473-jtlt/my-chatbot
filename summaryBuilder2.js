
// ---------------------------------------------------------
// SUMMARY BUILDER — MULTILINGUAL VERSION
// ---------------------------------------------------------

// Helper: return "N/A" if empty
function safe(v) {
  return v && v.trim() !== "" ? v : "N/A";
}

// Build summary in the selected language
function buildSummaryTranslated(responses, lang) {
  const t = lang.summary; // summary labels from translations.js

  return `
${t.title}

${t.patientSection}
- ${t.fullName}: ${safe(responses[0])}
- ${t.dob}: ${safe(responses[1])}

${t.reasonSection}
- ${t.primaryComplaint}: ${safe(responses[2])}
- ${t.duration}: ${safe(responses[3])}

${t.sleepSymptomsSection}
- ${t.snoring}: ${safe(responses[4])}
- ${t.apnea}: ${safe(responses[5])}
- ${t.daytimeSleepiness}: ${safe(responses[6])}
- ${t.insomnia}: ${safe(responses[7])}
- ${t.awakenings}: ${safe(responses[8])}

${t.sleepHabitsSection}
- ${t.bedtime}: ${safe(responses[9])}
- ${t.wakeTime}: ${safe(responses[10])}
- ${t.naps}: ${safe(responses[11])}

${t.lifestyleSection}
- ${t.caffeine}: ${safe(responses[12])}
- ${t.alcohol}: ${safe(responses[13])}

${t.healthSection}
- ${t.medications}: ${safe(responses[14])}
- ${t.medicalHistory}: ${safe(responses[15])}
- ${t.allergies}: ${safe(responses[16])}

${t.additionalNotes}
${safe(responses[17])}
`.trim();
}


