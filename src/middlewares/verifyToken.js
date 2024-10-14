import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      err: -1,
      message: "Missing access token",
    });
  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err)
      res.status(401).json({
        err: -1,
        message: "Invalid token",
      });
    req.user = user;
    next();
  });
};

export default verifyToken;
