// declare all required variables 
let gameStartBtn = document.querySelector("#gameBeginBtn");
let mainContent = document.querySelector("#main-content");

let timerContent = document.createElement('h6');

let questionContent = document.createElement('div');

let finalResultContent = document.createElement('div');
// create score div section to display the resultes, number of right and wrongs.
let rightWrongContent = document.createElement('div');
rightWrongContent.setAttribute('class','mt-2 text-center');
let lineDivider = document.createElement('hr');
let currentResultContent = document.createElement('h5');
currentResultContent.setAttribute('class','text-info');
currentResultContent.innerText = 'Correctly Answered: 0/0';
rightWrongContent.appendChild(lineDivider);
rightWrongContent.appendChild(currentResultContent);
// current answered question counter
let correctNumCounter = 0;

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
            // below line is to make sure there are no negative scores/seconds
            if (secondsLeft < 0)
            { 
                secondsLeft =0;
                generateFinalScore();
            }
        }
        else 
        {
            // if answer correctly, increment the number of correctly answered
            correctNumCounter++;
        }
        // create the display messsage for the result content
        let currentQuestionsNum = questionIndex+1;
        currentResultContent.innerText = 'Correctly Answered: '+ correctNumCounter + '/' + currentQuestionsNum;
        // loop through all the questions till all questions is answered or game ended, display final score
        if(questionIndex < 5 && !gameEnded)
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
    mainContent.appendChild(rightWrongContent);
    
}

// when generate next question
// - clear up the question content
// - add new question content to main content
function generateNextQuestion()
{
    questionContent.innerHTML ='';
    createDOMQuestion(QandAList[questionIndex]);
    mainContent.appendChild(questionContent);
    mainContent.appendChild(rightWrongContent);
}

// when generate final score
// - clear up the question content, main content and timer content
// - end game, stop counter
// - add final finalResultContent content to the main content

function generateFinalScore()
{
    gameEnded = true;
    mainContent.innerHTML = '';
    questionContent.innerHTML = '';
    finalResultContent.innerHTML = '';
    timerContent.innerHTML ='';
    // rightWrongContent.innerHTML = '';
    createDOMResult();
    mainContent.appendChild(finalResultContent);
    mainContent.appendChild(rightWrongContent);
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
        finalResultContent.appendChild(section);
        
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

        if(secondsLeft <= 0) {
        // when time runs out, clear time interval and display final score
        clearInterval(timerInterval);
        secondsLeft =0;
        generateFinalScore();
        }
    }

  }, 1000);
}
