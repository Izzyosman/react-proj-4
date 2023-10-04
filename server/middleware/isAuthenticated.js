require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
  isAuthenticated: (req, res, next) => {
    const token = req.get('Authorization');
    
    if (!token) {
      res.status(401).send("Token missing.");
      return;
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, SECRET);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Invalid token.");
      return;
    }

    if (!decodedToken) {
      res.status(401).send("Not authenticated.");
      return;
    }

    req.user = decodedToken;
    next();
  }
}
