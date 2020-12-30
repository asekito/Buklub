const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize, User, UserBookDetail, Book, Op } = require("./dbConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
  console.log("Listening on post 3000");
});

module.exports = {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
  Book,
  Op,
};

require("./routes/Auth/create-account-route");
require("./routes/Auth/login-route");
require("./routes/Auth/auth-token-check");
require("./routes/ReadProfile/get-books-history");
require("./routes/ReadProfile/get-books-history-favorites");
require("./routes/ReadProfile/patch-book-history");
require("./routes/ReadProfile/post-book-history");
require("./routes/get-book-collection");
