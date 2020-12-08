const { app, User, sequelize, bcrypt, jwt } = require("../server");

// account creation
app.post("/api/create-account", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      return res
        .status(401)
        .send({ auth: false, error: ["Already existing user."] });
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
      .send({ auth: false, error: ["Error registering user. Try again."] });
  }
});
