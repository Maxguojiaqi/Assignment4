// declare all required variables 
let gameStartBtn = document.querySelector("#gameBeginBtn");
let mainContent = document.querySelector("#main-content");
let questionContent = document.createElement('div');
let resultContent = document.createElement('div');
let timerContent = document.createElement('h6');

let secondsLeft = 60;
let gameEnded = false;
// questions will be object store in array
let QandA1 = {
    questionName : 'Inline CSS is applies a unique style over?',
    questionAnswers: ['Single element', 'Multiple elements','Whole document', 'Half document'],
    correctAnswer: 'Single element'
};
let QandA2 = {
    questionName : 'In HTML, tag used to specify background color is?',
    questionAnswers: ['<bg> yellow </bg>', '<body bg="black">','<body background="black">', '<body style="background-color:black">'],
    correctAnswer: '<body style="background-color:black">'
};
let QandA3 = {
    questionName : 'In HTML, element defining a table row is?',
    questionAnswers: ['<tablerow>', '<tabr>','<tr>', '<trow>'],
    correctAnswer: '<tr>'
};
let QandA4 = {
    questionName : 'HTML tag < pre > displays content in?',
    questionAnswers: ['Preferred form text', 'Preformatted txt','Pre-linked text', 'Prepared text format'],
    correctAnswer: 'Preformatted txt'
};
let QandA5 = {
    questionName : 'Regular expression in JavaScripts uses defined string method(s) known to be?',
    questionAnswers: ['search()', 'toString()','replace', 'Both replace and toString()'],
    correctAnswer: 'Both replace and toString()'
};
let QandA6 = {
    questionName : 'Method returning position of first occurrence of specified text in string is?',
    questionAnswers: ['Indexof()', 'lastIndexOf()','FirstIndexOf()', 'PointerIndexOf()'],
    correctAnswer: 'Indexof()'
};

let QandAList = [QandA1,QandA2,QandA3,QandA4,QandA5,QandA6];

let questionIndex = 0;

// add event listner to Begin button
gameStartBtn.addEventListener('click', generateFirstQuestion);
// add event listner to answer buttons
questionContent.addEventListener('click', function(event){
    let element = event.target;
    if (element.matches("button")) {

        if(QandAList[questionIndex].correctAnswer !== element.textContent )
        {
            secondsLeft = secondsLeft - 10;
            // below line is to make sure there are no negative scores
            secondsLeft > 0 ? secondsLeft : secondsLeft = 0;
            alert("You Picked Wrong! Your time will be deducted by 10!");
        }
        // loop through all the questions and display final score
        if(questionIndex < 5)
        {
            questionIndex++;
            generateNextQuestion();
        }
        else{
            generateFinalScore();
        }
    }
});

// when generate first question
// - clear up the main content
// - add timer section and start timer
// - add question content to main content
function generateFirstQuestion()
{
    mainContent.innerHTML = '';
    timerContent.setAttribute('class','text-danger');
    timerContent.textContent = "*** 60 seconds left till game end.";
    mainContent.appendChild(timerContent);
    setTime(timerContent);
    createDOMQuestion(QandAList[questionIndex]);
    mainContent.appendChild(questionContent);
}

// when generate next question
// - clear up the question content
// - add new question content to main content
function generateNextQuestion()
{
    questionContent.innerHTML ='';
    createDOMQuestion(QandAList[questionIndex]);
    mainContent.appendChild(questionContent);
}

// when generate final score
// - clear up the question content, main content and timer content
// - end game, stop counter
// - add final resultContent content to the main content

function generateFinalScore()
{
    gameEnded = true;
    mainContent.innerHTML = '';
    questionContent.innerHTML = '';
    resultContent.innerHTML = '';
    timerContent.innerHTML ='';
    createDOMResult();
    mainContent.appendChild(resultContent);
}

// Create DOM Question Content
// DOM Question Content uses bootstrap 'container' to construct layout

function createDOMQuestion(QandAItem)
{   
    let answerArray = QandAItem.questionAnswers;
    let quizQuestion = document.createElement('h2');
    let quizAnswers = document.createElement('div');
    quizAnswers.setAttribute('class','container');

    answerArray.forEach(element => {
        let answerRow = document.createElement('div');
        answerRow.setAttribute('class','row');
        let answerCol = document.createElement('div');
        answerCol.setAttribute('class','col');
        answerRow.appendChild(answerCol);

        let answerBtn = document.createElement('button');
        answerBtn.setAttribute('class','m-2 btn btn-secondary btn-lg');
        answerBtn.textContent = element;
        answerCol.appendChild(answerBtn);
        quizAnswers.appendChild(answerRow);
    });


    quizQuestion.innerHTML = QandAItem.questionName;
    questionContent.appendChild(quizQuestion);
    questionContent.appendChild(quizAnswers);
}

// Create DOM Result Content
// leverage bootstrap styling


function createDOMResult()
{
    // domSections will store all the dom elements need to be append to the body.
    let domSections = [];
    let resultHeader = document.createElement('h2');
    resultHeader.textContent = 'All Done, Your Final Score is: ' + secondsLeft + ' Points!';
    domSections.push(resultHeader);
    // based on different result, comment will be given.
    let resultComment = document.createElement('h4');
    if(secondsLeft >= 40)
    {
        resultComment.textContent = 'Good job!';
        resultComment.setAttribute('class','text-success');
    }
    else
    {
        resultComment.textContent = 'Maybe you need more study!';
        resultComment.setAttribute('class','text-danger');
    }
    domSections.push(resultComment);
    let resultBody = document.createElement('p');
    resultBody.textContent = 'Please enter your name: ';
    domSections.push(resultBody);
    let resultInput = document.createElement('input');
    resultInput.setAttribute('type','text');
    resultInput.setAttribute('id','finalResult');
    domSections.push(resultInput);
    let br = document.createElement('br');
    domSections.push(br);
    let resultSubmitBtn = document.createElement('a');
    resultSubmitBtn.setAttribute('class','m-2 btn btn-success disabled');
    resultSubmitBtn.setAttribute('href','html/scoreboard.html');
    resultSubmitBtn.textContent = 'Submit';
    domSections.push(resultSubmitBtn);
    // Use disable state to make sure there will be valid name input
    resultInput.addEventListener('change', function()
    {
        if(resultInput.value.trim()!='')
        {
            resultSubmitBtn.setAttribute('class','m-2 btn btn-success');
        }
        else{
            resultSubmitBtn.setAttribute('class','m-2 btn btn-success disabled');
        }
    });

    resultSubmitBtn.addEventListener("click", function(){
        let playerName = resultInput.value.trim();
        let currentPlayerRecord = {playerName : playerName, score : secondsLeft};
        let playerRecords = [];
        if(localStorage.getItem('PlayerRecords') !== null)
        {
            playerRecords = JSON.parse(localStorage.getItem('PlayerRecords'));
        }
        playerRecords.push(currentPlayerRecord);
        localStorage.setItem('PlayerRecords',JSON.stringify(playerRecords));
        
    });

    // append all the child in order
    domSections.forEach(section => {
        resultContent.appendChild(section);
        
    });
}

// Set time create a timer to display the current remaining times.

function setTime(timeEl) {
    let timerInterval = setInterval(function() {
    // if game ended, clear time interval
    if(gameEnded)
    {
        clearInterval(timerInterval);
    }
    else
    {
        secondsLeft--;
        timeEl.textContent ="*** " + secondsLeft + " seconds left till game end.";

        if(secondsLeft === 0) {
        // when time runs out, clear time interval and display final score
        clearInterval(timerInterval);
        generateFinalScore();
        }
    }

  }, 1000);
}
