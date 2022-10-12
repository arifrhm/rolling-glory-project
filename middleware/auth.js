const jwt = require("jsonwebtoken");

const config = {TOKEN_KEY:'kindofsecretjwt'};
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'webdev',
  host: 'localhost',
  database: 'webdev_db',
  password: '',
  port: 5432,
})

const verifyToken = (req, res, next) => {
  // Check if token is in header
  try{
    const token =
     req.headers["x-access-token"] || req.body.token || req.query.token;
  }
  catch(err) {
    return res.status(403).json(
      {
        "status" : 403,
        "message":"A token is required for authentication"
      }
      );
  }
  // Check availability of token
  try{
    pool.query('SELECT * FROM tokens WHERE token = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      try {
        const token =
     req.headers["x-access-token"] || req.body.token || req.query.token;
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
  catch(err){
    return res.status(404).json({
      "status" : 404,
      "message": "A token you search is not available or deleted"
    });
  }
}
module.exports = verifyToken;