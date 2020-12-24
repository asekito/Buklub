const {
  app,
  User,
  Book,
  UserBookDetail,
  sequelize,
  bcrypt,
  jwt,
} = require("../../server.js");
const { formatBookHistoryObject } = require("./get-books-history");

app.get("/api/literary-history-favorites", async (req, res) => {
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
      include: [
        {
          model: Book,
          attributes: [
            "title",
            "authors",
            "pageCount",
            "description",
            "publisher",
            "publishedDate",
            "smallThumbnail",
            "thumbnail",
          ],
          through: {
            where: {
              wishlist: 1,
            },
          },
        },
      ],
      order: [[Book, "title", "asc"]],
    });

    if (litHistory.length === 0 || !litHistory[0]["books.title"]) {
      return res.status(201).send({ response: false, body: [] });
    }

    const formattedBody = formatBookHistoryObject(litHistory);

    return res.send({ response: true, body: formattedBody });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});
