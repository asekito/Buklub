const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize, User } = require("./dbConnect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/login", (req, res) => {
  console.log("hi");
  res.status(201).send({ body: "get request api login" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user) {
    res.send({ body: "user present yall" });
  } else {
    res.send({ body: "none" });
  }
});

app.post("/api/create-account", (req, res) => {
  const { username, password } = req.body;
});

app.listen(3000, () => {
  console.log("Listening on post 3000");
});
