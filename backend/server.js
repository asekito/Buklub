const express = require("express");
const app = express();
require("dotenv").config();
const { sequelize, User } = require("./dbConnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/login", (req, res) => {
  console.log("hi");
  res.status(201).send({ body: "get request api login" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  const validPassword = await bcrypt.compare(password, user.password);

  if (user) {
    if (!validPassword) {
      return res
        .status(401)
        .send({ auth: false, token: null, error: "Incorrect password." });
    }
    const accessToken = jwt.sign(
      { username: user.username },
      { expiresIn: 21600 }, // expires in 6 hours
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.send({ auth: true, token: accessToken });
  } else {
    return res.status(401).send({ auth: false, error: ["User not found"] });
  }
});

app.post("/api/create-account", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      return res.status(401).send({ error: ["Already existing user."] });
    }

    const transaction = await sequelize.transaction();

    const newUser = await User.create(
      {
        userName: username,
        firstName: firstname,
        lastName: lastname,
        password: hashedPassword,
      },
      { transaction }
    );

    await transaction.commit();

    const token = jwt.sign(
      { id: newUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 21600 }
    );

    return res.status(200).send({ auth: true, token: token });
  } catch (err) {
    await transaction.rollback();
    return res
      .status(500)
      .send({ error: ["Error registering user. Try again."] });
  }
});

app.listen(3000, () => {
  console.log("Listening on post 3000");
});
