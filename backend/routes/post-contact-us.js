const {
  app,
  User,
  sequelize,
  bcrypt,
  jwt,
  UserBookDetail,
  ContactUs,
} = require("../server");

app.post("/api/contact-us", async (req, res) => {
  try {
    await ContactUs.create(req.body);
    res.status(200).send({ response: true });
  } catch (err) {
    res.status(400).send({ response: false, error: err });
  }
});
