const crypto = require('crypto');
const jwtKeyFromConfig = require('../config/index').jwtKey;
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'webdev',
  host: 'localhost',
  database: 'webdev_db',
  password: '',
  port: 5432,
})

const getGifts = (request, response) => {
  pool.query('SELECT * FROM gifts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(
      {
        "status_code": 200,
        "message": "Successfully get data",
        "data": results.rows
      })
  })
}

const getGiftById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM gifts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(
      {
        "status_code": 200,
        "message": `Succesfully get gift data with ID: ${results.rows[0].id}`,
        "data": results.rows[0]
      })
  })
}

const createGift = (request, response) => {
  const { title, points, reviews, stocks } = request.body

  pool.query('INSERT INTO gifts (title, points, reviews, stocks) VALUES ($1, $2, $3, $4) RETURNING *', [title, points, reviews, stocks], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json(
      {
        "status_code": 201,
        "message": `Gift added with ID: ${results.rows[0].id}`,
        "data": results.rows[0]
      }
    )
  })
}

const updateGift = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, points, reviews, stocks } = request.body

  pool.query(
    `UPDATE gifts SET title = $1, points = $2, reviews = $3, stocks = $4 WHERE id = ${id}`,
    [title, points, reviews, stocks],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(
        {
          "status_code": 200,
          "message": `Gift modified with ID: ${id}`,
          "data": results.rows[0]
        }
      )
    }
  )
}

const deleteGift = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM gifts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(
      {
        "status_code": 200,
        "message": `Gifts deleted with ID: ${id}`,
        "data": results.rows[0]
      }
    )
  })
}

const registerUser = (request, response) => {
  const email = request.body.email;
  const hashedPassword = crypto.createHash('sha256').update(request.body.password).digest('base64');
  if (email && hashedPassword) {
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, hashedPassword], (error, results) => {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.rows[0].email === email && results.rows[0].password == hashedPassword) {
        // Give alert response data already exists
        response.status(409).json(
          {
            "status_code": 409,
            "message": 'This account is already exists!',
            "data": results.rows[0]
          }
        );
      }
      else {
        // Insert new users data
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword], (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).json({
            "status_code": 201,
            "message": "Registration successfully",
            "data": results.rows[0]
          })
        })
      }
    })
  }

}

const loginUser = (request, response) => {
  const { email, password } = request.body
  if (username && password) {
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.rows[0]) {
        let minutesToAdd = 5;
        let currentDate = new Date();
        let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        // Return bearer token
        pool.query('INSERT INTO token (token, valid_until) VALUES ($1, $2) RETURNING *', [token, futureDate], (error, results) => {
          // If there is an issue with the query, output the error
          if (error) {
            throw error
          }
          response.status(200).json(
            {
              "status_code": 200,
              "message": `Successfully Login`,
              "data": {
                "access_token": results.rows[0].token,
                "token_type": "Bearer",
                "valid_until": results.rows[0].valid_until
              }
            }
          )
        })
      }
      else {
        response.status(401).json(
          {
            "status_code": 401,
            "message": 'Incorrect Email and/or Password!'
          });
      }
    })
  }


}

const logoutUser = (request, response) => {
  response.status(200).json('Logged out...')
}

module.exports = {
  getGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
  registerUser,
  loginUser,
  logoutUser
} 