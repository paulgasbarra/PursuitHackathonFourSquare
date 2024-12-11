const express = require('express');
const moves = express.Router();
const { addMove, getGameMoves, getLatestMove } = require("../queries/moves");

//ADD a move
moves.post("/", async (req, res) => {
    try {
        const { game_id, player_id, move } = req.body;

        if (move < 1 || move > 7) {
            throw new Error("Invalid move: Colum must be between 1 and 7. ");
        }
        const latestMove = await getLatestMove(game_id);

        //IS IT THE CORRECT PLAYER'S TURN????
        if (latestMove && latestMove.player_id === player_id) {
            throw new Error("It's not this player's turn.");
        }
        //CHECK IF COLUMN IS FULL
        const movesInColumn = await pool.query("SELECT COUNT(*) FROM games_moves WHERE game_id = $1 AND move = $2", [game_id, move]
        );

        if (parseInt(movesInColumn.rows[0].count, 10) >= 6) {
            throw new Errorr("This column is full.");
        }
        //ADDING THE MOVE
        const newMove = await addMove({ game_id, player_id, move });

        //GET the current board
        const moves = await getGameMoves(game_id);
        const board = Array(6).fill(null).map(() => Array(7).fill(null));

        //Populate the board
        moves.forEach(({ move: col, player_id: pid }) => {
            for (let row = 5; row >= 0; row--) {
                if (!board[row][col - 1]) {
                    board[row][col - 1] = pid;
                    break;
                }
            }
        });

        //CHECK FOR A WINNING MOVE

        let isWin = false;
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (board[row][col] === player_id) {
                    if (isWinningMove(board, row, col, player_id)) {
                        isWin = true;
                        break;
                    }
                }
            }
        }
        //IF WIN UPDATE GAME STATUS
        if (isWin) {
            await pool.query("UPDATE games SET winner_id = $1, status = 'completed' WHERE id= $2", [player_id, game_id]
            );

        }
        //Check if game ends in a draw
        const isDraw = moves.length >= 42;
        if (isDraw) {
            await pool.query("UPDATE games SET status = 'draw' WHERE id = $1", [game_id]
            );
        }
        res.status(201).json({ payload: newMove });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// GET all moves for a game
moves.get("/:game_id", async (req, res) => {
    try {
        const { game_id } = req.params;
        const moves = await getGameMoves(game_id);
        res.status(200).json({ payload: moves });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = moves;
