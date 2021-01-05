const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../../server.js");

app.delete("/api/literary-history/:bookDetailID", async (req, res) => {
  try {
    const { auth } = req.headers;
    const { bookDetailID } = req.params;

    if (!auth) {
      throw new Error("Authorization denied for deletion. Try again later.");
    } else {
      jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET);
    }

    const decodedToken = jwt.decode(auth, process.env.ACCESS_TOKEN_SECRET);

    // check if user exists decodedToken.user (the id)

    const deletedBook = await UserBookDetail.destroy({
      where: {
        id: bookDetailID,
        userID: decodedToken.user,
      },
    });

    console.log(deletedBook);

    if (deletedBook) {
      return res.status(200).send({ response: true });
    } else {
      throw new Error("Could not successfully delete book. Try again later.");
    }
  } catch (err) {
    res.status(400).send({ response: false, error: err.toString() });
  }
});
