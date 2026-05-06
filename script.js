document.addEventListener("DOMContentLoaded", () => {

  const languageSelect = document.getElementById("languageSelect");
  const demoLanguageSelect = document.getElementById("demoLanguageSelect");

  const demoTitle = document.getElementById("demoTitle");
  const demoIntro = document.getElementById("demoIntro");

  const startDemoBtn = document.getElementById("startDemoBtn");
  const exitDemoBtn = document.getElementById("exitDemoBtn");

  const tourOverlay = document.getElementById("tourOverlay");
  const tourTooltip = document.getElementById("tourTooltip");
  const tourTitle = document.getElementById("tourTitle");
  const tourText = document.getElementById("tourText");
  const tourNextBtn = document.getElementById("tourNextBtn");
  const tourExitBtn = document.getElementById("tourExitBtn");

  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const micBtn = document.getElementById("micBtn");

  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const exitBtn = document.getElementById("exitBtn");

  // Populate language dropdowns
  Object.keys(translations).forEach(lang => {
    const opt1 = document.createElement("option");
    opt1.value = lang;
    opt1.textContent = lang;
    languageSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = lang;
    opt2.textContent = lang;
    demoLanguageSelect.appendChild(opt2);
  });

  languageSelect.value = "English";
  demoLanguageSelect.value = "English";

  // Update demo intro when language changes
  demoLanguageSelect.addEventListener("change", () => {
    const lang = translations[demoLanguageSelect.value];
    demoTitle.textContent = lang.demo.title;
    demoIntro.textContent = lang.demo.intro;
  });

  // Guided tour steps
  window.tourSteps = [
    {
      title: "Welcome",
      text: "This is a guided overview of the intake assistant."
    },
    {
      title: "Language",
      text: "You can select your preferred language here."
    },
    {
      title: "You're Ready!",
      text: "" // Filled dynamically
    }
  ];

  function updateFinalTourSlide() {
    const langName = languageSelect.value;
    const count = interviewQuestions[langName].length;

    tourSteps[tourSteps.length - 1].text =
      `You’re all set. Start the demo to see the full intake experience.\n\n` +
      `This example form uses a General Intake Form with ${count} questions.`;
  }

  // Start demo
  startDemoBtn.addEventListener("click", () => {
    document.getElementById("demoOverlay").style.display = "none";

    languageSelect.value = demoLanguageSelect.value;

    updateFinalTourSlide();
    startInterview();
  });

  exitDemoBtn.addEventListener("click", () => {
    document.getElementById("demoOverlay").style.display = "none";
  });

  // Chat helpers
  window.addBotMessage = function (text) {
    const div = document.createElement("div");
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  // User input
  userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const text = userInput.value.trim();
      if (text !== "") {
        addBotMessage("You: " + text);
        nextQuestion(text);
        userInput.value = "";
      }
    }
  });

  startBtn.addEventListener("click", startInterview);
  restartBtn.addEventListener("click", startInterview);
  exitBtn.addEventListener("click", () => location.reload());

});
