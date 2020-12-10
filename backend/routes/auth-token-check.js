const { app, sequelize, bcrypt, jwt } = require("../server");

app.post("/api/auth-check", async (req, res) => {
  try {
    const { token } = req.body;
    if (token === null) {
      return res.status(201).send({ response: false });
    }
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).send({ response: true });
  } catch (err) {
    return res.send({ error: err });
  }
});
