const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../../server.js");

app.post("/api/literary-history", async (req, res) => {
  try {
    const {
      userID,
      bookID,
      rating,
      status,
      favorite,
      timesRead,
      notes,
      startDate,
      endDate,
      token,
    } = req.body;

    // -----------------------**** validation of request object itmes here *******-------------------------///

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
    const existingBook = await UserBookDetail.findOne({
      where: {
        userID: user.id,
        bookID: bookID,
      },
    });

    if (existingBook) {
      return res.status(201).send({
        response: true,
        alreadyExists: true,
        item: existingBook,
      });
    }

    const transaction = await sequelize.transaction();

    const newBook = await UserBookDetail.create(
      {
        userID: user.id,
        bookID: bookID,
        bookRating: rating,
        status: status,
        favorite: favorite,
        timesRead: timesRead,
        notes: notes,
        startDate: startDate,
        endDate: endDate,
      },
      { transaction }
    );
    await transaction.commit();

    return res.status(200).send({ response: true }); // maybe send the saved data back to the client side? What to do with it? idk
  } catch (error) {
    const transaction = await sequelize.transaction();
    await transaction.rollback();
    return res.status(400).send({ error: error.toString() });
  }
});
