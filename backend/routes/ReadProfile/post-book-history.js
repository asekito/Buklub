const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../../server.js");

app.post("/api/literary-history", async (req, res) => {
  // validations of items here
  try {
    const {
      bookId,
      bookRating,
      status,
      favorite,
      timesRead,
      notes,
      startDate,
      endDate,
      token,
    } = req.body;

    if (!token) {
      throw new Error("Authorization denied [PR-01]");
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }

    const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({
      where: {
        id: decodedToken.user,
      },
    });

    if (!user) {
      throw new Error("No user found. [PR-02]");
    }

    // check if book already exists for user
    // if already exists return to user existing book there

    const transaction = await sequelize.transaction();

    const test = await UserBookDetail.create(
      {
        userID: user.id,
        bookID: 1,
        bookRating: 8.0,
        status: 1,
        notes: notes,
        startDate: startDate,
        endDate: endDate,
      },
      { transaction }
    );
    await transaction.commit();

    return res.status(200);
  } catch (error) {
    const transaction = await sequelize.transaction();
    await transaction.rollback();
    return res.status(400).send({ error: error.toString() });
  }
});
