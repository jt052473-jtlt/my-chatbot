/* ---------------------------------------------------
   INTERVIEW FLOW LOGIC — MATCHED TO YOUR CHAT LAYOUT
---------------------------------------------------- */

let currentQuestion = 0;
let responses = [];

/* Add a message from the bot into the chat window */
function addBotMessage(text) {
  const chatWindow = document.getElementById("chatWindow");
  const div = document.createElement("div");
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* Update progress bar */
function updateProgress() {
  const lang = document.getElementById("languageSelect").value;
  const total = interviewQuestions[lang].length - 1; // last one is "Thank you"
  const percent = (currentQuestion / total) * 100;

  document.getElementById("progressBar").style.width = percent + "%";
}

/* Start the interview */
function startInterview() {
  currentQuestion = 0;
  responses = [];

  const chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML = ""; // Clear chat

  addBotMessage("Let's begin. Please answer each question.");
  showQuestion();
  updateProgress();
}

/* Show the current question */
function showQuestion() {
  const lang = document.getElementById("languageSelect").value;
  const q = interviewQuestions[lang][currentQuestion];
  addBotMessage(q);
}

/* Handle user response and move to next question */
function nextQuestion(userText) {
  responses.push(userText);

  currentQuestion++;

  const lang = document.getElementById("languageSelect").value;

  // If we reached the last question ("Thank you")
  if (currentQuestion >= interviewQuestions[lang].length - 1) {
    showSummary();
    updateProgress();
    return;
  }

  showQuestion();
  updateProgress();
}

/* Build and show the summary */
function showSummary() {
  const lang = document.getElementById("languageSelect").value;
  const summary = buildSummaryTranslated(responses, lang);

  addBotMessage("Here is your summary:");
  addBotMessage(summary);

  updateProgress();
}
