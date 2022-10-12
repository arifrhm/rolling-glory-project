const jwt = require("jsonwebtoken");

const config = process.env;
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json(
      {
        "status" : 403,
        "message":"A token is required for authentication"
      }
      );
  }
  pool.query('SELECT * FROM tokens WHERE token = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({
        "status" : 401,
        "message": "A token is invalid"
      });
    }
    return next();
  })
}
module.exports = verifyToken;