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
  const token = req.headers["x-access-token"] || req.body.token || req.query.token;
  
  // Check availability of token
  try{
    pool.query('SELECT * FROM tokens WHERE token = $1', [token], (error, results) => {
      if (error) {
        throw error
      }
      if(results.rows.length > 0) {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        return next();
      } else {
        return res.status(401).json({
          "status" : 401,
          "message": "Unauthorized!!"
        });
      }
    })
  }
  catch(err){
    return res.status(505).json({
      "status" : 505,
      "message": "A token is invalid"
    });
  }
}
module.exports = verifyToken;