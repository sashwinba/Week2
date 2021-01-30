let board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let character = ["X" , "O"];
let turn = 0,totMove=0;

function result(player){
    alert("player " + player );
}

function reset(){
    turn = totMove = 0;
    for(let row=0;row<3;row++){
        for(let col=0;col<3;col++){
            board[i][j] = -1;
            let blkId = "blk" + row.toString() + col.toString();
            const blk = document.querySelector("#" + blkId);
            blk.textContent = "";
        }
    }
}

function chkBoard(row,col,player){
    let cntR=0,cntC=0,cntLD=0,cntRD=0;
    for(let itr=0;itr<3;itr++){
        cntR+=(board[row][itr]==player?1:0);
    }

    if(cntR==3){
        result(player);
    }

    for(let itr=0;itr<3;itr++){
        cntC+=(board[itr][col]==player?1:0);
    }

    if(cntC==3){
        result(player);
    }


    if(row==col){
        for(let itr=0;itr<3;itr++){
            cntLD+=(board[itr][itr]==player?1:0);
        }

        if(cntLD==3){
            result(player);
        }
    }

    if(row+col==2){
        for(let itr=0;itr<3;itr++){
            cntRD+=(board[itr][2-itr]==player?1:0);
        }

        if(cntRD==3){
            result(player);
        }
    }

    if(totMove==9){
        result(-1);
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
        console.log(i,j,totMove,turn);
        chkBoard(i,j,turn);
        turn = 1 - turn; 
        
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
