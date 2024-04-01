const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/index")
require("./config/db")

app.use(express.json());
app.use(cors());

app.use("/api", route);
app.get("/", async (req, res) => {
    res.send("Hello");
})


app.listen(5000, () => {
    console.log("Server is running on http://127.0.0.1:5000");
})