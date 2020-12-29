const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
} = require("../server");

app.post("/api/contact-us", (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send({ body: "Yas" });
  } catch (err) {
    console.log(err);
  }
});
