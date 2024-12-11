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

        const newMove = await addMove({ game_id, player_id, move });
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
