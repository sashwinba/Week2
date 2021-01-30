let board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let character = ["X" , "O"];
let turn = 0;

function chkBoard(){
    for(let player=0;player<=1;player++){

        
    }
}

function process(blk){
    let blkId = blk.getAttribute("id");
    let i = parseInt(blkId[3]);
    let j = parseInt(blkId[4]);
    
    if(board[i][j]==-1){
        blk.textContent = character[turn];
        board[i][j] = turn;
        turn = 1 - turn; 
        chkBoard();
    }
}

for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
        let blkId = "blk" + i.toString() + j.toString();
        const blk = document.querySelector("#" + blkId);
        blk.addEventListener("click",function(){
            process(this);
        });
    }
}
