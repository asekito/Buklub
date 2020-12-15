const { app, sequelize, jwt, Book, Op } = require("../server");
const fetch = require("node-fetch");

app.get("/api/book-search/book", async (req, res) => {
  try {
    const { title, author } = req.query;
    console.log(req.query);

    if (title.length === 0 && author.length === 0) {
      return res.status(400).send({
        error: "Need to have at least title or author fields for search.",
      });
    }

    const existingInDatabase = await Book.findAll({
      where: {
        title: {
          [Op.substring]: title,
        },
        authors: {
          [Op.substring]: author,
        },
      },
    });

    if (existingInDatabase.length > 0) {
      return res.status(200).send({ body: existingInDatabase });
    }

    const googleData = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
        title
      )}+inauthor:${encodeURI(author) || ""}&key=${process.env.BOOK_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.totalItems > 0) {
          return res.items;
        }
        return [];
      });

    addGoogleBooksIntoDb(googleData);

    if (googleData.length > 0) {
      const returnData = googleData.map((data) => data.volumeInfo);
      return res.status(201).send({ body: returnData });
    } else {
      throw new Error("Could not find book matching criteria.");
    }
  } catch (error) {
    res.status(400).send({ error: error.toString() });
  }
});

const addGoogleBooksIntoDb = async (bookArray) => {
  const data = await Promise.all(
    bookArray.map(async (data, n) => {
      const pageCount = data.volumeInfo.pageCount;
      Book.findOrCreate({
        where: { googleBookID: data.id },
        defaults: {
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors[0],
          googleBookID: data.id,
          pageCount: !!data.volumeInfo.pageCount ? pageCount : -1,
          description: data.volumeInfo.description || null,
          publisher: !!data.volumeInfo.publisher
            ? data.volumeInfo.publisher
            : null,
          publishedDate: data.volumeInfo.publishedDate,
          smallThumbnail: !!data.volumeInfo.imageLinks
            ? data.volumeInfo.imageLinks.smallThumbnail
            : null,
          thumbnail: !!data.volumeInfo.imageLinks
            ? data.volumeInfo.imageLinks.thumbnail
            : null,
        },
      });
    })
  );
};
