let gameBtn = document.querySelector("#gameBeginBtn");
let mainContent = document.querySelector("#main-content");
let questionContent = document.createElement('div');


let QandA = {
    questionName : 'Inline CSS is applies a unique style over?',
    questionAnsers: ['Single element', 'Multiple elements','Whole document', 'Half document'],
    correctAnswer: 'Single element'
};


gameBtn.addEventListener('click', function()
{
    mainContent.innerHTML = '';
    let newContent = createDOMQuestion(QandA);
    mainContent.appendChild(newContent);

});

function createDOMQuestion(QandA)
{   
    // let answerArray = ['Single element', 'Multiple elements','Whole document', 'Half document'];
    let answerArray = QandA.questionAnsers;
    let quizQuestion = document.createElement('h2');
    let quizAnswers = document.createElement('div');
    quizAnswers.setAttribute('class','container');

    answerArray.forEach(element => {
        let answerRow = document.createElement('div');
        answerRow.setAttribute('class','row');
        let answerCol = document.createElement('div');
        answerCol.setAttribute('class','col');
        answerRow.appendChild(answerCol);

        let answerBtn = document.createElement('button')
        answerBtn.setAttribute('class','m-2 btn btn-secondary btn-lg');
        answerBtn.textContent = element;
        answerCol.appendChild(answerBtn);
        quizAnswers.appendChild(answerRow);
    });


    // quizQuestion.innerHTML = 'Inline CSS is applies a unique style over?';
    quizQuestion.innerHTML = QandA.questionName;
    questionContent.appendChild(quizQuestion);
    questionContent.appendChild(quizAnswers);

    questionContent.addEventListener('click', function(event){
        let element = event.target;
        if (element.matches("button")) {

            if(QandA.correctAnswer ===element.textContent )
            {
                alert("You Picked Correctly!");
            }
        }
    });
    return questionContent;

}