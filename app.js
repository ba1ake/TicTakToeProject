//Start of functions used for the game


function populateBoard(start) { // used to allow a preplayed board to be "loaded" into the game for test cases
    if (start) { // if true, game will use the preplayed board
        return(start);
    } else; { // if the board is empty, or some form of error occurs the game will start from a fresh board
        return([[0,0,0],[0,0,0],[0,0,0]]);
    }
}

function displayBoard(board) { // prints the board in the console in a readable font, while also displaying columns and rows for the players to use for input
    console.log("   --1---2---3-")
    cords = ["A:","B:","C:"]
    for (i in board) {
        console.log(cords[i] + (" | ") + board[i].join(" | ")); // this combines line by line the board into a string for the console to print, also includes spacing and the row letters
        console.log("   ------------")
    }

}
function boardConvert(board) { // this will convert the board into numbers for the game to use to claculate the win
    for (i in board) {
        for (x in board[i]) {
            if (board[i][x] == "X")  // player 1 is X and is given a value of 1
                board[i][x] = 1;
            else if (board[i][x] == "O") //player 2 is O and is given a value of 10
                board[i][x] = 10;
            else if (board[i][x] == 0) // spaces kep the value of 0
                board[i][x] = 0;
            
        }
    }
    return board;
}

function checkState(board) {
    board = boardConvert(board); // this will convert the board into numbers for the game to use to claculate the win
    requiredChecks = [ // these are all the possible rows, columns and diagonals that can be uesr to check for a win, these are all assigned a value of 0, 1 or 10 depending on the player
        [board[0][0], board[0][1], board[0][2]], // row 1
        [board[1][0], board[1][1], board[1][2]], // row 2
        [board[2][0], board[2][1], board[2][2]], // row 3
        [board[0][0], board[1][0], board[2][0]], // column 1
        [board[0][1], board[1][1], board[2][1]], // column 2
        [board[0][2], board[1][2], board[2][2]], // column 3
        [board[0][0], board[1][1], board[2][2]], // diagonal 1
        [board[0][2], board[1][1], board[2][0]]  // diagonal 2
    ]
    for (i in requiredChecks) { // this will loop though all the checks, it will add the sum of each row, and depending on the sum it will detirmine if there is a winner.
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

//NOTE - this functions converts the tics or tacs into numbers, which then are summed up to check for a win, rahter than checking each row of the array and checking if either X or O. 
// means for each row only 1 comparison is needed, rather than 3. 


// Logic Start for game //
//[[0,0,0],[0,0,0],[0,0,0]]


board = [[0,0,"X"],[0,0,"X"],[0,0,"X"]]
let gameState = populateBoard(board) // this will start the game with a fresh board
displayBoard(gameState)
checkState(gameState) // this will check the board for a win or draw
