const express = require("express");
const { getTeam, newTeam } = require("../controller/teamController");
const app = express();

app.get("/:id", getTeam);
app.post("/", newTeam);

module.exports = app