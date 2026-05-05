// ---------------------------------------------------------
// MULTILINGUAL TRANSLATION ENGINE (TOP 10 LANGUAGES ONLY)
// Offline, fast, private — no API keys required
// ---------------------------------------------------------

const translations = {

  // -------------------------------------------------------
  // 1. ENGLISH (BASE LANGUAGE)
  // -------------------------------------------------------
  English: {
    voiceCode: "en-US",

    ui: {
      appTitle: "Clinical Intake Assistant",
      start: "Start",
      pause: "Pause",
      finish: "Finish",
      repeat: "Repeat",
      skip: "Skip",
      reset: "Reset",
      send: "Send",
      typeHere: "Type your response here...",
    },

    questions: [
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

    summaryLabels: {
      header: "Patient Summary",
      name: "Name",
      dob: "Date of Birth",
      complaint: "Chief Complaint",
      duration: "Duration",
      allergies: "Allergies",
      medications: "Medications",
      chronic: "Chronic Conditions",
      travel: "Recent Travel",
      surgeries: "Recent Surgeries",
      notes: "Additional Notes"
    }
  },

  // -------------------------------------------------------
  // 2. SPANISH
  // -------------------------------------------------------
  Spanish: {
    voiceCode: "es-ES",

    ui: {
      appTitle: "Asistente de Admisión Clínica",
      start: "Iniciar",
      pause: "Pausar",
      finish: "Finalizar",
      repeat: "Repetir",
      skip: "Saltar",
      reset: "Reiniciar",
      send: "Enviar",
      typeHere: "Escriba su respuesta aquí...",
    },

    questions: [
      "¡Hola! ¿Cuál es su nombre completo?",
      "¿Cuál es su fecha de nacimiento?",
      "¿Qué lo trae hoy?",
      "¿Cuánto tiempo ha tenido este problema?",
      "¿Tiene alguna alergia?",
      "¿Está tomando algún medicamento actualmente?",
      "¿Tiene alguna condición crónica?",
      "¿Ha viajado recientemente?",
      "¿Ha tenido alguna cirugía reciente?",
      "¿Hay algo más que le gustaría compartir?",
      "Gracias. Eso completa la admisión."
    ],

    summaryLabels: {
      header: "Resumen del Paciente",
      name: "Nombre",
      dob: "Fecha de Nacimiento",
      complaint: "Motivo de Consulta",
      duration: "Duración",
      allergies: "Alergias",
      medications: "Medicamentos",
      chronic: "Condiciones Crónicas",
      travel: "Viajes Recientes",
      surgeries: "Cirugías Recientes",
      notes: "Notas Adicionales"
    }
  },

  // -------------------------------------------------------
  // 3. CHINESE (SIMPLIFIED)
  // -------------------------------------------------------
  Chinese: {
    voiceCode: "zh-CN",

    ui: {
      appTitle: "临床问诊助手",
      start: "开始",
      pause: "暂停",
      finish: "结束",
      repeat: "重复",
      skip: "跳过",
      reset: "重置",
      send: "发送",
      typeHere: "在此输入您的回答...",
    },

    questions: [
      "您好！您的全名是什么？",
      "您的出生日期是什么？",
      "您今天来这里的原因是什么？",
      "这个问题持续了多久？",
      "您有任何过敏吗？",
      "您目前正在服用任何药物吗？",
      "您有任何慢性疾病吗？",
      "您最近有旅行吗？",
      "您最近做过手术吗？",
      "您还有其他想分享的吗？",
      "谢谢。这次问诊已完成。"
    ],

    summaryLabels: {
      header: "患者总结",
      name: "姓名",
      dob: "出生日期",
      complaint: "主诉",
      duration: "持续时间",
      allergies: "过敏史",
      medications: "用药情况",
      chronic: "慢性疾病",
      travel: "近期旅行",
      surgeries: "近期手术",
      notes: "其他备注"
    }
  },

  // -------------------------------------------------------
  // 4. TAGALOG
  // -------------------------------------------------------
  Tagalog: {
    voiceCode: "tl-PH",

    ui: {
      appTitle: "Klinikal na Intake Assistant",
      start: "Simulan",
      pause: "I-pause",
      finish: "Tapusin",
      repeat: "Ulitin",
      skip: "Laktawan",
      reset: "I-reset",
      send: "Ipadala",
      typeHere: "I-type ang iyong sagot dito...",
    },

    questions: [
      "Kamusta! Ano ang iyong buong pangalan?",
      "Ano ang iyong petsa ng kapanganakan?",
      "Ano ang dahilan ng pagpunta mo ngayon?",
      "Gaano na katagal ang problemang ito?",
      "Mayroon ka bang anumang allergy?",
      "Umiinom ka ba ng anumang gamot ngayon?",
      "Mayroon ka bang malalang kondisyon?",
      "Kamakailan ka bang nagbiyahe?",
      "Nagkaroon ka ba ng anumang operasyon kamakailan?",
      "Mayroon ka pa bang nais ibahagi?",
      "Salamat. Tapos na ang intake."
    ],

    summaryLabels: {
      header: "Buod ng Pasyente",
      name: "Pangalan",
      dob: "Petsa ng Kapanganakan",
      complaint: "Pangunahing Reklamo",
      duration: "Tagal",
      allergies: "Allergy",
      medications: "Gamot",
      chronic: "Malalang Kondisyon",
      travel: "Kamakailang Pagbiyahe",
      surgeries: "Kamakailang Operasyon",
      notes: "Karagdagang Tala"
    }
  },

  // -------------------------------------------------------
  // 5. VIETNAMESE
  // -------------------------------------------------------
  Vietnamese: {
    voiceCode: "vi-VN",

    ui: {
      appTitle: "Trợ Lý Tiếp Nhận Lâm Sàng",
      start: "Bắt đầu",
      pause: "Tạm dừng",
      finish: "Kết thúc",
      repeat: "Lặp lại",
      skip: "Bỏ qua",
      reset: "Đặt lại",
      send: "Gửi",
      typeHere: "Nhập câu trả lời của bạn...",
    },

    questions: [
      "Xin chào! Họ và tên của bạn là gì?",
      "Ngày sinh của bạn là gì?",
      "Hôm nay bạn đến đây vì lý do gì?",
      "Bạn gặp vấn đề này bao lâu rồi?",
      "Bạn có bị dị ứng gì không?",
      "Bạn có đang dùng thuốc nào không?",
      "Bạn có bệnh mãn tính nào không?",
      "Gần đây bạn có đi du lịch không?",
      "Bạn có phẫu thuật gần đây không?",
      "Bạn có muốn chia sẻ thêm điều gì không?",
      "Cảm ơn bạn. Buổi tiếp nhận đã hoàn tất."
    ],

    summaryLabels: {
      header: "Tóm Tắt Bệnh Nhân",
      name: "Họ Tên",
      dob: "Ngày Sinh",
      complaint: "Lý Do Khám",
      duration: "Thời Gian",
      allergies: "Dị Ứng",
      medications: "Thuốc Đang Dùng",
      chronic: "Bệnh Mãn Tính",
      travel: "Du Lịch Gần Đây",
      surgeries: "Phẫu Thuật Gần Đây",
      notes: "Ghi Chú Khác"
    }
  },

  // -------------------------------------------------------
  // 6. ARABIC
  // -------------------------------------------------------
  Arabic: {
    voiceCode: "ar-SA",

    ui: {
      appTitle: "مساعد الاستقبال الطبي",
      start: "ابدأ",
      pause: "إيقاف مؤقت",
      finish: "إنهاء",
      repeat: "إعادة",
      skip: "تخطي",
      reset: "إعادة ضبط",
      send: "إرسال",
      typeHere: "اكتب إجابتك هنا...",
    },

    questions: [
      "مرحباً! ما هو اسمك الكامل؟",
      "ما هو تاريخ ميلادك؟",
      "ما الذي جاء بك اليوم؟",
      "منذ متى وأنت تعاني من هذه المشكلة؟",
      "هل لديك أي حساسية؟",
      "هل تتناول أي أدوية حالياً؟",
      "هل لديك أي أمراض مزمنة؟",
      "هل سافرت مؤخراً؟",
      "هل خضعت لأي عمليات جراحية مؤخراً؟",
      "هل هناك أي شيء آخر ترغب في مشاركته؟",
      "شكراً لك. لقد اكتمل الاستقبال."
    ],

    summaryLabels: {
      header: "ملخص المريض",
      name: "الاسم",
      dob: "تاريخ الميلاد",
      complaint: "الشكوى الرئيسية",
      duration: "المدة",
      allergies: "الحساسية",
      medications: "الأدوية",
      chronic: "الأمراض المزمنة",
      travel: "السفر الأخير",
      surgeries: "العمليات الأخيرة",
      notes: "ملاحظات إضافية"
    }
  },

  // -------------------------------------------------------
  // 7. FRENCH
  // -------------------------------------------------------
  French: {
    voiceCode: "fr-FR",

    ui: {
      appTitle: "Assistant d'Admission Clinique",
      start: "Démarrer",
      pause: "Pause",
      finish: "Terminer",
      repeat: "Répéter",
      skip: "Passer",
      reset: "Réinitialiser",
      send: "Envoyer",
      typeHere: "Tapez votre réponse ici...",
    },

    questions: [
      "Bonjour ! Quel est votre nom complet ?",
      "Quelle est votre date de naissance ?",
      "Qu'est-ce qui vous amène aujourd'hui ?",
      "Depuis combien de temps avez-vous ce problème ?",
      "Avez-vous des allergies ?",
      "Prenez-vous actuellement des médicaments ?",
      "Avez-vous des maladies chroniques ?",
      "Avez-vous voyagé récemment ?",
      "Avez-vous subi une chirurgie récemment ?",
      "Y a-t-il autre chose que vous souhaitez partager ?",
      "Merci. L'admission est terminée."
    ],

    summaryLabels: {
      header: "Résumé du Patient",
      name: "Nom",
      dob: "Date de Naissance",
      complaint: "Motif de Consultation",
      duration: "Durée",
      allergies: "Allergies",
      medications: "Médicaments",
      chronic: "Maladies Chroniques",
      travel: "Voyages Récents",
      surgeries: "Chirurgies Récentes",
      notes: "Notes Supplémentaires"
    }
  },

  // -------------------------------------------------------
  // 8. KOREAN
  // -------------------------------------------------------
  Korean: {
    voiceCode: "ko-KR",

    ui: {
      appTitle: "임상 접수 도우미",
      start: "시작",
      pause: "일시정지",
      finish: "완료",
      repeat: "반복",
      skip: "건너뛰기",
      reset: "초기화",
      send: "보내기",
      typeHere: "여기에 답변을 입력하세요...",
    },

    questions: [
      "안녕하세요! 성함이 어떻게 되시나요?",
      "생년월일이 어떻게 되시나요?",
      "오늘 어떤 문제로 오셨나요?",
      "이 문제가 얼마나 지속되었나요?",
      "알레르기가 있으신가요?",
      "현재 복용 중인 약이 있으신가요?",
      "만성 질환이 있으신가요?",
      "최근 여행을 다녀오셨나요?",
      "최근 수술을 받으셨나요?",
      "추가로 공유하고 싶은 내용이 있으신가요?",
      "감사합니다. 접수가 완료되었습니다."
    ],

    summaryLabels: {
      header: "환자 요약",
      name: "이름",
      dob: "생년월일",
      complaint: "주호소",
      duration: "지속 기간",
      allergies: "알레르기",
      medications: "복용 약물",
      chronic: "만성 질환",
      travel: "최근 여행",
      surgeries: "최근 수술",
      notes: "추가 메모"
    }
  },

  // -------------------------------------------------------
  // 9. RUSSIAN
  // -------------------------------------------------------
  Russian: {
    voiceCode: "ru-RU",

    ui: {
      appTitle: "Помощник Клинического Приёма",
      start: "Начать",
      pause: "Пауза",
      finish: "Завершить",
      repeat: "Повторить",
      skip: "Пропустить",
      reset: "Сбросить",
      send: "Отправить",
      typeHere: "Введите ваш ответ здесь...",
    },

    questions: [
      "Здравствуйте! Как ваше полное имя?",
      "Какова ваша дата рождения?",
      "Что привело вас сегодня?",
      "Как долго у вас эта проблема?",
      "Есть ли у вас аллергии?",
      "Принимаете ли вы какие-либо лекарства?",
      "Есть ли у вас хронические заболевания?",
      "Путешествовали ли вы недавно?",
      "Были ли у вас недавние операции?",
      "Есть ли что-то ещё, чем вы хотите поделиться?",
      "Спасибо. Приём завершён."
    ],

    summaryLabels: {
      header: "Сводка Пациента",
      name: "Имя",
      dob: "Дата Рождения",
      complaint: "Основная Жалоба",
      duration: "Длительность",
      allergies: "Аллергии",
      medications: "Лекарства",
      chronic: "Хронические Заболевания",
      travel: "Недавние Поездки",
      surgeries: "Недавние Операции",
      notes: "Дополнительные Заметки"
    }
  },

  // -------------------------------------------------------
  // 10. GERMAN
  // -------------------------------------------------------
  German: {
    voiceCode: "de-DE",

    ui: {
      appTitle: "Klinischer Aufnahmeassistent",
      start: "Start",
      pause: "Pause",
      finish: "Beenden",
      repeat: "Wiederholen",
      skip: "Überspringen",
      reset: "Zurücksetzen",
      send: "Senden",
      typeHere: "Geben Sie Ihre Antwort hier ein...",
    },

    questions: [
      "Hallo! Wie ist Ihr vollständiger Name?",
      "Was ist Ihr Geburtsdatum?",
      "Was führt Sie heute hierher?",
      "Wie lange haben Sie dieses Problem schon?",
      "Haben Sie irgendwelche Allergien?",
      "Nehmen Sie derzeit Medikamente ein?",
      "Haben Sie chronische Erkrankungen?",
      "Sind Sie kürzlich gereist?",
      "Hatten Sie kürzlich Operationen?",
      "Möchten Sie noch etwas mitteilen?",
      "Danke. Die Aufnahme ist abgeschlossen."
    ],

    summaryLabels: {
      header: "Patientenzusammenfassung",
      name: "Name",
      dob: "Geburtsdatum",
      complaint: "Hauptbeschwerde",
      duration: "Dauer",
      allergies: "Allergien",
      medications: "Medikamente",
      chronic: "Chronische Erkrankungen",
      travel: "Kürzliche Reisen",
      surgeries: "Kürzliche Operationen",
      notes: "Zusätzliche Notizen"
    }
  }

};
