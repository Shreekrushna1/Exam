let exams = JSON.parse(localStorage.getItem("Exam Data")) || [];
const examQuestionData = [
  {
    id: 0,
    question: "Which language runs in a web browser?",
    type: "radio",
    a: "Java",
    b: "C",
    c: "Python",
    d: "javascript",
    correct: "d",
  },
  {
    id: 1,
    question: "What does CSS stand for?",
    type: "radio",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    id: 2,
    question: "What does HTML stand for?",
    type: "radio",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    id: 3,
    question: "What year was JavaScript launched?",
    type: "radio",
    a: "1996",
    b: "1994",
    c: "1995",
    d: "none of the above",
    correct: "c",
  },
  {
    id: 4,
    question: "What is the capital city of France?",
    type: "text",
    inputTag: `<input type="text" placeholder="Enter Answer" id="inputID" style="width:400px;">`,
    correct: "paris",
  },
  {
    id: 5,
    question: "What year was JavaScript launched?",
    type: "checkbox",
    a: "1996",
    b: "1994",
    c: "1995",
    d: "none of the above",
    correct: ["a", "b"]
  }
];
const examContainer = document.getElementById("exam");
const currentURL = new URL(window.location.toLocaleString());
const urlParams = new URL(currentURL).searchParams;
const currentUserName = urlParams.get("userName");
let examss = exams.find((exam) => {
  return exam.name === currentUserName;
});

examQuestionData.forEach((questionData, index) => {
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerHTML = `
    <h2>${index + 1}. ${questionData.question}</h2>
    ${questionData.type === "radio" ? `
      <ul>
        <li>
          <input type="radio" name="question${index}" id="a${index}" value="a">
          <label for="a${index}">${questionData.a}</label>
        </li>
        <li>
          <input type="radio" name="question${index}" id="b${index}" value="b">
          <label for="b${index}">${questionData.b}</label>
        </li>
        <li>
          <input type="radio" name="question${index}" id="c${index}" value="c">
          <label for="c${index}">${questionData.c}</label>
        </li>
        <li>
          <input type="radio" name="question${index}" id="d${index}" value="d">
          <label for="d${index}">${questionData.d}</label>
        </li>
      </ul>
    ` : ""}
    ${questionData.type === "text" ? `
      <input type="text" placeholder="Enter Answer" name="question${index}" id="text${index}">
    ` : ""}
    ${questionData.type === "checkbox" ? `
      <ul>
      <li>
          <label>You Need To Select 2 Boxes</label>
        </li>
        <li>
          <input type="checkbox" name="question${index}" id="a${index}" value="a">
          <label for="a${index}">${questionData.a}</label>
        </li>
        <li>
          <input type="checkbox" name="question${index}" id="b${index}" value="b">
          <label for="b${index}">${questionData.b}</label>
        </li>
        <li>
          <input type="checkbox" name="question${index}" id="c${index}" value="c">
          <label for="c${index}">${questionData.c}</label>
        </li>
        <li>
          <input type="checkbox" name="question${index}" id="d${index}" value="d">
          <label for="d${index}">${questionData.d}</label>
        </li>
      </ul>
    ` : ""}
  `;
  examContainer.appendChild(questionElement);
});
const allAnswers = document.querySelectorAll(".answer");
const allQuestions = document.getElementById("question");
const e_text = document.getElementById("inputID");

let score = 0;
function deSelectAnswers() {
  allAnswers.forEach((exam) => (exam.checked = false));
}

const submitButton = document.createElement("button");
submitButton.textContent = "Submit Exam";
submitButton.style.marginTop = "10px";
examContainer.appendChild(submitButton);

submitButton.addEventListener("click", () => {
  const allAnswers = document.querySelectorAll(
    'input[type="radio"]:checked, input[type="checkbox"]:checked, input[type="text"]:not(:empty)'
  );

  if (allAnswers.length < examQuestionData.length) {
    Swal.fire({
      icon: "error",
      title: "Error Found",
      text: "Please Answer All Questions Before Submit Exam",
    });
    return;
  }
  submit();
});

function submit() {
  const getAllCheckData = document.querySelectorAll(
    'input[type="radio"]:checked,input[type="text"],input[type="checkbox"]:checked'
  );

  const answers = Array.from(getAllCheckData).reduce((acc, answerEl) => {
    const name = answerEl.name;
    const value = answerEl.value || "";
    if (!acc[name]) {
      acc[name] = value;
    } else if (Array.isArray(acc[name])) {
      acc[name].push(value);
    } else {
      acc[name] = [acc[name], value];
    }
    console.log(value);
    return acc;

  }, {});

  console.log(answers.question0, "anssssssss");


  console.log(answers, "answers");
  let score = 0;
  console.log("examQuestionData", examQuestionData);
  examQuestionData.forEach((questionData) => {
    console.log(answers);
    if (answers.question0 === questionData.correct && questionData.type === "radio") {
      score += 5;
      console.log("5 Added Radio");
    }
    if (answers.question1 === questionData.correct && questionData.type === "radio") {
      score += 5;
      console.log("5 Added Radio");
    }
    if (answers.question2 === questionData.correct && questionData.type === "radio") {
      score += 5;
      console.log("5 Added Radio");
    }
    if (answers.question3 === questionData.correct && questionData.type === "radio") {
      score += 5;
      console.log("5 Added Radio");
    }
    if (answers.question4 === questionData.correct && questionData.type === "text") {
      score += 10;
      console.log("10 Added Text");
    }

    if (answers.question5 && answers.question5.includes("a") && answers.question5.includes("b") && questionData.correct.length === 2 && questionData.type === "checkbox") {
      score += 10;
      console.log("10 Added for both checkboxes checked");
    }
  });

  const question1 = 5;
  const question2 = 5;
  const question3 = 5;
  const question4 = 5;
  const question5 = 10;
  const question6 = 10;
  let sum =  question1 + question2 + question3 + question4 + question5 + question6;
  examContainer.innerHTML = `
      <h2>You scored ${score} out of ${examQuestionData.reduce(

    () => sum,
    0
  )} marks</h2>
      <button onclick="homePage()">Reload</button>
  `;
}

function homePage() {
  window.location.href = "index.html";
}

let timeLeft = `${examss.time}`;
const timerElement = document.getElementById("timer");
const timer = setInterval(() => {
  timeLeft--;
  timerElement.innerHTML = `Remaining Time: ${timeLeft} seconds`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    submit();
  }
}, 1000);