//id tags to be called
var timeEl = document.getElementById("time"); 
var questionEl = document.getElementById("question");
var questionBox = document.getElementById("question-box"); 
var aEl = document.getElementById("answerA"); 
var bEl = document.getElementById("answerB");
var cEl = document.getElementById("answerC");
var startBtn = document.getElementById("startBtn");
var evaluationEl = document.getElementById("evaluation");
var scoresListEL = document.getElementById("scoresList");
var resultsEL = document.getElementById("resultsArea");
var scoreEL = document.getElementById("finalScore");
var submitBtn = document.getElementById("submitBtn");
var playerNameEl = document.getElementById("playerName");

//Global vars to be called later
var correctAnswer = "";
var secondsRemaining = 30;
var i = 0;
var leaderboard = [];

questionBox.hidden = true;

//questionSet contains the questions that will be referenced by nextQuestion function
var questionSet = [
    {
        question: "What does the acrnonym 'JSON' stand for ",
        answers: [
            "JavaScript Oh No!",
            "JavaScript Object Notation",
            "JavaScript Orientation Node"
        ],
        correctAnswer: "JavaScript Object Notation",
    },
    {
        question: "What does the acronoym 'HTML' stand for?",
        answers: [
            "Hypertext Markup Language",
            "High Text Modeling Logistics",
            "Huge Trouble My Lord!"
        ],
        correctAnswer: "Hypertext Markup Language",
       
    },
    {
        question: "According to wikipedia, what percentage of websites use Javascript on the client side?",
        answers: [
            "2%",
            "9.7%",
            "97%"
        ],
        correctAnswer: "97%",
    }
];
//Call the next question in questionSet and assign all of the answers to answer buttons
function nextQuestion() {
  console.log(i)
    questionEl.hidden = false;
    aEl.hidden = false;
    bEl.hidden = false;
    cEl.hidden = false;
    questionBox.hidden = false;
    correctAnswer = questionSet[i].correctAnswer;
    questionEl.textContent = questionSet[i].question;
    aEl.textContent = questionSet[i].answers[0];
    bEl.textContent = questionSet[i].answers[1];
    cEl.textContent = questionSet[i].answers[2];
  
  
    
  }
  
//highscores.html will error because there is no start btn, so only add event listener to index page
if(startBtn !== null) {
    startBtn.addEventListener("click", startGame);
  
    submitBtn.addEventListener("click", submitScore);
  };

  
  //let the games begin!
  function startGame(event) {
    event.preventDefault();
    startBtn.hidden = true;
     // Start a timer
     var countdown = setInterval(function () {
        secondsRemaining--;
        // if time expires, quiz has ended
        if(secondsRemaining > -1) {
          timeEl.textContent = secondsRemaining;
            } else { clearInterval(countdown);
             questionEl.hidden = true;
            answerA.hidden = true;
            answerB.hidden = true;
            answerC.hidden = true; 
            evaluationEl.hidden = true;
            setScore();
            
            
        };
      }, 1000);
      nextQuestion();
    }

    //event listener on buttons
    aEl.addEventListener("click", checkAnswer);
    bEl.addEventListener("click", checkAnswer);
    cEl.addEventListener("click", checkAnswer);
//If the answer is correct, and not the last question, respond correct - next question
//if the answer is correct and the last question, respond correct - end quiz
//if the answer is incorrect and time and not the last question, deduct 10 points and next question
//if the answer is incorrect and the last question, deduct 10 points, end quiz
function checkAnswer(event) {
    event.stopPropagation();
    if (event.target.textContent === correctAnswer) {
      i++;
      if (i == 3){
        questionEl.hidden = true;
        aEl.hidden = true;
        bEl.hidden = true;
        cEl.hidden = true; 
        clearInterval(countdown);
        timeEl.textContent = secondsRemaining;
        setScore();
      }
      evaluationEl.textContent = "Correct!";
      nextQuestion();
    } else if (event.target.textContent === correctAnswer) {
      evaluationEl.textContent = "Correct!";
      if (i == 3){
        questionEl.hidden = true;
        aEl.hidden = true;
        bEl.hidden = true;
        cEl.hidden = true; 
        clearInterval(countdown);
        timeEl.textContent = secondsRemaining;
        setScore();
      }
      clearInterval(countdown);
      setScore();
    } 
    else {
      secondsRemaining -= 10;
      i++;
      nextQuestion();
      evaluationEl.textContent = "Incorrect - Minus 10 seconds";
      }
  //   else if (i < 2) {
  //     secondsRemaining -= 10;
  //     timeEl.textContent = secondsRemaining;
  //     i++;
  //     evaluationEl.textContent = "Incorrect - Minus 10 seconds";
  //     nextQuestion(i);
  //  } 
   
  
    
}
//if time is less than 0 after deduction end quiz, if last question, end quiz. Hide questions!!!
if (secondsRemaining < 0) {
    secondsRemaining = 0;
    timeEl.textContent = secondsRemaining;
    evaluationEl.textContent = "";
    clearInterval(countdown);
    questionEl.hidden = true;
    answerA.hidden = true;
    answerB.hidden = true;
    answerC.hidden = true; 
    evaluationEl.hidden = true;
    setScore();
  } else {
   timeEl.textContent = secondsRemaining;
   questionEl.hidden = true;
   answerA.hidden = true;
   answerB.hidden = true;
   answerC.hidden = true; 
   evaluationEl.textContent = "End of Quiz";
   clearInterval(countdown);
   setScore();
  }


// When quiz is ended by time out 
//or answering the last question
// show final results and submit option
function setScore() {
    resultsEL.hidden = false;
    if (secondsRemaining > 0){
      scoreEL.textContent = secondsRemaining;
  } else scoreEL.textContent = 0 ;
  }
  // put the score at 0 and submit playername and score to local storage on highscores page
function submitScore(event) {
    if(secondsRemaining < 0){
      secondsRemaining = 0
    }
    event.stopPropagation();
    event.preventDefault();
  
    var playerName = playerNameEl.value;
  
    localStorage.setItem(playerName, secondsRemaining);
  
    window.location = "highscores.html";
  }
  // local storage for all highscores
function accessLeaderboard() {
    var leaderboard = [];
    var keys = Object.keys(localStorage);
    var key;
  
    for (j = 0; (key = keys[j]); j++) {
      leaderboard.push(key + ":  " + localStorage.getItem(key));
    }
  
    return leaderboard;
  }
  //Add subs to leaderboard, will be shown on highscores page
function showLeaderboard() {
    leaderboard = accessLeaderboard();
    for (k = 0; k < leaderboard.length; k++) {
      var addScoreEl = document.createElement("li");
      addScoreEl.textContent = leaderboard[k];
      scoresListEL.appendChild(addScoreEl);
    }
}  
