const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Connect 4!");
});

app.get("*", (req, res) => {
  res.status(404).send("The request you are looking for does not exist!");
});

module.exports = app;
