// ==========================================
// CYBERSHIELD JAVASCRIPT
// ==========================================

// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// ==========================================
// ANIMATED COUNTERS
// ==========================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);
    let current = 0;

    const update = () => {
      current += Math.ceil(target / 50);

      if (current >= target) {
        counter.textContent = target;
        return;
      }

      counter.textContent = current;
      requestAnimationFrame(update);
    };

    update();
    counterObserver.unobserve(counter);
  });
});

counters.forEach(counter => counterObserver.observe(counter));


// ==========================================
// THREAT MODAL
// ==========================================

const threatInfo = {
  "Phishing": {
    icon: "🎣",
    text: "Phishing uses fake messages, websites or emails to trick people into revealing sensitive information. Always verify the sender and website before responding."
  },

  "Payment Scams": {
    icon: "💳",
    text: "Payment scams can involve fake refunds, QR codes, payment requests or impersonation. Never reveal OTPs, PINs or passwords."
  },

  "SMS Scams": {
    icon: "📱",
    text: "Scam texts may create urgency or offer fake rewards. Avoid clicking unexpected links and verify messages through official channels."
  },

  "Fake Websites": {
    icon: "🌐",
    text: "Fake websites can imitate banks, stores or social networks. Check the website address carefully before entering information."
  },

  "Identity Theft": {
    icon: "👤",
    text: "Identity theft occurs when someone misuses another person's personal information. Protect sensitive information and monitor accounts."
  },

  "Social Engineering": {
    icon: "🧠",
    text: "Social engineering manipulates people using trust, fear, urgency or authority. Pause and independently verify unusual requests."
  }
};

function showThreat(name) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");
  const info = threatInfo[name];

  content.innerHTML = `
    <div style="font-size:50px">${info.icon}</div>
    <h2 style="margin:15px 0;color:#00ff88">${name}</h2>
    <p style="color:#91a5b8;line-height:1.8">${info.text}</p>
  `;

  modal.style.display = "grid";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

document.getElementById("modal").addEventListener("click", e => {
  if (e.target.id === "modal") closeModal();
});


// ==========================================
// SCAM DETECTOR
// ==========================================

function checkScam(answer) {
  const result = document.getElementById("scamResult");

  if (answer) {
    result.innerHTML = `
      <span style="color:#00ff88">
      ✓ Correct! This is a scam.
      <br><br>
      Warning signs include urgency, an unexpected reward,
      and a suspicious link.
      </span>
    `;
  } else {
    result.innerHTML = `
      <span style="color:#ff3158">
      ✕ Incorrect. This message contains multiple scam indicators.
      </span>
    `;
  }
}


// ==========================================
// PHISHING ANALYZER
// ==========================================

function phishingAnswer() {
  const result = document.getElementById("phishingResult");

  result.innerHTML = `
    <div style="
      margin-top:20px;
      padding:18px;
      border-radius:10px;
      background:rgba(0,255,136,.08);
      color:#00ff88;
    ">
      ✓ PHISHING DETECTED
      <br><br>
      The fictional message contains several warning signs:
      suspicious sender, urgency and a request for sensitive
      account information.
    </div>
  `;
}


// ==========================================
// SECURITY QUIZ
// ==========================================

const questions = [
  {
    q: "Should you share an OTP with someone who calls you?",
    answers: ["Yes", "No", "Only if they know my name"],
    correct: 1
  },
  {
    q: "Which is a common phishing warning sign?",
    answers: ["Urgent request", "Normal greeting", "Known contact"],
    correct: 0
  },
  {
    q: "What should you do with a suspicious link?",
    answers: ["Click it", "Share it", "Verify it first"],
    correct: 2
  },
  {
    q: "What is safer for an important account?",
    answers: ["Unique password + MFA", "Same password everywhere", "Simple password"],
    correct: 0
  },
  {
    q: "Someone asks for your password by phone. What should you do?",
    answers: ["Give it", "Refuse and verify independently", "Post it online"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const question = questions[currentQuestion];

  document.getElementById("question").textContent = question.q;
  document.getElementById("questionNumber").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  document.getElementById("progressBar").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  const answers = document.getElementById("answers");

  answers.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (index === question.correct) {
        score++;
        document.getElementById("quizResult").innerHTML =
          `<span style="color:#00ff88">✓ Correct!</span>`;
      } else {
        document.getElementById("quizResult").innerHTML =
          `<span style="color:#ff3158">✕ Not quite. Learn from the warning signs.</span>`;
      }

      setTimeout(nextQuestion, 700);
    });

    answers.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    finishQuiz();
    return;
  }

  document.getElementById("quizResult").innerHTML = "";
  loadQuestion();
}

function finishQuiz() {
  const card = document.querySelector(".quiz-card");

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  let message = "";

  if (percentage >= 80) {
    message = "Excellent! Your cyber awareness is strong.";
  } else if (percentage >= 60) {
    message = "Good job! Keep improving your cyber awareness.";
  } else {
    message = "Keep learning. Cyber awareness helps protect you online.";
  }

  card.innerHTML = `
    <div style="font-size:60px">🛡️</div>
    <h2 style="color:#00ff88;margin:15px">
      Security Assessment Complete
    </h2>
    <h1 style="font-size:55px;color:#00aaff">
      ${percentage}%
    </h1>
    <p style="color:#91a5b8;margin:15px">
      You answered ${score} out of ${questions.length} correctly.
    </p>
    <p>${message}</p>
    <button
      class="btn primary"
      onclick="location.reload()"
      style="margin-top:20px;border:0;cursor:pointer">
      Retake Quiz
    </button>
  `;
}

loadQuestion();


// ==========================================
// ESC KEY CLOSES MODAL
// ==========================================

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal();
  }
});
