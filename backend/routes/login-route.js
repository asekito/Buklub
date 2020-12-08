const { app, User, sequelize, bcrypt, jwt } = require("../server");

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { userName: username } });

  // check if user found and then check if password was valid with bcrypt
  if (user) {
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ auth: false, token: null, error: "Incorrect password." });
    }

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 21600 } // expires in 6 hours
    );
    return res.send({ auth: true, token: accessToken });
  } else {
    return res.status(401).send({ auth: false, error: ["User not found"] });
  }
});
