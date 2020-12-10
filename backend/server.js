const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize, User } = require("./dbConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
  console.log("Listening on post 3000");
});

module.exports = { app, User, sequelize, bcrypt, jwt };

require("./routes/create-account-route");
require("./routes/login-route");
require("./routes/auth-token-check");
