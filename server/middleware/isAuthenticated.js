require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get('Authorization')

    if (!headerToken) {
      res.status(401).send("Token missing.");
      return;
    }

    let token

    try {
      token = jwt.verify(headerToken, SECRET)
    } catch (err) {
      res.status(500).send("Invalid token.");
      return;
    }

    if (!token) {
      res.status(401).send("Not authenticated.");
      return;
    }

    req.user = token;
    next();
  }
}
