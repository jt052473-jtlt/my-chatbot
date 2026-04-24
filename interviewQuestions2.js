// interviewQuestions2.js
// Provides multilingual question sets for the sleep intake chatbot

/* ---------------------------------------------------------
   ENGLISH QUESTIONS
--------------------------------------------------------- */
const questions_en = [
  { text: "What is your full name?", key: "patient_name" },
  { text: "What is your date of birth?", key: "patient_date_of_birth" },
  { text: "What brings you in for a sleep evaluation today?", key: "chief_complaint" },
  { text: "How long have you been experiencing this issue?", key: "duration_of_problem" },
  { text: "Do you snore loudly?", key: "snoring" },
  { text: "Do you stop breathing during sleep?", key: "apnea_events" },
  { text: "Do you feel tired during the day?", key: "daytime_sleepiness" },
  { text: "Do you have trouble falling asleep?", key: "insomnia" },
  { text: "Do you wake up frequently at night?", key: "nighttime_awakenings" },
  { text: "What time do you usually go to bed?", key: "bedtime" },
  { text: "What time do you usually wake up?", key: "wake_time" },
  { text: "Do you take naps during the day?", key: "naps" },
  { text: "Do you consume caffeine? If so, how much?", key: "caffeine_use" },
  { text: "Do you consume alcohol? If so, how often?", key: "alcohol_use" },
  { text: "Do you take any medications?", key: "medications" },
  { text: "Do you have any medical conditions?", key: "medical_history" },
  { text: "Do you have any allergies?", key: "allergies" },
  { text: "Is there anything else you’d like to share?", key: "additional_notes" }
];

/* ---------------------------------------------------------
   SPANISH QUESTIONS
--------------------------------------------------------- */
const questions_es = [
  { text: "¿Cuál es su nombre completo?", key: "patient_name" },
  { text: "¿Cuál es su fecha de nacimiento?", key: "patient_date_of_birth" },
  { text: "¿Qué lo trae hoy para una evaluación del sueño?", key: "chief_complaint" },
  { text: "¿Cuánto tiempo ha tenido este problema?", key: "duration_of_problem" },
  { text: "¿Ronca fuerte?", key: "snoring" },
  { text: "¿Deja de respirar mientras duerme?", key: "apnea_events" },
  { text: "¿Se siente cansado durante el día?", key: "daytime_sleepiness" },
  { text: "¿Tiene dificultad para quedarse dormido?", key: "insomnia" },
  { text: "¿Se despierta con frecuencia por la noche?", key: "nighttime_awakenings" },
  { text: "¿A qué hora suele acostarse?", key: "bedtime" },
  { text: "¿A qué hora suele despertarse?", key: "wake_time" },
  { text: "¿Toma siestas durante el día?", key: "naps" },
  { text: "¿Consume cafeína? ¿Cuánta?", key: "caffeine_use" },
  { text: "¿Consume alcohol? ¿Con qué frecuencia?", key: "alcohol_use" },
  { text: "¿Toma algún medicamento?", key: "medications" },
  { text: "¿Tiene alguna condición médica?", key: "medical_history" },
  { text: "¿Tiene alergias?", key: "allergies" },
  { text: "¿Desea compartir algo más?", key: "additional_notes" }
];

/* ---------------------------------------------------------
   KOREAN QUESTIONS
--------------------------------------------------------- */
const questions_ko = [
  { text: "성함이 어떻게 되시나요?", key: "patient_name" },
  { text: "생년월일이 어떻게 되시나요?", key: "patient_date_of_birth" },
  { text: "오늘 수면 평가를 받으러 오신 이유는 무엇인가요?", key: "chief_complaint" },
  { text: "이 문제가 얼마나 오래되었나요?", key: "duration_of_problem" },
  { text: "코를 크게 고시나요?", key: "snoring" },
  { text: "잠자는 동안 숨이 멈추는 증상이 있나요?", key: "apnea_events" },
  { text: "낮 동안 피곤함을 느끼시나요?", key: "daytime_sleepiness" },
  { text: "잠드는 데 어려움이 있나요?", key: "insomnia" },
  { text: "밤에 자주 깨시나요?", key: "nighttime_awakenings" },
  { text: "보통 몇 시에 잠자리에 드시나요?", key: "bedtime" },
  { text: "보통 몇 시에 일어나시나요?", key: "wake_time" },
  { text: "낮잠을 자시나요?", key: "naps" },
  { text: "카페인을 섭취하시나요? 얼마나 드시나요?", key: "caffeine_use" },
  { text: "술을 드시나요? 얼마나 자주 드시나요?", key: "alcohol_use" },
  { text: "복용 중인 약이 있나요?", key: "medications" },
  { text: "기저 질환이 있나요?", key: "medical_history" },
  { text: "알레르기가 있나요?", key: "allergies" },
  { text: "추가로 말씀하실 내용이 있나요?", key: "additional_notes" }
];

/* ---------------------------------------------------------
   EXPORT FUNCTION
--------------------------------------------------------- */
export function getQuestionsForLanguage(language) {
  if (language === "es") return questions_es;
  if (language === "ko") return questions_ko;
  return questions_en;
}
