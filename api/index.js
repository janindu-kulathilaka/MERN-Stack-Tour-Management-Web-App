const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(
  cors({
    creadientials: true,
    origin: "http://localhost:5173",
  })
);

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

//cvs5ZrrReuHNFq7E - database password user name - booking
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name, email, password });
  res.json({ name, email, password });
});

app.listen(4000);
