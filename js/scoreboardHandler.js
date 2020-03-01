
// declare all required variables 
let clearBtn = document.querySelector('#clearBtn');
let playerRecords;
localStorage.getItem('PlayerRecords') !== null ? playerRecords = JSON.parse(localStorage.getItem('PlayerRecords')) : playerRecords = [];
let scoreTable = document.querySelector('#scoreTable');
let scoreTableBody = document.createElement('tbody');
scoreTable.appendChild(scoreTableBody);
let playerRecordsSorted = [];

// sort the player records table with the highest on top
playerRecords.sort(function(a, b){
    return a.score-b.score;
});
playerRecords.reverse();

// add all the record to score table.
for (let i=0;i<playerRecords.length;i++)
{
    console.log(playerRecords[i]);
    let tr = document.createElement('tr');
    let rank = document.createElement('th');
    let name = document.createElement('td');
    let score = document.createElement('td');
    rank.textContent = i+1;
    name.textContent = playerRecords[i].playerName;
    score.textContent = playerRecords[i].score;
    tr.appendChild(rank);
    tr.appendChild(name);
    tr.appendChild(score);
    scoreTableBody.appendChild(tr);
}

// When click clear, all the dom element as well as localstorage will be cleard.
clearBtn.addEventListener('click',function()
{
    localStorage.clear();
    scoreTableBody.innerHTML = '';

});