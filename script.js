// Demo overlay fade-out + start guided tour
const demoOverlay = document.getElementById("demoOverlay");
const startDemoBtn = document.getElementById("startDemoBtn");

const tourOverlay = document.getElementById("tourOverlay");
const tourTooltip = document.getElementById("tourTooltip");
const tourTitle = document.getElementById("tourTitle");
const tourText = document.getElementById("tourText");
const tourNextBtn = document.getElementById("tourNextBtn");
const tourExitBtn = document.getElementById("tourExitBtn");

startDemoBtn.addEventListener("click", () => {
    demoOverlay.classList.add("hidden");
    setTimeout(() => (demoOverlay.style.display = "none"), 500);
    startTour();
});

// Elements
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const finishBtn = document.getElementById("finishBtn");
const repeatBtn = document.getElementById("repeatBtn");
const skipBtn = document.getElementById("skipBtn");
const resetBtn = document.getElementById("resetBtn");

const micBtn = document.getElementById("micBtn");
const readAloudToggle = document.getElementById("readAloudToggle");
const voiceModeToggle = document.getElementById("voiceModeToggle");
const languageSelect = document.getElementById("languageSelect");
const languageSearch = document.getElementById("languageSearch");

// State
let readAloudEnabled = false;
let voiceModeEnabled = false;
let isListening = false;
let currentQuestionIndex = 0;
let activeLanguage = "English";
let transcript = [];

// Guided tour state
let currentTourStep = 0;

const tourSteps = [
    {
        selector: "#languageSelect",
        title: "Language Selector",
        text: "Choose your preferred language. All questions and system messages will appear in this language."
    },
    {
        selector: "#languageSearch",
        title: "Language Search",
        text: "Quickly find a language by typing its name."
    },
    {
        selector: "#readAloudToggle",
        title: "Read Aloud",
        text: "When enabled, the assistant will speak each question in your selected language."
    },
    {
        selector: "#voiceModeToggle",
        title: "Voice Mode & Mic",
        text: "Turn this on to answer using your voice. The mic turns blue when listening."
    },
    {
        selector: "#chatWindow",
        title: "Chat Window",
        text: "All questions, answers, and system messages appear here."
    },
    {
        selector: ".control-buttons",
        title: "Controls",
        text: "Start, Pause, Repeat, Skip, Finish, and Reset manage the intake flow and PDF export."
    },
    {
        selector: ".input-area",
        title: "Answer Box",
        text: "Type your responses here and press Send."
    }
];

function startTour() {
    currentTourStep = 0;
    tourOverlay.classList.remove("hidden");
    showTourStep();
}

function endTour() {
    tourOverlay.classList.add("hidden");
}

function showTourStep() {
    const step = tourSteps[currentTourStep];
    const target = document.querySelector(step.selector);
    if (!target) return;

    const rect = target.getBoundingClientRect();

    tourTitle.textContent = step.title;
    tourText.textContent = step.text;

    const tooltipHeight = 150; // approximate
    const bottomLimit = window.innerHeight - 170; // keep above bottom controls

    let top = rect.bottom + 12 + window.scrollY;

    // If tooltip would go off-screen, place ABOVE the element
    if (top > bottomLimit) {
        top = rect.top - tooltipHeight + window.scrollY - 12;
    }

    const left = rect.left + window.scrollX;

    tourTooltip.style.top = `${top}px`;
    tourTooltip.style.left = `${left}px`;
}

tourNextBtn.addEventListener("click", () => {
    currentTourStep++;
    if (currentTourStep >= tourSteps.length) {
        endTour();
    } else {
        showTourStep();
    }
});

tourExitBtn.addEventListener("click", () => {
    endTour();
});

// Top 10 languages
const topLanguages = [
    "English",
    "Spanish",
    "French",
    "Chinese",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Bengali",
    "Russian",
    "German"
];

// Language -> locale map for TTS
const languageLocaleMap = {
    English: "en",
    Spanish: "es",
    French: "fr",
    Chinese: "zh",
    Arabic: "ar",
    Hindi: "hi",
    Portuguese: "pt",
    Bengali: "bn",
    Russian: "ru",
    German: "de"
};

