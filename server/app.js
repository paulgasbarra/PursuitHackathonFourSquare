const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Connect 4!");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
