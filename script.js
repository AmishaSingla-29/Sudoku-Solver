var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}


function isPossible(board, sr, sc, val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    var r = sr - sr % 3;
    var c = sc - sc % 3;

    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == val) {
                return false;
            }
        }
    }
    return true;

}


/* function isSafe(board,r,c,no){
    

     // not repeating in the same row or column
     for(var i=0;i<9;i++){
    if(board[i][c]==no || board[r][i]==no){
        return false;
     }
    }
// subgrid
    var sx=r-r%3;
    var sy=c-c%3;

    for(var x=sx;x<sx+3;x++){
    for(var y=sy;y<sy+3;y++){
    if(board[x][y]==no){
    return false;
               }
          }
    }
  return true;

}



*/

// you can make a call to changeboard(board) function to update the state on the screen
// returns a boolean true or false


function solveSudokuHelper(board, sr, sc) {
    //base case
    if (sr == 9) {
        changeBoard(board);
        return;
    }

    //other cases
    if (sc == 9) {
        solveSudokuHelper(board, sr + 1, 0)
        return;
    }
    // pre-filled cell,skip it
    if (board[sr][sc] != 0) {
        solveSudokuHelper(board, sr, sc + 1);
        return;
    }
// there is 0 in the current location
    for (var i = 1; i <= 9; i++) {

        /* for (var i = 1; i <= 9; i++) {
             if(isSafe(board,r,c,i)){
            board[r][c]=i;
            var success= solveSudokuHelper(board,r,c+1);
            if(success==true){
              return true;
            }
            //Back-tracking step
            board[r][c]=0;   // if back-track karte hue agar success nhi mili toh write 0
        }
    }

          return false;

        */
        if (isPossible(board, sr, sc, i)) {
            board[sr][sc] = i;
            solveSudokuHelper(board, sr, sc + 1);
            board[sr][sc] = 0;
        }
    }
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
    solveSudoku(board)

}