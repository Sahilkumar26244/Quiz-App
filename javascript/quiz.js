const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.createElement('div');

const myQuestions = [
  {
    question: "What is the capital of France?",
    answers: {
      a: "Paris",
      b: "Madrid",
      c: "Berlin"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the largest country in the world?",
    answers: {
      a: "USA",
      b: "Russia",
      c: "China"
    },
    correctAnswer: "b"
  },
  {
    question: "What is the smallest country in the world?",
    answers: {
      a: "Vatican City",
      b: "Monaco",
      c: "San Marino"
    },
    correctAnswer: "a"
  }
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter}: ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    output.push(
      `<div class="question">${currentQuestion.question}</div>
      <div class="answer">${answers.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answer');

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainer.classList.add('correct');
    } else {
      answerContainer.classList.add('incorrect');
    }
  });

  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  quizContainer.appendChild(resultsContainer);
}

buildQuiz();

submitButton.addEventListener('click', showResults);
