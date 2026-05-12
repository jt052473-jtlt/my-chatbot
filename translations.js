const translations = {

    English: {
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

        tour: {
            steps: [
                { title: "Welcome", text: "This guided tour will show you how to use the Clinical Intake Assistant." },
                { title: "Language Selector", text: "Choose your preferred language here." },
                { title: "Voice Mode", text: "Enable voice mode to answer questions verbally." },
                { title: "Chat Window", text: "This area displays the conversation." },
                { title: "Controls", text: "Use these buttons to navigate the intake process." }
            ]
        },

        forms: {
            admission: {
                questions: [
                    "What is your full name?",
                    "What is your date of birth?",
                    "What brings you in today?",
                    "How long have you had these symptoms?",
                    "Do you have any allergies?"
                ],
                summaryLabels: {
                    name: "Full Name",
                    dob: "Date of Birth",
                    reason: "Reason for Visit",
                    duration: "Symptom Duration",
                    allergies: "Allergies"
                }
            },

            sleep: {
                questions: [
                    "What is your main sleep complaint?",
                    "How long have you had this sleep issue?",
                    "Do you snore loudly?",
                    "Do you feel tired during the day?",
                    "Do you have trouble falling asleep?"
                ],
                summaryLabels: {
                    complaint: "Main Sleep Complaint",
                    duration: "Duration of Issue",
                    snore: "Snoring",
                    tired: "Daytime Tiredness",
                    falling: "Trouble Falling Asleep"
                }
            }
        }
    },

    Spanish: {
        ui: {
            appTitle: "Asistente de Admisión Clínica",
            start: "Comenzar",
            pause: "Pausar",
            finish: "Finalizar",
            repeat: "Repetir",
            skip: "Saltar",
            reset: "Reiniciar",
            send: "Enviar",
            typeHere: "Escribe tu respuesta aquí...",
            readAloud: "Leer en voz alta",
            voiceMode: "Modo de voz",
            next: "Siguiente",
            exit: "Salir"
        },

        tour: {
            steps: [
                { title: "Bienvenido", text: "Este recorrido te mostrará cómo usar el asistente." },
                { title: "Idioma", text: "Selecciona tu idioma preferido aquí." },
                { title: "Modo de voz", text: "Activa el modo de voz para responder verbalmente." },
                { title: "Chat", text: "Aquí verás la conversación." },
                { title: "Controles", text: "Usa estos botones para navegar el proceso." }
            ]
        },

        forms: {
            admission: {
                questions: [
                    "¿Cuál es su nombre completo?",
                    "¿Cuál es su fecha de nacimiento?",
                    "¿Qué lo trae hoy?",
                    "¿Cuánto tiempo ha tenido estos síntomas?",
                    "¿Tiene alguna alergia?"
                ],
                summaryLabels: {
                    name: "Nombre completo",
                    dob: "Fecha de nacimiento",
                    reason: "Motivo de la visita",
                    duration: "Duración de síntomas",
                    allergies: "Alergias"
                }
            },

            sleep: {
                questions: [
                    "¿Cuál es su principal problema de sueño?",
                    "¿Cuánto tiempo ha tenido este problema de sueño?",
                    "¿Ronca fuerte?",
                    "¿Se siente cansado durante el día?",
                    "¿Tiene dificultad para quedarse dormido?"
                ],
                summaryLabels: {
                    complaint: "Problema principal de sueño",
                    duration: "Duración del problema",
                    snore: "Ronquido",
                    tired: "Cansancio diurno",
                    falling: "Dificultad para dormir"
                }
            }
        }
    },

    Chinese: {
        ui: {
            appTitle: "临床问诊助手",
            start: "开始",
            pause: "暂停",
            finish: "完成",
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

        tour: {
            steps: [
                { title: "欢迎", text: "此导览将向您展示如何使用问诊助手。" },
                { title: "语言选择", text: "在这里选择您偏好的语言。" },
                { title: "语音模式", text: "启用语音模式以语音回答问题。" },
                { title: "聊天窗口", text: "此区域显示对话内容。" },
                { title: "控制按钮", text: "使用这些按钮导航问诊流程。" }
            ]
        },

        forms: {
            admission: {
                questions: [
                    "您的全名是什么？",
                    "您的出生日期是什么？",
                    "您今天来看病的原因是什么？",
                    "这些症状持续了多久？",
                    "您有任何过敏吗？"
                ],
                summaryLabels: {
                    name: "全名",
                    dob: "出生日期",
                    reason: "就诊原因",
                    duration: "症状持续时间",
                    allergies: "过敏"
                }
            },

            sleep: {
                questions: [
                    "您的主要睡眠问题是什么？",
                    "您有这个睡眠问题多久了？",
                    "您是否大声打鼾？",
                    "您白天是否感到疲倦？",
                    "您是否难以入睡？"
                ],
                summaryLabels: {
                    complaint: "主要睡眠问题",
                    duration: "问题持续时间",
                    snore: "打鼾",
                    tired: "白天疲倦",
                    falling: "入睡困难"
                }
            }
        }
    },

    Hindi: {
        ui: {
            appTitle: "क्लिनिकल इनटेक सहायक",
            start: "शुरू करें",
            pause: "रोकें",
            finish: "समाप्त करें",
            repeat: "दोहराएँ",
            skip: "छोड़ें",
            reset: "रीसेट",
            send: "भेजें",
            typeHere: "अपना उत्तर यहाँ लिखें...",
            readAloud: "जोर से पढ़ें",
            voiceMode: "वॉइस मोड",
            next: "अगला",
            exit: "बाहर निकलें"
        },

        tour: {
            steps: [
                { title: "स्वागत है", text: "यह गाइड आपको ऐप का उपयोग करना सिखाएगा।" },
                { title: "भाषा चयन", text: "यहाँ अपनी पसंदीदा भाषा चुनें।" },
                { title: "वॉइस मोड", text: "वॉइस मोड सक्षम करें और बोलकर उत्तर दें।" },
                { title: "चैट विंडो", text: "यहाँ बातचीत दिखाई देगी।" },
                { title: "नियंत्रण", text: "इन बटनों का उपयोग करके आगे बढ़ें।" }
            ]
        },

        forms: {
            admission: {
                questions: [
                    "आपका पूरा नाम क्या है?",
                    "आपकी जन्मतिथि क्या है?",
                    "आज आप किस समस्या के लिए आए हैं?",
                    "आपको ये लक्षण कब से हैं?",
                    "क्या आपको कोई एलर्जी है?"
                ],
                summaryLabels: {
                    name: "पूरा नाम",
                    dob: "जन्मतिथि",
                    reason: "आने का कारण",
                    duration: "लक्षण अवधि",
                    allergies: "एलर्जी"
                }
            },

            sleep: {
                questions: [
                    "आपकी मुख्य नींद की समस्या क्या है?",
                    "आपको यह नींद की समस्या कब से है?",
                    "क्या आप जोर से खर्राटे लेते हैं?",
                    "क्या आप दिन में थकान महसूस करते हैं?",
                    "क्या आपको सोने में कठिनाई होती है?"
                ],
                summaryLabels: {
                    complaint: "मुख्य नींद समस्या",
                    duration: "समस्या की अवधि",
                    snore: "खर्राटे",
                    tired: "दिन की थकान",
                    falling: "सोने में कठिनाई"
                }
            }
        }
    },

    Russian: {
        ui: {
            appTitle: "Помощник Клинического Приёма",
            start: "Начать",
            pause: "Пауза",
            finish: "Завершить",
            repeat: "Повторить",
            skip: "Пропустить",
            reset: "Сбросить",
            send: "Отправить",
            typeHere: "Введите ваш ответ...",
            readAloud: "Озвучить",
            voiceMode: "Голосовой режим",
            next: "Далее",
            exit: "Выход"
        },

        tour: {
            steps: [
                { title: "Добро пожаловать", text: "Этот тур покажет, как пользоваться ассистентом." },
                { title: "Выбор языка", text: "Выберите предпочитаемый язык." },
                { title: "Голосовой режим", text: "Включите голосовой режим для устных ответов." },
                { title: "Окно чата", text: "Здесь отображается диалог." },
                { title: "Управление", text: "Используйте кнопки для навигации." }
            ]
        },

        forms: {
            admission: {
                questions: [
                    "Как ваше полное имя?",
                    "Какова ваша дата рождения?",
                    "Что привело вас сегодня?",
                    "Как долго у вас эти симптомы?",
                    "Есть ли у вас аллергии?"
                ],
                summaryLabels: {
                    name: "Полное имя",
                    dob: "Дата рождения",
                    reason: "Причина визита",
                    duration: "Длительность симптомов",
                    allergies: "Аллергии"
                }
            },

            sleep: {
                questions: [
                    "Какова ваша основная проблема со сном?",
                    "Как долго у вас эта проблема со сном?",
                    "Вы громко храпите?",
                    "Чувствуете ли вы усталость в течение дня?",
                    "Испытываете ли вы трудности с засыпанием?"
                ],
                summaryLabels: {
                    complaint: "Основная проблема со сном",
                    duration: "Длительность проблемы",
                    snore: "Храп",
                    tired: "Дневная усталость",
                    falling: "Трудности с засыпанием"
                }
            }
        }
    }
};
