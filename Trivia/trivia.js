const baseURL = ('https://opentdb.com/api.php?amount=10&type=multiple')
const questionContainer = document.querySelector('.question');
const answerContainer = document.querySelector('.answers');
const nextBtn = document.querySelector('#next-btn')
const scoreText = document.querySelector('#score')
var result;
var count = -1;
var guessed = false;
var score = 0;
var amount;


axios.get(baseURL)
.then(res => {
  result = res.data.results
  amount = result.length;
  nextQuestion();
})

var nextQuestion = () => {
  count++;
  //removes previous answer buttons
  let previousAnswers = document.querySelectorAll('.answer-btn')
  if (previousAnswers.length > 0) {
    for (let i = 0; i < previousAnswers.length; i++) {
      previousAnswers[i].parentNode.removeChild(previousAnswers[i]);
    }
  }
  //removes the previous question
  let previousQuestion = document.querySelector('h4')
  if (previousQuestion !== null) {
    previousQuestion.parentNode.removeChild(previousQuestion);
  }

  let questionText = document.createElement('h4');
  questionText.innerHTML = result[count].question
  questionContainer.appendChild(questionText)

  let answer = [result[count].correct_answer, ...result[count].incorrect_answers]
  for(let i = 0; i < answer.length; i++) {
    let answerBtn = document.createElement('button');
    answerBtn.innerHTML = answer[i]
    answerBtn.classList.add('answer-btn')
    answerContainer.appendChild(answerBtn)
  }
}

answerContainer.addEventListener('click', e => {
  if (guessed === false) {
    if (e.target.tagName === 'BUTTON') {
      let ansBtn = document.querySelectorAll('.answer-btn')
      guessed = true;
      nextBtn.classList.remove('greyed-out')
      if (e.target.innerText === result[count].correct_answer){
        score++;
        e.target.style.backgroundColor = 'green'
        scoreText.innerText = `Score: ${score}`
      } else {
        e.target.style.backgroundColor = 'red'
        e.target.style.color = 'black'
      }
      for (let i = 0; i < ansBtn.length; i++) {
        if (ansBtn[i].innerText === result[count].correct_answer){
          ansBtn[i].style.backgroundColor = 'green'
        } else {
          ansBtn[i].classList.add('greyed-out')
        }
      }
    }
  }
})

nextBtn.addEventListener('click', e => {
  if(guessed === true && count < amount - 1){
    guessed = false;
    nextQuestion();
    nextBtn.classList.add('greyed-out')
  }
})

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
