/* ------------------------------------------------------
   TRANSLATIONS — UI Text, Questions, Summary Labels, Tour
   (Old content preserved exactly)
------------------------------------------------------ */

const translations = {

  /* -------------------------------------------------------
     1. ENGLISH
  ------------------------------------------------------- */
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
      readAloud: "Read Aloud",
      voiceMode: "Voice Mode",
      next: "Next",
      exit: "Exit"
    },

    summaryLabels: {
      header: "Patient Summary",
      name: "Name",
      dob: "Date of Birth",
      reason: "Reason for Visit",
      duration: "Duration",
      allergies: "Allergies"
    },

    tour: {
      steps: [
        { title: "Welcome", text: "This demo shows a 5‑question clinical intake assistant." },
        { title: "Settings", text: "Choose your language and form type here." },
        { title: "Chat Window", text: "Your conversation and progress appear in this area." }
      ]
    }
  },

  /* -------------------------------------------------------
     2. SPANISH
  ------------------------------------------------------- */
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
      readAloud: "Leer en voz alta",
      voiceMode: "Modo de voz",
      next: "Siguiente",
      exit: "Salir"
    },

    summaryLabels: {
      header: "Resumen del Paciente",
      name: "Nombre",
      dob: "Fecha de Nacimiento",
      reason: "Motivo de Consulta",
      duration: "Duración",
      allergies: "Alergias"
    },

    tour: {
      steps: [
        { title: "Bienvenido", text: "Esta demostración incluye 5 preguntas clínicas." },
        { title: "Ajustes", text: "Seleccione idioma y tipo de formulario aquí." },
        { title: "Chat", text: "Su conversación aparece en esta ventana." }
      ]
    }
  },

  /* -------------------------------------------------------
     3. CHINESE (SIMPLIFIED)
  ------------------------------------------------------- */
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
      readAloud: "朗读",
      voiceMode: "语音模式",
      next: "下一步",
      exit: "退出"
    },

    summaryLabels: {
      header: "患者总结",
      name: "姓名",
      dob: "出生日期",
      reason: "就诊原因",
      duration: "持续时间",
      allergies: "过敏史"
    },

    tour: {
      steps: [
        { title: "欢迎", text: "此演示包含 5 个问诊问题。" },
        { title: "设置", text: "在此选择语言和表单类型。" },
        { title: "聊天窗口", text: "对话和进度显示在这里。" }
      ]
    }
  },

  /* -------------------------------------------------------
     4. HINDI
  ------------------------------------------------------- */
  Hindi: {
    voiceCode: "hi-IN",

    ui: {
      appTitle: "क्लिनिकल इंटेक सहायक",
      start: "शुरू करें",
      pause: "रोकें",
      finish: "समाप्त करें",
      repeat: "दोहराएँ",
      skip: "आगे बढ़ें",
      reset: "रीसेट",
      send: "भेजें",
      typeHere: "अपना उत्तर यहाँ लिखें...",
      readAloud: "जोर से पढ़ें",
      voiceMode: "वॉइस मोड",
      next: "अगला",
      exit: "बाहर निकलें"
    },

    summaryLabels: {
      header: "रोगी सारांश",
      name: "नाम",
      dob: "जन्म तिथि",
      reason: "आने का कारण",
      duration: "अवधि",
      allergies: "एलर्जी"
    },

    tour: {
      steps: [
        { title: "स्वागत है", text: "यह डेमो 5 प्रश्नों का एक छोटा इंटेक दिखाता है।" },
        { title: "सेटिंग्स", text: "यहाँ भाषा और फ़ॉर्म प्रकार चुनें।" },
        { title: "चैट", text: "आपकी बातचीत यहाँ दिखाई देती है।" }
      ]
    }
  },

  /* -------------------------------------------------------
     5. RUSSIAN
  ------------------------------------------------------- */
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
      readAloud: "Озвучить",
      voiceMode: "Голосовой режим",
      next: "Далее",
      exit: "Выход"
    },

    summaryLabels: {
      header: "Сводка пациента",
      name: "Имя",
      dob: "Дата рождения",
      reason: "Причина визита",
      duration: "Длительность",
      allergies: "Аллергии"
    },

    tour: {
      steps: [
        { title: "Добро пожаловать", text: "Эта демонстрация включает 5 вопросов." },
        { title: "Настройки", text: "Выберите язык и тип формы здесь." },
        { title: "Чат", text: "Ваш диалог отображается в этом окне." }
      ]
    }
  }
};

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.translations = translations;