// Offline dictionary translations (questions + system messages)
const translations = {
    "Welcome to the Sleep Intake Assistant. What is your full name?": {
        Spanish: "Bienvenido al Asistente de Sueño. ¿Cuál es su nombre completo?",
        French: "Bienvenue dans l’assistant de sommeil. Quel est votre nom complet ?",
        Chinese: "欢迎使用睡眠评估助手。您的全名是什么？",
        Arabic: "مرحبًا بك في مساعد تقييم النوم. ما هو اسمك الكامل؟",
        Hindi: "स्लीप इंटेक असिस्टेंट में आपका स्वागत है। आपका पूरा नाम क्या है?",
        Portuguese: "Bem-vindo ao Assistente de Sono. Qual é o seu nome completo?",
        Bengali: "স্লিপ ইনটেক সহায়কে স্বাগতম। আপনার পূর্ণ নাম কী?",
        Russian: "Добро пожаловать в помощник по сну. Как ваше полное имя?",
        German: "Willkommen beim Schlafaufnahme-Assistenten. Wie lautet Ihr vollständiger Name?"
    },
    "What is your date of birth?": {
        Spanish: "¿Cuál es su fecha de nacimiento?",
        French: "Quelle est votre date de naissance ?",
        Chinese: "您的出生日期是什么？",
        Arabic: "ما هو تاريخ ميلادك؟",
        Hindi: "आपकी जन्मतिथि क्या है?",
        Portuguese: "Qual é a sua data de nascimento?",
        Bengali: "আপনার জন্মতারিখ কী?",
        Russian: "Какова ваша дата рождения?",
        German: "Wie ist Ihr Geburtsdatum?"
    },
    "What time do you usually go to bed?": {
        Spanish: "¿A qué hora suele acostarse?",
        French: "À quelle heure allez-vous généralement vous coucher ?",
        Chinese: "您通常几点上床睡觉？",
        Arabic: "في أي وقت تذهب إلى السرير عادةً؟",
        Hindi: "आप आमतौर पर कितने बजे सोने जाते हैं?",
        Portuguese: "A que horas você geralmente vai para a cama?",
        Bengali: "আপনি সাধারণত কখন ঘুমাতে যান?",
        Russian: "Во сколько вы обычно ложитесь спать?",
        German: "Um wie viel Uhr gehen Sie normalerweise ins Bett?"
    },
    "How long does it take you to fall asleep?": {
        Spanish: "¿Cuánto tiempo tarda en quedarse dormido?",
        French: "Combien de temps mettez-vous pour vous endormir ?",
        Chinese: "您通常需要多长时间才能入睡？",
        Arabic: "كم من الوقت يستغرقك لتغفو؟",
        Hindi: "आपको सोने में कितना समय लगता है?",
        Portuguese: "Quanto tempo você leva para adormecer?",
        Bengali: "আপনার ঘুমাতে কত সময় লাগে?",
        Russian: "Сколько времени вам нужно, чтобы заснуть?",
        German: "Wie lange brauchen Sie, um einzuschlafen?"
    },
    "How many times do you wake up during the night?": {
        Spanish: "¿Cuántas veces se despierta durante la noche?",
        French: "Combien de fois vous réveillez-vous pendant la nuit ?",
        Chinese: "您夜间会醒来多少次？",
        Arabic: "كم مرة تستيقظ أثناء الليل؟",
        Hindi: "आप रात में कितनी बार जागते हैं?",
        Portuguese: "Quantas vezes você acorda durante a noite?",
        Bengali: "আপনি রাতে কতবার জেগে ওঠেন?",
        Russian: "Сколько раз вы просыпаетесь ночью?",
        German: "Wie oft wachen Sie in der Nacht auf?"
    },
    "What time do you usually wake up?": {
        Spanish: "¿A qué hora suele despertarse?",
        French: "À quelle heure vous réveillez-vous généralement ?",
        Chinese: "您通常几点起床？",
        Arabic: "في أي وقت تستيقظ عادةً؟",
        Hindi: "आप आमतौर पर कितने बजे जागते हैं?",
        Portuguese: "A que horas você geralmente acorda?",
        Bengali: "আপনি সাধারণত কখন জাগেন?",
        Russian: "Во сколько вы обычно просыпаетесь?",
        German: "Um wie viel Uhr wachen Sie normalerweise auf?"
    },
    "Do you snore loudly?": {
        Spanish: "¿Ronca fuerte?",
        French: "Ronflez-vous bruyamment ?",
        Chinese: "您打鼾声音大吗？",
        Arabic: "هل تشخر بصوت عالٍ؟",
        Hindi: "क्या आप ज़ोर से खर्राटे लेते हैं?",
        Portuguese: "Você ronca alto?",
        Bengali: "আপনি কি জোরে নাক ডাকেন?",
        Russian: "Вы громко храпите?",
        German: "Schnarchen Sie laut?"
    },
    "Has anyone observed you stop breathing during sleep?": {
        Spanish: "¿Alguien ha observado que deja de respirar mientras duerme?",
        French: "Quelqu’un a-t-il remarqué que vous arrêtez de respirer pendant votre sommeil ?",
        Chinese: "有人注意到您睡觉时呼吸暂停吗？",
        Arabic: "هل لاحظ أحد أنك تتوقف عن التنفس أثناء النوم؟",
        Hindi: "क्या किसी ने देखा है कि आप सोते समय सांस लेना बंद कर देते हैं?",
        Portuguese: "Alguém já observou você parar de respirar durante o sono?",
        Bengali: "কেউ কি লক্ষ্য করেছেন যে আপনি ঘুমের মধ্যে শ্বাস বন্ধ করেন?",
        Russian: "Кто-нибудь замечал, कि вы перестаёте дышать во сне?",
        German: "Hat jemand beobachtet, dass Sie im Schlaf aufhören zu atmen?"
    },
    "Do you feel rested when you wake up?": {
        Spanish: "¿Se siente descansado cuando se despierta?",
        French: "Vous sentez-vous reposé lorsque vous vous réveillez ?",
        Chinese: "您醒来时感觉休息够了吗？",
        Arabic: "هل تشعر بالراحة عندما تستيقظ؟",
        Hindi: "क्या आप जागने पर तरोताज़ा महसूस करते हैं?",
        Portuguese: "Você se sente descansado quando acorda?",
        Bengali: "আপনি কি ঘুম থেকে উঠে বিশ্রামপ্রাপ্ত অনুভব করেন?",
        Russian: "Чувствуете ли вы себя отдохнувшим, когда просыпаетесь?",
        German: "Fühlen Sie sich ausgeruht, wenn Sie aufwachen?"
    },
    "Anything else you’d like to share about your sleep?": {
        Spanish: "¿Hay algo más que le gustaría compartir sobre su sueño?",
        French: "Y a-t-il autre chose que vous souhaiteriez partager sur votre sommeil ?",
        Chinese: "还有什么想要分享的关于您睡眠的情况吗？",
        Arabic: "هل هناك أي شيء آخر تود مشاركته عن نومك؟",
        Hindi: "क्या आप अपनी नींद के बारे में और कुछ साझा करना चाहेंगे?",
        Portuguese: "Há mais alguma coisa que gostaria de compartilhar sobre o seu sono?",
        Bengali: "আপনার ঘুম সম্পর্কে আর কিছু কি শেয়ার করতে চান?",
        Russian: "Есть ли ещё что-то, чем вы хотели бы поделиться о своём сне?",
        German: "Möchten Sie sonst noch etwas über Ihren Schlaf mitteilen?"
    },
    "Intake paused.": {
        Spanish: "Evaluación pausada.",
        French: "Entretien mis en pause.",
        Chinese: "评估已暂停。",
        Arabic: "تم إيقاف التقييم مؤقتًا.",
        Hindi: "इंटेक रोक दिया गया है.",
        Portuguese: "Avaliação pausada.",
        Bengali: "ইনটেক বিরতি দেওয়া হয়েছে।",
        Russian: "Опрос приостановлен.",
        German: "Aufnahme pausiert."
    },
    "Repeating previous question.": {
        Spanish: "Repitiendo la pregunta anterior.",
        French: "Répétition de la question précédente.",
        Chinese: "正在重复上一个问题。",
        Arabic: "إعادة السؤال السابق.",
        Hindi: "पिछला प्रश्न दोहराया जा रहा है.",
        Portuguese: "Repetindo a pergunta anterior.",
        Bengali: "পূর্ববর্তী প্রশ্ন পুনরাবৃত্তি করা হচ্ছে।",
        Russian: "Повтор предыдущего вопроса.",
        German: "Vorherige Frage wird wiederholt."
    },
    "Question skipped.": {
        Spanish: "Pregunta omitida.",
        French: "Question ignorée.",
        Chinese: "问题已跳过。",
        Arabic: "تم تخطي السؤال.",
        Hindi: "प्रश्न छोड़ दिया गया है.",
        Portuguese: "Pergunta ignorada.",
        Bengali: "প্রশ্ন এড়িয়ে যাওয়া হয়েছে।",
        Russian: "Вопрос пропущен.",
        German: "Frage übersprungen."
    },
    "Thank you. Intake complete.": {
        Spanish: "Gracias. La evaluación ha finalizado.",
        French: "Merci. L’entretien est terminé.",
        Chinese: "谢谢。评估已完成。",
        Arabic: "شكرًا لك. تم الانتهاء من التقييم.",
        Hindi: "धन्यवाद। इंटेक पूरा हो गया है.",
        Portuguese: "Obrigado. A avaliação foi concluída.",
        Bengali: "ধন্যবাদ। ইনটেক সম্পন্ন হয়েছে।",
        Russian: "Спасибо. Опрос завершён.",
        German: "Vielen Dank. Die Aufnahme ist abgeschlossen."
    },
    "Intake reset.": {
        Spanish: "La evaluación se ha reiniciada.",
        French: "L’entretien a été réinitialisé.",
        Chinese: "评估已重置。",
        Arabic: "تمت إعادة تعيين التقييم.",
        Hindi: "इंटेक रीसेट कर दिया गया है.",
        Portuguese: "A avaliação foi reiniciada.",
        Bengali: "ইনটেক পুনরায় শুরু করা হয়েছে।",
        Russian: "Опрос был сброшен.",
        German: "Die Aufnahme wurde zurückgesetzt."
    },
    "Intake finished early.": {
        Spanish: "La evaluación se ha finalizado antes de tiempo.",
        French: "L’entretien a été terminé plus tôt.",
        Chinese: "评估已提前结束。",
        Arabic: "تم إنهاء التقييم مبكرًا.",
        Hindi: "इंटेक को पहले ही समाप्त कर दिया गया है.",
        Portuguese: "A avaliação foi encerrada antecipadamente.",
        Bengali: "ইনটেক আগেই শেষ করা হয়েছে।",
        Russian: "Опрос завершён досрочно.",
        German: "Die Aufnahme wurde vorzeitig beendet."
    }
};

