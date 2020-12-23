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
      order: [[Book, "title", "asc"]],
    });

    if (!litHistory.length) {
      return res.status(201).send({ response: false, body: [] });
    }
    const formattedBody = formatBookHistoryObject(litHistory);

    return res.send({ response: true, body: formattedBody });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

const formatBookHistoryObject = (bookHistory) => {
  return bookHistory.map((b) => {
    return {
      userID: b.id,
      userName: b.userName,
      bookID: b["books.id"],
      googleBookID: b["books.googleBookID"],
      title: b["books.title"],
      authors: b["books.authors"],
      pageCount: b["books.pageCount"],
      description: b["books.description"],
      publisher: b["books.publisher"],
      publishedDate: b["books.publishedDate"],
      smallThumbnail: b["books.smallThumbnail"],
      thumbnail: b["books.thumbnail"],
      bookDetailID: b["books.userBookDetails.id"],
      bookDetailBookRating: b["books.userBookDetails.bookRating"],
      bookDetailBookStatus: b["books.userBookDetails.status"],
      bookDetailBookFavorite: b["books.userBookDetails.favorite"],
      bookDetailBookTimesRead: b["books.userBookDetails.timesRead"],
      bookDetailBookNotes: b["books.userBookDetails.notes"],
      bookDetailBookStartDate: b["books.userBookDetails.startDate"],
      bookDetailBookEndDate: b["books.userBookDetails.endDate"],
    };
  });
};
