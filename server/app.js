const express = require("express");
const app = express();
const db = require("./database/dbConfig");
const playersController = require("./controllers/players");
const gamesController = require("./controllers/games");
const movesController = require("./controllers/moves");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Connect 4!");
});

app.use("/players", playersController)

app.use("/games", gamesController);

app.use("/moves", movesController);
/*
app.get("/players/:username", async (req, res) => {
  console.log("GET /players");
  // console.log("username: " + req.params.username)
  try {
    const { rows } = await db.query("SELECT * FROM players WHERE username = $1", [req.params.username]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while retrieving players");
  }
});
*/
app.get("*", (req, res) => {
  res.status(404).send("The request you are looking for does not exist!");
});

module.exports = app;