// Populate dropdown
function loadLanguages(list) {
    languageSelect.innerHTML = "";
    list.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });
}
loadLanguages(topLanguages);

// Language change
languageSelect.addEventListener("change", () => {
    activeLanguage = languageSelect.value;
});

// Language search
languageSearch.addEventListener("input", () => {
    const q = languageSearch.value.toLowerCase();
    const filtered = topLanguages.filter(l => l.toLowerCase().includes(q));

    languageSelect.innerHTML = "";
    filtered.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.textContent = lang;
        languageSelect.appendChild(opt);
    });

    if (filtered.length > 0) {
        languageSelect.value = filtered[0];
        activeLanguage = filtered[0];
    }
});

// Mic + voice mode
micBtn.addEventListener("click", () => {
    isListening = !isListening;
    if (voiceModeEnabled || isListening) {
        micBtn.classList.add("active");
    } else {
        micBtn.classList.remove("active");
    }
});

voiceModeToggle.addEventListener("change", () => {
    voiceModeEnabled = voiceModeToggle.checked;
    if (voiceModeEnabled) {
        micBtn.classList.add("active");
        isListening = true;
    } else {
        micBtn.classList.remove("active");
        isListening = false;
    }
});

// Read aloud toggle
readAloudToggle.addEventListener("change", () => {
    readAloudEnabled = readAloudToggle.checked;
});

