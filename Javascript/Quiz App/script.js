const questions = [
  {
    question: "Which keyword declares a block-scoped variable in JS?",
    options: ["var", "let", "define", "static"],
    answer: "let"
  },
  {
    question: "What does the 'typeof' operator return for an array?",
    options: ["array", "list", "object", "undefined"],
    answer: "object"
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "splice()"],
    answer: "push()"
  },
  {
    question: "What is the output of: Boolean('')?",
    options: ["true", "false", "null", "undefined"],
    answer: "false"
  },
  {
    question: "Which HTTP method is used to UPDATE a resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "PUT"
  }
]

let currentIndex = 0
let score = 0
let timer = null
let timeLeft = 15

function startQuiz() {
  currentIndex = 0 //currIdx is 0 at start of quiz, so we start with first question
  score = 0
  loadQuestion()
}

function loadQuestion() {
  // Reset state for new question
  clearInterval(timer) //reset timer if still running because of previous question
  timeLeft = 15
  document.getElementById("feedback").textContent = ""
  document.getElementById("resultBox").style.display = "none"

  if (currentIndex >= questions.length) {
    // show result box, hide question elements
    document.getElementById("question").style.display = "none"
    document.getElementById("options").style.display = "none"
    document.getElementById("timerTrack").style.display = "none"
    document.getElementById("timerText").style.display = "none"
    document.getElementById("progress").style.display = "none"
    document.getElementById("resultBox").style.display = "block"
    document.getElementById("finalScore").textContent =
      `You scored ${score} out of ${questions.length}`
    return
  }

  const q = questions[currentIndex] 
  document.getElementById("progress").textContent =
    `Question ${currentIndex + 1} / ${questions.length}`
  document.getElementById("question").textContent = q.question

  // Render option buttons
  document.getElementById("options").innerHTML = q.options.map(opt => `
        <button class="option" onclick="selectAnswer('${opt}')">${opt}</button>
      `).join("")

  startTimer()
}

function startTimer() {
  updateTimerUI()
  timer = setInterval(() => {
    timeLeft--
    updateTimerUI()
    if (timeLeft <= 0) {
      // clear interval, show "Time's up!", move to next question after 1s
      clearInterval(timer)
      document.getElementById("feedback").textContent = "Time's up!"
      disableOptions()
      setTimeout(() => {
        currentIndex++ //move to next question
        loadQuestion()
      }, 1000)
    }
  }, 1000)
}

function updateTimerUI() {
  document.getElementById("timerText").textContent = `Time left: ${timeLeft}s`
  document.getElementById("timerBar").style.width =
    `${(timeLeft / 15) * 100}%`//timeLeft is 15 at start of question, so we calculate percentage based on that 
  document.getElementById("timerBar").style.background =
    timeLeft <= 5 ? "red" : "#27ae60"
}


function selectAnswer(selected) {
  clearInterval(timer)
  const correct = questions[currentIndex].answer 
  const buttons = document.querySelectorAll(".option")

  // Highlight correct and wrong
  buttons.forEach(btn => {
    btn.disabled = true
    if (btn.textContent === correct) {
      btn.classList.add("correct")
    } else if (btn.textContent === selected && selected !== correct) {
      btn.classList.add("wrong")
    }
  })

  if (selected === correct) {
    score++
    document.getElementById("feedback").textContent = "✅ Correct!"
    document.getElementById("feedback").style.color = "green"
  } else {
    document.getElementById("feedback").textContent = `❌ Wrong! Answer: ${correct}`
    document.getElementById("feedback").style.color = "red"
  }

  // Move to next question after 1.5s
  setTimeout(() => {
    currentIndex++
    loadQuestion()
  }, 1500)
}



function disableOptions() {
  document.querySelectorAll(".option").forEach(btn => btn.disabled = true)
}

function restartQuiz() {
  // your code: reset display, call startQuiz()
  document.getElementById("question").style.display = "block" //display = block makes the element visible again, since it was set to none at end of quiz
  document.getElementById("options").style.display = "block"
  document.getElementById("timerTrack").style.display = "block"
  document.getElementById("timerText").style.display = "block"
  document.getElementById("progress").style.display = "block"
  startQuiz()
}

// Start on load
startQuiz()
