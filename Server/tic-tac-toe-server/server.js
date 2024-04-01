const express = require('express');
const cors = require('cors');

const {
    validateMove,
    checkWin,
    checkTie
} = require('./gameLogic');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Game state
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Endpoint to handle player moves
app.post('/move', (req, res) => {
    const {
        row,
        col
    } = req.body;
    console.log('req.body:', req.body);

    // Validate move
    if (!validateMove(board, row, col)) {
        return res.status(400).json({
            error: 'Invalid move'
        });
    }

    const currentPlayer = getCurrentPlayer(board);
    board[row][col] = currentPlayer;
    console.log('board[row][col]:', board[row][col]);

    // Check game result
    if (checkWin(board)) {
        return res.json({
            result: 'win',
            winner: currentPlayer
        });
    } else if (checkTie(board)) {
        return res.json({
            result: 'tie'
        });
    }
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return res.json({
        result: 'next',
        nextPlayer,
        board
    });
});


// Endpoint to handle click on start new game button
app.post('/new-game', (req, res) => {
    // Reset the game state
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    res.json({
        board
    });
});

function getCurrentPlayer(board) {
    let xCount = 0;
    let oCount = 0;
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 'X') {
                xCount++;
            } else if (board[row][col] === 'O') {
                oCount++;
            }
        }
    }
    return xCount === oCount ? 'X' : 'O';
}


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});