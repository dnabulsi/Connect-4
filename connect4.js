var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

const rows = 6;
const columns = 7;
var currColumns;

if (sessionStorage.getItem("scoreRed") === null) {
    sessionStorage.setItem("scoreRed", 0);
  }

if (sessionStorage.getItem("scoreYellow") === null) {
    sessionStorage.setItem("scoreYellow", 0);
}

scoreRed = parseInt(sessionStorage.getItem("scoreRed"));
scoreYellow = parseInt(sessionStorage.getItem("scoreYellow"));

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    document.getElementById("score-red").innerHTML=scoreRed;
    document.getElementById("score-yellow").innerHTML=scoreYellow;
    

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS
            row.push(' ');

            //HTML
            // <div id="index as 0-0 1-1" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //"0-0" -> ["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        document.getElementById("current-player").innerText = "Yellow";
        document.getElementById("current-player").style.color = "yellow";
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        document.getElementById("current-player").innerText = "Red";
        document.getElementById("current-player").style.color = "red";
    }

    r -= 1; //updating the row height for the column
    currColumns[c] = r //update the array

    checkWinner();
}

function checkWinner() {

    // horizontally (sliding window)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]) {
                    setWinner(r, c, scoreRed, scoreYellow);
                    return;
                } else if (board[r][c] == board[r-1][c+1] && board[r][c] == board[r-2][c+2] && board[r][c] == board[r-3][c+3]) {
                    setWinner(r, c, scoreRed, scoreYellow);
                    return;
                }
            }
        }
    }

    // vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r][c] == board[r+2][c] && board[r][c] == board[r+3][c]) {
                    setWinner(r, c, scoreRed, scoreYellow);
                    return;
                }
            }
        }
    }

    // anti-diagonally  
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r][c] == board[r+2][c+2] && board[r][c] == board[r+3][c+3]) {
                    setWinner(r, c, scoreRed, scoreYellow);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c, scoreRed, scoreYellow) {
    let gameText = document.getElementById("game-text");
    if (board[r][c] == playerRed) {
        gameText.innerText = "RED WINS!";
        gameText.style.color = "red";
        gameText.style.fontWeight = "bold";
        scoreRed = scoreRed + 1;
        document.getElementById("score-red").innerHTML=scoreRed;
        sessionStorage.setItem("scoreRed", scoreRed.toString());
        newGame();
    } else {
        gameText.innerText = "YELLOW WINS!";
        gameText.style.color = "yellow";
        gameText.style.fontWeight = "bold";
        scoreYellow = scoreYellow + 1;
        document.getElementById("score-yellow").innerHTML=scoreYellow;
        sessionStorage.setItem("scoreYellow", scoreYellow.toString());
        newGame();
    }
    gameOver = True;    
}

function newGame() {
    document.getElementById("play-again").style.display = "flex";
}