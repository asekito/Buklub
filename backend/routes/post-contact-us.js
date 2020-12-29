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
    res.status(200).send({ response: true });
  } catch (err) {
    res.status(400).send({ response: false, error: err });
  }
});
