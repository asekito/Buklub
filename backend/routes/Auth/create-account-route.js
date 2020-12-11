const { app, User, sequelize, bcrypt, jwt } = require("../../server");

// account creation
app.post("/api/create-account", async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    if (!username || !password || !firstname || !lastname) {
      throw new Error(
        "One or more account creation fields were not properly filled out."
      );
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof firstname !== "string" ||
      typeof lastname !== "string"
    ) {
      throw new Error("Type error for one or more fields.");
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      throw new Error("Account username already exists.");
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

    //notreally used
    const token = jwt.sign(
      { id: newUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 100 }
    );

    return res.status(200).send({ auth: true, token: token });
  } catch (err) {
    const transaction = await sequelize.transaction();
    await transaction.rollback();
    return res.status(401).json({ auth: false, error: err.toString() });
  }
});
