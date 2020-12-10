const { app, User, sequelize, bcrypt, jwt } = require("../server");

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("One or more fields have incorrect inputs.");
    }

    const user = await User.findOne({ where: { userName: username } });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (user || !validPassword) {
      throw new Error("Incorrect username or password.");
    }

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 21600 } // expires in 6 hours
    );
    return res.send({ auth: true, token: accessToken });
  } catch (err) {
    return res
      .status(401)
      .send({ auth: false, token: null, error: err.toString() });
  }
});
