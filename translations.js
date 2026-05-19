/* ------------------------------------------------------
   TRANSLATIONS — UI Text + Guided Tour (5 Languages)
------------------------------------------------------ */

const translations = {

    /* --------------------------------------------------
       ENGLISH
    -------------------------------------------------- */
    English: {
        start: "Start",
        pause: "Pause",
        finish: "Finish",
        repeat: "Repeat",
        skip: "Skip",
        reset: "Reset",
        send: "Send",
        readAloud: "Read Aloud",
        voiceMode: "Voice Mode",
        searching: "Searching...",
        listening: "Listening...",
        speakNow: "Speak now...",

        tour: {
            steps: [
                { title: "Welcome", text: "This is the Clinical Intake Assistant. I will guide you through the interface." },
                { title: "Language Selector", text: "Choose your preferred language here." },
                { title: "Form Selector", text: "Select which intake form you want to complete." },
                { title: "Chat Window", text: "This is where the conversation appears." },
                { title: "Controls", text: "Use these buttons to start, skip, repeat, or finish the interview." }
            ]
        }
    },

    /* --------------------------------------------------
       SPANISH
    -------------------------------------------------- */
    Spanish: {
        start: "Comenzar",
        pause: "Pausar",
        finish: "Finalizar",
        repeat: "Repetir",
        skip: "Saltar",
        reset: "Reiniciar",
        send: "Enviar",
        readAloud: "Leer en voz alta",
        voiceMode: "Modo de voz",
        searching: "Buscando...",
        listening: "Escuchando...",
        speakNow: "Hable ahora...",

        tour: {
            steps: [
                { title: "Bienvenido", text: "Este es el Asistente de Admisión Clínica. Te guiaré por la interfaz." },
                { title: "Selector de idioma", text: "Elige tu idioma preferido aquí." },
                { title: "Selector de formulario", text: "Selecciona qué formulario deseas completar." },
                { title: "Ventana de chat", text: "Aquí aparecerá la conversación." },
                { title: "Controles", text: "Usa estos botones para iniciar, saltar, repetir o finalizar la entrevista." }
            ]
        }
    },

    /* --------------------------------------------------
       CHINESE
    -------------------------------------------------- */
    Chinese: {
        start: "开始",
        pause: "暂停",
        finish: "完成",
        repeat: "重复",
        skip: "跳过",
        reset: "重置",
        send: "发送",
        readAloud: "朗读",
        voiceMode: "语音模式",
        searching: "搜索中...",
        listening: "正在聆听...",
        speakNow: "请开始说话...",

        tour: {
            steps: [
                { title: "欢迎", text: "这是临床问诊助手。我将带您了解界面。" },
                { title: "语言选择器", text: "在这里选择您偏好的语言。" },
                { title: "表单选择器", text: "选择您要填写的问诊表。" },
                { title: "聊天窗口", text: "对话内容将显示在这里。" },
                { title: "控制按钮", text: "使用这些按钮开始、跳过、重复或结束问诊。" }
            ]
        }
    },

    /* --------------------------------------------------
       HINDI
    -------------------------------------------------- */
    Hindi: {
        start: "शुरू करें",
        pause: "रोकें",
        finish: "समाप्त करें",
        repeat: "दोहराएँ",
        skip: "छोड़ें",
        reset: "रीसेट",
        send: "भेजें",
        readAloud: "जोर से पढ़ें",
        voiceMode: "वॉइस मोड",
        searching: "खोज रहा है...",
        listening: "सुन रहा है...",
        speakNow: "अब बोलें...",

        tour: {
            steps: [
                { title: "स्वागत है", text: "यह क्लिनिकल इंटेक असिस्टेंट है। मैं आपको इंटरफ़ेस दिखाऊँगा।" },
                { title: "भाषा चयन", text: "यहाँ अपनी पसंदीदा भाषा चुनें।" },
                { title: "फ़ॉर्म चयन", text: "जिस फ़ॉर्म को भरना है उसे चुनें।" },
                { title: "चैट विंडो", text: "वार्तालाप यहाँ दिखाई देगा।" },
                { title: "नियंत्रण", text: "इन बटनों का उपयोग इंटरव्यू शुरू, छोड़ने, दोहराने या समाप्त करने के लिए करें।" }
            ]
        }
    },

    /* --------------------------------------------------
       RUSSIAN
    -------------------------------------------------- */
    Russian: {
        start: "Начать",
        pause: "Пауза",
        finish: "Завершить",
        repeat: "Повторить",
        skip: "Пропустить",
        reset: "Сбросить",
        send: "Отправить",
        readAloud: "Озвучить",
        voiceMode: "Голосовой режим",
        searching: "Поиск...",
        listening: "Прослушивание...",
        speakNow: "Говорите...",

        tour: {
            steps: [
                { title: "Добро пожаловать", text: "Это Клинический Ассистент. Я проведу вас по интерфейсу." },
                { title: "Выбор языка", text: "Выберите предпочитаемый язык здесь." },
                { title: "Выбор формы", text: "Выберите форму, которую хотите заполнить." },
                { title: "Окно чата", text: "Здесь будет отображаться разговор." },
                { title: "Элементы управления", text: "Используйте эти кнопки, чтобы начать, пропустить, повторить или завершить интервью." }
            ]
        }
    }
};

/* ------------------------------------------------------
   EXPORT
------------------------------------------------------ */
window.translations = translations;
