const {
  app,
  User,
  Book,
  UserBookDetail,
  sequelize,
  bcrypt,
  jwt,
} = require("../../server.js");

app.get("/api/literary-history", async (req, res) => {
  // authentication token check
  // add pagination at some point ye

  try {
    const { auth } = req.headers;
    if (!auth) {
      throw new Error("Authorization denied [GR-01]");
    } else {
      jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET);
    }
    const decode = jwt.decode(auth, process.env.ACCESS_TOKEN_SECRET);
    const { user } = decode;

    User.belongsToMany(Book, { through: "userBookDetails" });
    Book.belongsToMany(User, { through: "userBookDetails" });

    const litHistory = await User.findAll({
      raw: true,
      where: {
        id: user,
      },
      attributes: ["id", "userName"],
      include: [{ model: Book }],
    });

    if (!litHistory.length) {
      return res.status(201).send({ response: false, body: [] });
    }

    return res.send({ response: true, body: litHistory });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});
