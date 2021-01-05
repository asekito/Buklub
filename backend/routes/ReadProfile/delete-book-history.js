const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../../server.js");

app.delete("/api/literary-history/:bookID", (req, res) => {
  console.log(req);
  console.log(req.params.bookID);
  const { auth } = req.headers;
  console.log(auth);
  res.status(200).send({ response: true });
});
