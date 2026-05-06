let currentQuestion = 0;
let responses = [];

function startInterview() {
  currentQuestion = 0;
  responses = [];
  addBotMessage("Let's begin. Please answer each question.");
  showQuestion();
}

function showQuestion() {
  const lang = document.getElementById("languageSelect").value;
  const q = interviewQuestions[lang][currentQuestion];
  addBotMessage(q);
}

function nextQuestion(userText) {
  responses.push(userText);

  currentQuestion++;

  const lang = document.getElementById("languageSelect").value;

  if (currentQuestion >= interviewQuestions[lang].length - 1) {
    showSummary();
  } else {
    showQuestion();
  }
}

function showSummary() {
  const lang = document.getElementById("languageSelect").value;
  const summary = buildSummaryTranslated(responses, lang);

  addBotMessage("Here is your summary:");
  addBotMessage(summary);
}
