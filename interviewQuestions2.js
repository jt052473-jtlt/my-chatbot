// ---------------------------------------------------------
// INTERVIEW QUESTIONS — MULTILINGUAL VERSION
// ---------------------------------------------------------

const interviewQuestions = {
  English: [
    "Hello! What is your full name?",
    "What is your date of birth?",
    "What brings you in today?",
    "How long have you been experiencing this issue?",
    "Do you have any allergies?",
    "Are you currently taking any medications?",
    "Do you have any chronic conditions?",
    "Have you recently traveled?",
    "Have you had any recent surgeries?",
    "Is there anything else you'd like to share?",
    "Thank you. That completes the intake."
  ],

  Spanish: [
    "¡Hola! ¿Cuál es su nombre completo?",
    "¿Cuál es su fecha de nacimiento?",
    "¿Qué lo trae hoy aquí?",
    "¿Cuánto tiempo ha tenido este problema?",
    "¿Tiene alguna alergia?",
    "¿Está tomando algún medicamento actualmente?",
    "¿Tiene alguna condición crónica?",
    "¿Ha viajado recientemente?",
    "¿Ha tenido alguna cirugía reciente?",
    "¿Hay algo más que le gustaría compartir?",
    "Gracias. Eso completa la evaluación."
  ],

  Chinese: [
    "您好！您的全名是什么？",
    "您的出生日期是什么？",
    "您今天来看诊的原因是什么？",
    "这个问题已经持续多久了？",
    "您有任何过敏吗？",
    "您目前正在服用任何药物吗？",
    "您有任何慢性疾病吗？",
    "您最近有旅行吗？",
    "您最近做过手术吗？",
    "还有什么您想补充的吗？",
    "谢谢您。问诊完成。"
  ],

  Tagalog: [
    "Hello! Ano ang iyong buong pangalan?",
    "Ano ang iyong petsa ng kapanganakan?",
    "Ano ang dahilan ng pagpunta mo ngayon?",
    "Gaano na katagal mo nararanasan ang problemang ito?",
    "Mayroon ka bang anumang allergy?",
    "Umiinom ka ba ng anumang gamot ngayon?",
    "Mayroon ka bang chronic na kondisyon?",
    "Kamakailan ka bang nagbiyahe?",
    "Mayroon ka bang naging operasyon kamakailan?",
    "May nais ka pa bang idagdag?",
    "Salamat. Tapos na ang intake."
  ],

  Vietnamese: [
    "Xin chào! Họ và tên đầy đủ của bạn là gì?",
    "Ngày sinh của bạn là gì?",
    "Hôm nay bạn đến khám vì lý do gì?",
    "Bạn đã gặp vấn đề này bao lâu rồi?",
    "Bạn có bị dị ứng gì không?",
    "Bạn có đang dùng thuốc nào không?",
    "Bạn có bệnh lý mãn tính nào không?",
    "Gần đây bạn có đi du lịch không?",
    "Bạn có phẫu thuật gần đây không?",
    "Bạn có muốn chia sẻ thêm điều gì không?",
    "Cảm ơn bạn. Buổi khám đã hoàn tất."
  ],

  Arabic: [
    "مرحباً! ما هو اسمك الكامل؟",
    "ما هو تاريخ ميلادك؟",
    "ما الذي جاء بك اليوم؟",
    "منذ متى وأنت تعاني من هذه المشكلة؟",
    "هل لديك أي حساسية؟",
    "هل تتناول أي أدوية حالياً؟",
    "هل لديك أي حالات مزمنة؟",
    "هل سافرت مؤخراً؟",
    "هل خضعت لأي عمليات جراحية مؤخراً؟",
    "هل هناك أي شيء آخر تود مشاركته؟",
    "شكراً لك. لقد اكتمل التقييم."
  ],

  French: [
    "Bonjour ! Quel est votre nom complet ?",
    "Quelle est votre date de naissance ?",
    "Qu’est‑ce qui vous amène aujourd’hui ?",
    "Depuis combien de temps avez‑vous ce problème ?",
    "Avez‑vous des allergies ?",
    "Prenez‑vous actuellement des médicaments ?",
    "Avez‑vous des conditions chroniques ?",
    "Avez‑vous voyagé récemment ?",
    "Avez‑vous subi une chirurgie récemment ?",
    "Souhaitez‑vous ajouter autre chose ?",
    "Merci. L’entretien est terminé."
  ],

  Korean: [
    "안녕하세요! 성함이 어떻게 되시나요?",
    "생년월일은 어떻게 되시나요?",
    "오늘 어떤 문제로 오셨나요?",
    "이 문제가 얼마나 오래되었나요?",
    "알레르기가 있으신가요?",
    "현재 복용 중인 약이 있으신가요?",
    "만성 질환이 있으신가요?",
    "최근 여행을 다녀오셨나요?",
    "최근에 수술을 받은 적이 있으신가요?",
    "추가로 말씀하실 내용이 있으신가요?",
    "감사합니다. 문진이 완료되었습니다."
  ],

  Russian: [
    "Здравствуйте! Как ваше полное имя?",
    "Какова ваша дата рождения?",
    "Что привело вас сегодня?",
    "Как долго вы испытываете эту проблему?",
    "Есть ли у вас аллергии?",
    "Принимаете ли вы какие‑либо лекарства?",
    "Есть ли у вас хронические заболевания?",
    "Вы недавно путешествовали?",
    "Вы недавно перенесли операции?",
    "Есть ли что‑то ещё, чем вы хотите поделиться?",
    "Спасибо. Осмотр завершён."
  ],

  German: [
    "Hallo! Wie ist Ihr vollständiger Name?",
    "Was ist Ihr Geburtsdatum?",
    "Was führt Sie heute zu uns?",
    "Wie lange haben Sie dieses Problem schon?",
    "Haben Sie irgendwelche Allergien?",
    "Nehmen Sie derzeit Medikamente ein?",
    "Haben Sie chronische Erkrankungen?",
    "Sind Sie in letzter Zeit verreist?",
    "Hatten Sie kürzlich Operationen?",
    "Möchten Sie sonst noch etwas mitteilen?",
    "Danke. Die Aufnahme ist abgeschlossen."
  ]
};

