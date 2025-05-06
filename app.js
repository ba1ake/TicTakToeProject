//Start of functions used for the game
const populateBoard = (start) => { // used to allow a preplayed board to be "loaded" into the game for test cases
    return (start ? start : [[0,0,0],[0,0,0],[0,0,0]]);
}

const displayBoard = (board) => { // prints the board in the console in a readable font, while also displaying columns and rows for the players to use for input
    console.log("   --1---2---3-");
    cords = ["A:","B:","C:"];
    for (i in board) { // goes through each sub array
        console.log(`${cords[i]} | ${board[i].join(' | ')}`); // this combines line by line the board into a string for the console to print, also includes spacing and the row letters
        console.log("   ------------");
    }
}

const boardConvert = (board) => { // this will convert the board into numbers for the game to use to claculate the win
    boardConverted = [[0,0,0],[0,0,0],[0,0,0]]; // this will create a new board to be used for the game to check for a win
    for (i in board) { // checks the subarrays
        for (x in board[i]) { //checks the values in the sub array
            boardConverted[i][x] = board[i][x] === "X" ? 1 : board[i][x] === "O" ? 10 : 0; // if x return 1 if o return 10 and if 0 keep 0
        }
    }
    return boardConverted; // return a "numberised" board, for using to calculate the winner
}

const checkState = (board) => {
    board = boardConvert(board); // this will assign a converted board to check in this function
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
        let value = 0 // zeros the check var each time
        for (x in requiredChecks[i]) {
            value += requiredChecks[i][x]; // this will sum up the values of the row into a single value
        }
        if (value == 3) { // this checks if player 1 has won
            console.log("Player 1 has won!");
            return true; // true if there is a winner, false if there isnt
        } else if (value == 30) { // this checks if player 2 has won
            console.log("Player 2 has won!");
            return true; // true if there is a winner, flase if there isnt 
        } 
    }
}

const getPLayerMove = () => { // this wil randomise the input for the player 
    let row = Math.round(Math.random() * 2); // generates a x input
    let col = Math.round(Math.random() * 2); // generates a y input
    return [row, col]; // returns as an array
}

// this function takes the current board, and the players move, checks if the move is valid, and if it is it will return true for another function to place the move on the board
const checkPlayerMove = (board, move) => { // this will check if the move is valid, and if true it will return true
    return (board[move[0]][move[1]] != 0 ? false : true);
}

const placeMove = (player, move, board) => { // this will place the move on the board depending on the player
    board[move[0]][move[1]] = player === 1 ? "X" : "O"; // checks what player needs to be placed
    return board; // this returns the updated board to be used in the game
}

const turn = (player, gameState) => {
    let playerMove = getPLayerMove(); // makes random move assigns to a varible since it is used in two different arguments.
    return(checkPlayerMove(gameState, playerMove) && placeMove(player, playerMove, gameState)) ? true : false; // if move is free, place move and return true
}

// Game Logic

board = false;
player = 1; // who starts first
turns = 0; // turn coutner
let gameState = populateBoard(board); // this will start the game with a fresh board, if no preloaded one 

 while (true) {
    if (turn(player, gameState)) { // this will check if the move was valid and place it on the board
        displayBoard(gameState); // updates display
        player = player == 1 ? 2 : 1; // this will switch the player from 1 to 2 or 2 to 1
        turns += 1;
    }
    if (checkState(gameState)) { // this will check the board for a win
        console.log("Game Over");
        break; // this will end the game if there is a winner
    }
    else if (turns == 9) {
        console.log("Game Over, Tie");
        break; // this will end the game if there is a tie
    } 
 }