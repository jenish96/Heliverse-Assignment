const express = require("express");
const app = express();
const userRoute = require("./user");
const teamRoute = require("./team");

app.use("/users", userRoute);
app.use("/team",teamRoute);

module.exports = app