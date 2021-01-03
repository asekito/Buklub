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
      bookDetailBookRating,
      bookDetailBookStatus,
      bookDetailBookFavorite,
      bookDetailBookTimesRead,
      bookDetailBookNotes,
      bookDetailBookStartDate,
      bookDetailBookEndDate,
      bookDetailBookWishlist,
      token,
      bookRating,
      status,
      favorite,
      timesRead,
      notes,
      startDate,
      endDate,
      wishlist,
    } = req.body;
    console.log(req.body);
    if (!token) {
      throw new Error("Authorization denied.");
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
      throw new Error("No user found.");
    }

    const update = await UserBookDetail.update(
      {
        bookRating: bookRating || bookDetailBookRating,
        status: status || bookDetailBookStatus,
        favorite: favorite || bookDetailBookFavorite,
        timesRead: timesRead || bookDetailBookTimesRead,
        notes: notes || bookDetailBookNotes,
        startDate: startDate || bookDetailBookStartDate || null,
        endDate: endDate || bookDetailBookEndDate || null,
        wishlist: wishlist === 0 ? wishlist : bookDetailBookWishlist,
      },
      {
        where: {
          id: bookDetailID,
          userID: decodedToken.user,
        },
      }
    );
    console.log(update);

    res.status(200).send({ response: true });
  } catch (err) {
    res.status(400).send({ response: false, error: err.toString() });
  }
});
