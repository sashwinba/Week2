const modal = document.querySelector(".modal");
const inputModal = document.querySelector(".inputModal");
const slider = document.querySelector("input[type=range]");
const cntOutput = document.querySelector("#matches");
const resetButton = document.querySelector("button");
const closeButton = document.querySelector(".close-button");
const submit = document.querySelector("form");
const p1 = document.querySelector("#player1");
const p2 = document.querySelector("#player2");
const player1holder = document.querySelector("#player1Name");
const player2holder = document.querySelector("#player2Name");
const player1Score = document.querySelector("#player1Score");
const player2Score = document.querySelector("#player2Score");
const remainingMatches = document.querySelector("#remainingMatches");
const section = document.querySelector("section");
const result = document.querySelector(".result");
const XKey = document.querySelector("#XKey");

let board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let character = ["X" , "O"];
let turn = 0,totMove=0,matchOver=0,matchCnt = 0;
let player1="",player2="";
let scoreCnt = [0,0];

function toggleInput(){    
    inputModal.classList.toggle("show-modal");
    modal.style.backgroundImage = "none";
}

window.addEventListener("load", toggleInput);

cntOutput.innerHTML = slider.value;
slider.addEventListener("input", function(){
    cntOutput.innerHTML = this.value;
    matchCnt = this.value;
})

resetButton.addEventListener("click",function(){
    matchCnt++;
    reset();
});

function chkMatchOver(){
    modal.classList.toggle("show-modal");
    if(matchOver==1){
        matchOver = 0;
        toggleInput();    
    }else{
        reset();
    }
}
closeButton.addEventListener("click",chkMatchOver);
submit.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    player1holder.innerHTML = player1 = p1.value;
    player2holder.innerHTML = player2 = p2.value;
    character = (XKey.checked?["X" , "O"]:["O" , "X"]);
    scoreCnt = [0,0];
    matchCnt = slider.value;
    toggleInput();
    player1Score.innerHTML = scoreCnt[0];
    player2Score.innerHTML = scoreCnt[1];
    remainingMatches.innerHTML = matchCnt;
})

window.addEventListener("click",(event)=>{
    if(event.target===modal){
        chkMatchOver();
    }
});

function gameOver(){
    modal.classList.toggle("show-modal");
    matchOver = 1;
    if(scoreCnt[0] != scoreCnt[1]){
        result.innerHTML = `Player ${scoreCnt[0]>scoreCnt[1]? `1: ${player1}`: `2: ${player2}`} wins the Game`;
    }else{
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
    }else{
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
    player1Score.innerHTML = scoreCnt[0];
    player2Score.innerHTML = scoreCnt[1];
    matchCnt--;
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
    }else if(totMove==9){
        resultPrint(-1);
    }
}

function process(blk){
    let blkId = blk.getAttribute("id");
    let i = parseInt(blkId[3]),j = parseInt(blkId[4]);
    if(board[i][j]==-1){
        blk.textContent = character[turn];
        board[i][j] = turn;
        totMove++;
        chkBoard(i,j,turn);
        turn = 1 - turn;    
    }
}

section.addEventListener("click", event =>process(event.target));
