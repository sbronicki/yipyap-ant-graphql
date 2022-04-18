const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log({ authHeader });
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  console.log({ token });
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    console.log("catch");
    return next();
  }

  console.log(decodedToken);

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.id = decodedToken.id;
  next();
};
