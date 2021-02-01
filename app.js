let board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let character = ["X" , "O"];
let turn = 0,totMove=0,matchOver=0;
let player1="";
let player2="";
let scoreCnt = [0,0];
let matchCnt = 0;
const modal = document.querySelector(".modal");
const inputModal = document.querySelector(".inputModal");

function toggleInput(){    
    inputModal.classList.toggle("show-modal");
    modal.style.backgroundImage = "none";
}

window.addEventListener("load", toggleInput);

const slider = document.querySelector("input[type=range]");
const cntOutput = document.querySelector("#matches");
cntOutput.innerHTML = slider.value;
slider.addEventListener("input", function(){
    cntOutput.innerHTML = this.value;
    matchCnt = this.value;
})

const button = document.querySelector("button");
button.addEventListener("click",function(){
    matchCnt++;
    reset();
});

const closebutton = document.querySelector(".close-button");
closebutton.addEventListener("click",function(){
    modal.classList.toggle("show-modal");
    if(matchOver==1){
        matchOver = 0;
        toggleInput();    
    }
    else{
        reset();
    }
});

const submit = document.querySelector("form");
const p1 = document.querySelector("#player1");
const p2 = document.querySelector("#player2");
const player1holer = document.querySelector("#player1Name");
const player2holer = document.querySelector("#player2Name");

submit.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    
    player1holer.innerHTML = p1.value;
    player1 = p1.value;

    player2holer.innerHTML = p2.value;
    player2 = p2.value;

    let XKey = document.querySelector("#XKey");
    if(XKey.checked){
        character = ["X" , "O"];
    }
    else{
        character = ["O" , "X"];
    }

    scoreCnt = [0,0];
    matchCnt = slider.value;

    toggleInput();

    let player1Score = document.querySelector("#player1Score");
    player1Score.innerHTML = scoreCnt[0];

    let player2Score = document.querySelector("#player2Score");
    player2Score.innerHTML = scoreCnt[1];

    let remainingMatches = document.querySelector("#remainingMatches");
    remainingMatches.innerHTML = matchCnt;

    
})

window.addEventListener("click",function(event){
    
    if(event.target===modal){
        modal.classList.toggle("show-modal");
        if(matchOver==1){
            matchOver = 0;
            toggleInput();
        }
        else{
            reset();
        }
    }
});

const result = document.querySelector(".result");
function gameOver(){
    modal.classList.toggle("show-modal");
    matchOver = 1;
    if(scoreCnt[0] != scoreCnt[1]){
        result.innerHTML = `Player ${scoreCnt[0]>scoreCnt[1]? `1: ${player1}`: `2: ${player2}`} wins the Game`;
    }
    else{
        result.innerHTML = 'Game Ends in a Draw.'
    } 
    modal.style.backgroundImage = `url(img/confetti.jpg)`;
}

function resultPrint(player){
    modal.classList.toggle("show-modal");
    modal.style.backgroundImage = "none";

    if(player>=0){
        result.innerHTML = `Player ${player+1}: ${player==0?player1:player2} Wins`;
        scoreCnt[player]++;
    }
    else{
        result.innerHTML = `Match Draw`;
    }
}

function reset(){
    turn = totMove = 0;
    for(let row=0;row<3;row++){
        for(let col=0;col<3;col++){
            board[row][col] = -1;
            let blkId = "blk" + row.toString() + col.toString();
            const blk = document.querySelector("#" + blkId);
            blk.textContent = "";
        }
    }

    let player1Score = document.querySelector("#player1Score");
    player1Score.innerHTML = scoreCnt[0];

    let player2Score = document.querySelector("#player2Score");
    player2Score.innerHTML = scoreCnt[1];

    matchCnt--;
    let remainingMatches = document.querySelector("#remainingMatches");
    remainingMatches.innerHTML = matchCnt;

    if(matchCnt==0 || Math.abs(scoreCnt[0] - scoreCnt[1]) > matchCnt){
         gameOver();
    }
}

function chkBoard(row,col,player){
    let cntR=0,cntC=0,cntLD=0,cntRD=0;
    for(let itr=0;itr<3;itr++){
        cntR+=(board[row][itr]==player?1:0);
    }
    
    for(let itr=0;itr<3;itr++){
        cntC+=(board[itr][col]==player?1:0);
    }
    
    if(row==col){
        for(let itr=0;itr<3;itr++){
            cntLD+=(board[itr][itr]==player?1:0);
        }
    }
    
    if(row+col==2){
        for(let itr=0;itr<3;itr++){
            cntRD+=(board[itr][2-itr]==player?1:0);
        }
    }

    if(cntC==3 || cntR==3 || cntLD==3 || cntRD==3){
        resultPrint(player);
    }
    else if(totMove==9){
        resultPrint(-1);
    }
}

function process(blk){
    let blkId = blk.getAttribute("id");
    let i = parseInt(blkId[3]);
    let j = parseInt(blkId[4]);
    
    if(board[i][j]==-1){
        blk.textContent = character[turn];
        board[i][j] = turn;
        totMove++;
        chkBoard(i,j,turn);
        turn = 1 - turn;    
    }
}

const section = document.querySelector("section");
section.addEventListener("click", function(event){
    process(event.target);
});
