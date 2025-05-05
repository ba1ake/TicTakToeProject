//Start of functions used for the game
const populateBoard = (start) => { // used to allow a preplayed board to be "loaded" into the game for test cases
    if (start) { // if true, game will use the preplayed board
        return(start);
    } else; { // if the board is empty, or some form of error occurs the game will start from a fresh board
        return([[0,0,0],[0,0,0],[0,0,0]]);
    }
}

const displayBoard = (board) => { // prints the board in the console in a readable font, while also displaying columns and rows for the players to use for input
    console.log("   --1---2---3-")
    cords = ["A:","B:","C:"]
    for (i in board) {
        //console.log(cords[i] + (" | ") + board[i].join(" | ")); // this combines line by line the board into a string for the console to print, also includes spacing and the row letters
        console.log(`${cords[i]} | ${board[i].join(' | ')}`); // this combines line by line the board into a string for the console to print, also includes spacing and the row letters
        console.log("   ------------")
    }
}

const boardConvert = (board) => { // this will convert the board into numbers for the game to use to claculate the win
    boardConverted = [[0,0,0],[0,0,0],[0,0,0]]; // this will create a new board to be used for the game to check for a win
    for (i in board) {
        for (x in board[i]) {
            if (board[i][x] === "X")  // player 1 is X and is given a value of 1
                boardConverted[i][x] = 1;
            else if (board[i][x] === "O") //player 2 is O and is given a value of 10
                boardConverted[i][x] = 10;
            else if (board[i][x] === 0) // spaces kep the value of 0
                boardConverted[i][x] = 0;       
        }
    }
    return boardConverted;
}

const checkState = (board) => {
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

const getPLayerMove = () => { // this wil randomise the input for the player 
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    return [row, col];
}

// this function takes the current board, and the players move, checks if the move is valid, and if it is it will return true for another function to place the move on the board
const checkPlayerMove = (board, move) => { // this will check if the move is valid, and if it is, it will place the players move on the board
    if (board[move[0]][move[1]] != 0) { // this checks if the space is already taken, if value is zero it is empty, if not it is taken
        //console.log("Space already taken")
        return false;
    } else { 
        return true; // this returns true to show that the move was valid and ready to be placed on the board
    }
}

const placeMove = (player, move, board) => { // once the move is apporved byt CheckPlayerMove, this will place the move on the board depending on the player
    if (player == 1) { 
        board[move[0]][move[1]] = "X"; 
    } else if (player == 2) { 
        board[move[0]][move[1]] = "O"; 
    }
    return board; // this returns the updated board to be used in the game
}

const turn = (player, gameState)  =>{
    let playerMove = getPLayerMove()
    if (checkPlayerMove(gameState, playerMove) && placeMove(player, playerMove, gameState)) {
        return true;
    }
    else { 
        return false; // this returns false to show that the move was invalid and not placed on the board
    }
}

// Game Logic

board = false
player = 1
turns = 0
let gameState = populateBoard(board) // this will start the game with a fresh board

 while (true) {
    if (turn(player, gameState)) { // this will check if the move was valid and place it on the board
        displayBoard(gameState) // updates display
        player = player == 1 ? 2 : 1; // this will switch the player from 1 to 2 or 2 to 1
        turns += 1;
    }
    if (checkState(gameState)) { // this will check the board for a win
        console.log("Game Over")
        break; // this will end the game if there is a winner
    }
    else if (turns == 9) {
        console.log("Game Over, Tie")
        break; // this will end the game if there is a tie
    }
    
 }


//displayBoard(gameState) // updates display

//checkState(gameState) // this will check the board for a win


