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
    const {
      bookDetailID,
      userID,
      bookDetailBookRating: bookRating,
      bookDetailBookStatus: status,
      bookDetailBookFavorite: favorite,
      bookDetailBookTimesRead: timesRead,
      bookDetailBookNotes: notes,
      bookDetailBookStartDate: startDate,
      bookDetailBookEndDate: endDate,
      bookDetailBookWishlist: wishlist,
    } = req.body;

    const update = await UserBookDetail.update(
      {
        bookRating: bookRating,
        status: status,
        favorite: favorite,
        timesRead: timesRead,
        notes: notes,
        startDate: startDate,
        endDate: endDate,
        wishlist: wishlist,
      },
      {
        where: {
          id: bookDetailID,
          userID: userID,
        },
      }
    );

    res.status(200).send({ response: true });
  } catch (err) {
    res.status(400).send({ response: false, error: err.toString() });
  }
});
