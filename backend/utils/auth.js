const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Gather jwt access token from request header
  const authHeader = req.headers["authorization"];
  const token = authHeader ** authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);
    if(err) return res.sendStatus(403);
    req.user = user;
    next(); // pass execution off to whatever client inteded
  })
}