// Progress bar
function updateProgress() {
    const percent = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

// Translation function using offline dictionary
function translateText(text) {
    if (activeLanguage === "English") return text;
    const entry = translations[text];
    if (entry && entry[activeLanguage]) {
        return entry[activeLanguage];
    }
    return text;
}

// TTS: load voices properly
let availableVoices = [];

function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    availableVoices = window.speechSynthesis.getVoices();
}

if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
}

// Speak text in selected language
function speakText(text) {
    if (!readAloudEnabled) return;
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);

    const langCode = languageLocaleMap[activeLanguage] || "en";
    utter.lang = langCode;

    const match = availableVoices.find(v =>
        v.lang.toLowerCase().startsWith(langCode)
    );
    if (match) {
        utter.voice = match;
    }

    synth.speak(utter);
}

// Chat helpers
function addMessage(role, text) {
    const translatedText = translateText(text);

    const msg = document.createElement("div");
    msg.classList.add("message", role);
    msg.textContent = translatedText;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    transcript.push({
        role,
        originalText: text,
        translatedText,
        timestamp: new Date().toISOString()
    });

    if (role === "bot" || role === "system") {
        speakText(translatedText);
    }
}

// Questions
const questions = [
    "Welcome to the Sleep Intake Assistant. What is your full name?",
    "What is your date of birth?",
    "What time do you usually go to bed?",
    "How long does it take you to fall asleep?",
    "How many times do you wake up during the night?",
    "What time do you usually wake up?",
    "Do you snore loudly?",
    "Has anyone observed you stop breathing during sleep?",
    "Do you feel rested when you wake up?",
    "Anything else you’d like to share about your sleep?"
];

