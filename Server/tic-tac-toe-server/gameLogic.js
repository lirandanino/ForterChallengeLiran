// gameLogic.js

function validateMove(board, row, col) {
    if (row < 0 || row >= 3 || col < 0 || col >= 3 || board[row][col] !== '') {
        return false; // Invalid move
    }
    return true; // Valid move
}

function checkWin(board) {
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return true; // Row win
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return true; // Column win
        }
    }

    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true; // Diagonal (top-left to bottom-right) win
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true; // Diagonal (top-right to bottom-left) win
    }

    return false; // No win
}

function checkTie(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false; // If there's an empty cell, game is not tied
            }
        }
    }
    return true; // If no empty cells left, game is tied
}
module.exports = {
    validateMove,
    checkWin,
    checkTie
};