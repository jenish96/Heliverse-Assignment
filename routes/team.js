const express = require("express");
const { getTeam, newTeam, getAllTeam } = require("../controller/teamController");
const app = express();

app.get("/all",getAllTeam);
app.get("/:id", getTeam);
app.post("/", newTeam);

module.exports = app