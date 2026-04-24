// summaryBuilder2.js
// Builds a clean human‑readable summary from the packet data

export function buildHumanSummary(packet, language = "en") {
  const v = (key) =>
    packet[key] && packet[key].trim() !== "" ? packet[key] : "N/A";

  if (language === "es") {
    return `
Resumen de Evaluación del Sueño

Paciente:
- Nombre completo: ${v("patient_name")}
- Fecha de nacimiento: ${v("patient_date_of_birth")}

Motivo de la visita:
- Motivo principal: ${v("chief_complaint")}
- Duración del problema: ${v("duration_of_problem")}

Síntomas del sueño:
- Ronquido: ${v("snoring")}
- Pausas respiratorias: ${v("apnea_events")}
- Somnolencia diurna: ${v("daytime_sleepiness")}
- Insomnio: ${v("insomnia")}
- Despertares nocturnos: ${v("nighttime_awakenings")}

Hábitos de sueño:
- Hora de acostarse: ${v("bedtime")}
- Hora de despertarse: ${v("wake_time")}
- Siestas: ${v("naps")}

Estilo de vida:
- Consumo de cafeína: ${v("caffeine_use")}
- Consumo de alcohol: ${v("alcohol_use")}

Salud:
- Medicamentos: ${v("medications")}
- Condiciones médicas: ${v("medical_history")}
- Alergias: ${v("allergies")}

Notas adicionales:
${v("additional_notes")}
`.trim();
  }

  if (language === "ko") {
    return `
수면 평가 요약

환자 정보:
- 이름: ${v("patient_name")}
- 생년월일: ${v("patient_date_of_birth")}

방문 이유:
- 주요 수면 문제: ${v("chief_complaint")}
- 문제 지속 기간: ${v("duration_of_problem")}

수면 증상:
- 코골이: ${v("snoring")}
- 무호흡: ${v("apnea_events")}
- 주간 졸림: ${v("daytime_sleepiness")}
- 불면증: ${v("insomnia")}
- 야간 각성: ${v("nighttime_awakenings")}

수면 습관:
- 취침 시간: ${v("bedtime")}
- 기상 시간: ${v("wake_time")}
- 낮잠: ${v("naps")}

생활 습관:
- 카페인 섭취: ${v("caffeine_use")}
- 음주: ${v("alcohol_use")}

건강 정보:
- 복용 약물: ${v("medications")}
- 의학적 병력: ${v("medical_history")}
- 알레르기: ${v("allergies")}

추가 메모:
${v("additional_notes")}
`.trim();
  }

  // Default English summary
  return `
Sleep Intake Summary

Patient:
- Full Name: ${v("patient_name")}
- Date of Birth: ${v("patient_date_of_birth")}

Reason for Visit:
- Primary Sleep Complaint: ${v("chief_complaint")}
- Duration of Problem: ${v("duration_of_problem")}

Sleep Symptoms:
- Snoring: ${v("snoring")}
- Breathing Pauses: ${v("apnea_events")}
- Daytime Sleepiness: ${v("daytime_sleepiness")}
- Insomnia: ${v("insomnia")}
- Nighttime Awakenings: ${v("nighttime_awakenings")}

Sleep Habits:
- Bedtime: ${v("bedtime")}
- Wake Time: ${v("wake_time")}
- Naps: ${v("naps")}

Lifestyle:
- Caffeine Use: ${v("caffeine_use")}
- Alcohol Use: ${v("alcohol_use")}

Health:
- Medications: ${v("medications")}
- Medical Conditions: ${v("medical_history")}
- Allergies: ${v("allergies")}

Additional Notes:
${v("additional_notes")}
`.trim();
}
