const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../../server.js");

app.delete("/api/literary-history/:bookID", async (req, res) => {
  try {
    const { auth } = req.headers;
    const { bookID } = req.params;

    if (!auth) {
      throw new Error("Authorization denied for deletion.");
    } else {
      jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET);
    }

    const decodedToken = jwt.decode(auth, process.env.ACCESS_TOKEN_SECRET);

    // check if user exists decodedToken.user (the id)

    await UserBookDetail.destroy({
      where: {
        userID: decodedToken.user,
        bookID: bookID,
      },
    });

    return res.status(200).send({ response: true });
  } catch (err) {
    res.status(400).send({ response: false, error: err.toString() });
  }
});
