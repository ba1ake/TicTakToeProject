//Start of functions used for the game


function populateBoard(start) { // used to allow a preplayed board to be "loaded" into the game for test cases
    if (start) { // if true, game will use the preplayed board
        return(start);
    } else; { // if the board is empty, or some form of error occurs the game will start from a fresh board
        return([[0,0,0],[0,0,0],[0,0,0]]);
    }
}

function displayBoard(board) {
    console.log("---------")
    for (i in board) {
        console.log(board[i].join(" | ")); // this will display the board in a readable format
        console.log("---------")
    }

}
function boardConvert(board) { // this will convert the board into numbers for the game to use to claculate the win
    for (i in board) {
        for (x in board[i]) {
            if (board[i][x] == "X") 
                board[i][x] = 1;
            else if (board[i][x] == "O") 
                board[i][x] = 10;
            else if (board[i][x] == 0)
                board[i][x] = 0;
            
        }
    }
    return board;
}

function checkState(board) {
    board = boardConvert(board); // this will convert the board into numbers for the game to use to claculate the win
    requiredChecks = [ // this will check the board for a win or draw
        [board[0][0], board[0][1], board[0][2]], // row 1
        [board[1][0], board[1][1], board[1][2]], // row 2
        [board[2][0], board[2][1], board[2][2]], // row 3
        [board[0][0], board[1][0], board[2][0]], // column 1
        [board[0][1], board[1][1], board[2][1]], // column 2
        [board[0][2], board[1][2], board[2][2]], // column 3
        [board[0][0], board[1][1], board[2][2]], // diagonal 1
        [board[0][2], board[1][1], board[2][0]]  // diagonal 2
    ]
    for (i in requiredChecks) {
        let value = 0
        for (x in requiredChecks[i]) {
            value += requiredChecks[i][x]; // this will sum up the values of the row into a single value
        }
        if (value == 3) { // this checks if player 1 has won
            console.log("Player 1 has won!")
            return true;
        } else if (value == 30) { // this checks if player 2 has won
            console.log("Player 2 has won!")
            return true;
        } 
    }
}

//NOTE - this functions converts the tics or tacs into numbers, which then are summed up to check for a win, rahter than i


// Logic Start for game //
//[[0,0,0],[0,0,0],[0,0,0]]


board = [[0,0,"X"],[0,0,"X"],[0,0,"X"]]
let gameState = populateBoard(board) // this will start the game with a fresh board
displayBoard(gameState)
checkState(gameState) // this will check the board for a win or draw
