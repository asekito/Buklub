const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../../server.js");

app.patch("/api/literary-history", async (req, res) => {
  try {
    const { userBookDetailID, userID, bookID } = req.body;

    await UserBookDetail.update(req.body, {
      where: {
        id: userBookDetailID,
        userID: userID,
      },
    });

    res.status(200).send({ response: true });
  } catch (err) {
    res.status(400).send({ response: false, error: err.toString() });
  }
});
