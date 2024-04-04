const express = require("express");
const { getUsers, newUser, getUserById, updateUser, deleteUser, getUserByName, getFilterUsers, getFilterValues } = require("../controller/userController");
const app = express();

app.get("/", getUsers);
app.get("/filterValues", getFilterValues);
app.get("/filter", getFilterUsers);
app.get("/:id", getUserById);
app.get("/search/:name", getUserByName);
app.post("/new", newUser);
app.put("/:id", updateUser);
app.delete("/:id", deleteUser);

module.exports = app