const express = require("express");
const app = express();
// const gameController = require('./controllers/game');

app.get("/", (req, res) => {
  res.send("Welcome to Connect 4");
});

// const game = express.Router()
// Create a new game
// game.post(‘/‘, (req,res) => {
// try {
// const {player1, player2} = req.body
// if (!player1 || !player2) {
// return res.status(400).json({ error: "Both players are required" });
// }
// const initialBoard = Array(6) .fill(null) .map(() => Array(7).fill(0));
// res.status(201).json(newGame.rows[0]);
// } catch (error) {
// console.error(err.message); res.status(500).json({ error: "Server error" });
// }
// }

app.get("*", (req, res) => {
  res.status(404).send("The request you are looking for does not exist!");
});

module.exports = app;
