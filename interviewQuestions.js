// interviewQuestions.js
// Multilingual questions aligned to backend keys
// English (en), Spanish-US (es), Korean (ko)

const baseQuestions = [
  {
    id: "patient_full_name",
    key: "patient_full_name",
    en: "What is your full name as it appears on your records?",
    es: "¿Cuál es su nombre completo tal como aparece en sus registros?",
    ko: "기록에 있는 전체 이름을 말씀해 주세요.",
    type: "text"
  },
  {
    id: "patient_date_of_birth",
    key: "patient_date_of_birth",
    en: "What is your date of birth?",
    es: "¿Cuál es su fecha de nacimiento?",
    ko: "생년월일은 언제입니까?",
    type: "text"
  },
  {
    id: "patient_address",
    key: "patient_address",
    en: "What is your full home address, including city, state, and ZIP?",
    es: "¿Cuál es su dirección completa, incluyendo ciudad, estado y código postal?",
    ko: "도시, 주, 우편번호를 포함한 집 주소를 알려 주세요.",
    type: "text"
  },
  {
    id: "patient_phone_numbers",
    key: "patient_phone_numbers",
    en: "What are your main phone numbers—home, cell, and work if you use them?",
    es: "¿Cuáles son sus números de teléfono principales—casa, celular y trabajo si los usa?",
    ko: "주요 전화번호(집, 휴대폰, 직장 번호가 있다면)를 알려 주세요.",
    type: "text"
  },
  {
    id: "patient_email",
    key: "patient_email",
    en: "What email address do you prefer for communication?",
    es: "¿Qué dirección de correo electrónico prefiere para comunicarnos con usted?",
    ko: "연락받기를 원하는 이메일 주소는 무엇입니까?",
    type: "text"
  },
  {
    id: "emergency_contact",
    key: "emergency_contact",
    en: "Who should we list as your emergency contact, and what is their phone number?",
    es: "¿A quién debemos poner como su contacto de emergencia y cuál es su número de teléfono?",
    ko: "비상 연락처로 누구를 적어야 하며, 그 사람의 전화번호는 무엇입니까?",
    type: "text"
  },
  {
    id: "primary_sleep_complaint",
    key: "primary_sleep_complaint",
    en: "Describe your main sleep problem—what has been going on that made you seek help?",
    es: "Describa su problema principal de sueño—¿qué ha estado pasando que le hizo buscar ayuda?",
    ko: "주요 수면 문제를 설명해 주세요—도움을 받으려 하게 된 이유는 무엇입니까?",
    type: "text"
  },
  {
    id: "sleep_problem_onset",
    key: "sleep_problem_onset",
    en: "When did this sleep problem first start?",
    es: "¿Cuándo comenzó por primera vez este problema de sueño?",
    ko: "이 수면 문제가 처음 시작된 시기는 언제입니까?",
    type: "text"
  },
  {
    id: "usual_bedtime_workdays",
    key: "usual_bedtime_workdays",
    en: "On workdays, what time do you usually go to bed and wake up?",
    es: "En días laborales, ¿a qué hora suele acostarse y despertarse?",
    ko: "근무일에는 보통 몇 시에 잠자리에 들고 몇 시에 일어나십니까?",
    type: "text"
  },
  {
    id: "usual_bedtime_days_off",
    key: "usual_bedtime_days_off",
    en: "On days off, what time do you usually go to bed and wake up?",
    es: "En sus días libres, ¿a qué hora suele acostarse y despertarse?",
    ko: "쉬는 날에는 보통 몇 시에 잠자리에 들고 몇 시에 일어나십니까?",
    type: "text"
  },
  {
    id: "sleep_latency_and_awakenings",
    key: "sleep_latency_and_awakenings",
    en: "How long does it take you to fall asleep, how many times do you wake up at night, and how long are you awake when that happens?",
    es: "¿Cuánto tarda en dormirse, cuántas veces se despierta por la noche y cuánto permanece despierto cuando eso ocurre?",
    ko: "잠이 드는 데 얼마나 걸리고, 밤에 몇 번이나 깨며, 깼을 때 얼마나 오래 깨어 있습니까?",
    type: "text"
  },
  {
    id: "caffeine_and_alcohol_use",
    key: "caffeine_and_alcohol_use",
    en: "How much coffee, tea, soda, and alcohol do you typically consume in a day?",
    es: "¿Cuánto café, té, refrescos y alcohol consume típicamente en un día?",
    ko: "하루에 커피, 차, 탄산음료, 술을 얼마나 드십니까?",
    type: "text"
  },
  {
    id: "tobacco_use_details",
    key: "tobacco_use_details",
    en: "Do you use any tobacco products? If so, what type, how much per day, and for how many years?",
    es: "¿Usa algún producto de tabaco? Si es así, ¿qué tipo, cuánto al día y desde hace cuántos años?",
    ko: "담배 제품을 사용하십니까? 사용한다면 종류, 하루 사용량, 사용 기간을 알려 주세요.",
    type: "text"
  },
  {
    id: "medical_history_summary",
    key: "medical_history_summary",
    en: "Give me a quick overview of your medical history—heart issues, blood pressure, diabetes, lung problems, or anything else important.",
    es: "Deme un resumen rápido de su historial médico—problemas del corazón, presión arterial, diabetes, problemas pulmonares u otros importantes.",
    ko: "심장 질환, 혈압, 당뇨, 폐 질환 등 중요한 의학적 병력을 간단히 말씀해 주세요.",
    type: "text"
  },
  {
    id: "medications_list",
    key: "medications_list",
    en: "Please list your current medications, including the dose, how often you take them, and what they are for.",
    es: "Por favor, enumere sus medicamentos actuales, incluyendo la dosis, la frecuencia y para qué son.",
    ko: "현재 복용 중인 약을 용량, 복용 빈도, 복용 이유와 함께 알려 주세요.",
    type: "text"
  },
  {
    id: "sleep_symptoms_summary",
    key: "sleep_symptoms_summary",
    en: "Do you have symptoms like snoring, pauses in breathing, gasping, restless legs, vivid dreams, sleep paralysis, morning headaches, or daytime sleepiness?",
    es: "¿Tiene síntomas como ronquidos, pausas en la respiración, jadeos, piernas inquietas, sueños vívidos, parálisis del sueño, dolores de cabeza matutinos o somnolencia diurna?",
    ko: "코골이, 숨 멈춤, 헐떡임, 다리 불편감, 생생한 꿈, 가위눌림, 아침 두통, 주간 졸림 같은 증상이 있습니까?",
    type: "text"
  },
  {
    id: "epworth_total_score",
    key: "epworth_total_score",
    en: "If you know your Epworth Sleepiness Scale score, what is it? Or how sleepy do you feel during the day?",
    es: "Si conoce su puntaje de la Escala de Somnolencia de Epworth, ¿cuál es? O, ¿qué tan somnoliento se siente durante el día?",
    ko: "에프워스 졸림 척도 점수를 알고 계신가요? 아니면 낮 동안 얼마나 졸린지 말씀해 주세요.",
    type: "text"
  }
];

/* ---------------------------------------------------------
   EXPORT FUNCTION
--------------------------------------------------------- */
export function getQuestionsForLanguage(lang = "en") {
  return baseQuestions.map(q => ({
    id: q.id,
    key: q.key,
    prompt: q[lang] || q.en,
    type: q.type
  }));
}

