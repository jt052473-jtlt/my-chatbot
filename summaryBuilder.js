// summaryBuilder.js
// Converts packet data into a readable human summary

export function buildHumanSummary(packet) {
  const v = (field) =>
    packet[field] && packet[field].trim() !== "" ? packet[field] : "N/A";

  return `
Sleep Intake Summary

Patient:
- Name: ${v("patient_full_name")}
- Date of Birth: ${v("patient_date_of_birth")}
- Address: ${v("patient_address")}
- Phone(s): ${v("patient_phone_numbers")}
- Email: ${v("patient_email")}
- Emergency Contact: ${v("emergency_contact")}

Physicians:
- Referring Physician: ${v("referring_physician")}
- Primary Physician: ${v("primary_physician")}

Sleep History:
- Primary Sleep Complaint: ${v("primary_sleep_complaint")}
- Onset of Problem: ${v("sleep_problem_onset")}
- Previous Sleep Studies/Treatments: ${v("previous_sleep_studies_or_treatments")}
- Additional Comments: ${v("additional_sleep_comments")}

Sleep Habits:
- Sleep Habits Summary: ${v("sleep_habits_summary")}
- Workday Schedule: ${v("usual_bedtime_workdays")}
- Days Off Schedule: ${v("usual_bedtime_days_off")}
- Sleep Latency/Awakenings: ${v("sleep_latency_and_awakenings")}
- Work Shift Type: ${v("work_shift_type")}

Lifestyle:
- Lifestyle Summary: ${v("lifestyle_factors_summary")}
- Caffeine/Alcohol Use: ${v("caffeine_and_alcohol_use")}
- Tobacco Use: ${v("tobacco_use_details")}
- Home Oxygen/CPAP Use: ${v("home_oxygen_and_cpap_use")}
- Nasal Breathing/Claustrophobia: ${v("nasal_breathing_and_claustrophobia")}
- Neck Size (inches): ${v("neck_size_inches")}

Medical History:
- Overall Medical History Summary: ${v("medical_history_summary")}
- Cardiac/Respiratory/Endocrine: ${v("cardiac_respiratory_endocrine_history")}
- Neurologic/Mental/ENT: ${v("neurologic_mental_ent_history")}
- Other Medical Conditions: ${v("other_medical_conditions")}
- Family History: ${v("family_history_summary")}
- Surgical History: ${v("surgical_history")}

Medications:
- Medications List: ${v("medications_list")}

Symptoms / Review of Systems:
- Sleep Symptoms: ${v("sleep_symptoms_summary")}
- General Review of Systems: ${v("general_review_of_systems_summary")}

Epworth:
- Epworth Details: ${v("epworth_details")}
- Epworth Total Score: ${v("epworth_total_score")}

HIPAA / Consents:
- HIPAA Consent Acknowledgment: ${v("hipaa_consent_acknowledgment")}
`.trim();
}