// Ask question
function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        addMessage("bot", questions[currentQuestionIndex]);
        updateProgress();
    } else {
        addMessage("bot", "Thank you. Intake complete.");
        updateProgress();
    }
}

// Start
startBtn.addEventListener("click", () => {
    if (currentQuestionIndex === 0 && chatWindow.children.length === 0) {
        askQuestion();
    }
});

// Send
sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        askQuestion();
    } else {
        addMessage("bot", "Thank you. Intake complete.");
        updateProgress();
    }
});

// Enter key
userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.click();
});

// Controls
pauseBtn.addEventListener("click", () => {
    addMessage("system", "Intake paused.");
});

finishBtn.addEventListener("click", () => {
    addMessage("system", "Intake finished early.");
    currentQuestionIndex = questions.length;
    updateProgress();
    generatePdfFlow();
});

repeatBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        addMessage("system", "Repeating previous question.");
        askQuestion();
    }
});

skipBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    addMessage("system", "Question skipped.");
    if (currentQuestionIndex < questions.length) {
        askQuestion();
    } else {
        addMessage("bot", "Thank you. Intake complete.");
        updateProgress();
    }
});

resetBtn.addEventListener("click", () => {
    chatWindow.innerHTML = "";
    currentQuestionIndex = 0;
    transcript = [];
    updateProgress();
    addMessage("system", "Intake reset.");
});

// PDF export flow
function generatePdfFlow() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("jsPDF not available");
        return;
    }

    const useTranslated = window.confirm(
        "Generate PDF in selected language?\nOK = Translated, Cancel = English"
    );

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(16);
    doc.text("Sleep Intake Transcript", 10, y);
    y += 8;

    doc.setFontSize(10);
    doc.text(`Language: ${activeLanguage}`, 10, y);
    y += 6;

    const now = new Date();
    doc.text(`Exported: ${now.toLocaleString()}`, 10, y);
    y += 8;

    doc.setFontSize(11);

    transcript.forEach(entry => {
        const roleLabel =
            entry.role === "bot"
                ? "Bot"
                : entry.role === "user"
                ? "User"
                : "System";

        const text = useTranslated ? entry.translatedText : entry.originalText;
        const line = `${roleLabel}: ${text}`;

        const split = doc.splitTextToSize(line, 180);

        if (y + split.length * 6 > 280) {
            doc.addPage();
            y = 10;
        }

        doc.text(split, 10, y);
        y += split.length * 6;
    });

    doc.save("sleep-intake-transcript.pdf");
}
