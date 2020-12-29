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
    // validate request body objects here as well

    await ContactUs.create(req.body);
    return res.status(200).send({ response: true });
  } catch (err) {
    return res.status(400).send({ response: false, error: err });
  }
});
