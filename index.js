const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/index")
require("./config/db")

app.use(cors());
app.use(express.json());

app.use("/api", route);

app.get("/", async (req, res) => {
    res.send("Welcome To User Management Web App");
})


app.listen(5000, () => {
    console.log("Server is running on http://127.0.0.1:5000");
})