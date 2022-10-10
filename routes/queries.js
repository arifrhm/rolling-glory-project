var crypto = require('crypto');

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
    response.status(200).json(results.rows)
  })
}

const getGiftById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM gifts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createGift = (request, response) => {
  const { title, points, reviews, stocks } = request.body

  pool.query('INSERT INTO gifts (title, points, reviews, stocks) VALUES ($1, $2, $3, $4) RETURNING *', [title, points, reviews, stocks], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json(`User added with ID: ${results.rows[0].id}`)
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
      response.status(200).json(`Gifts modified with ID: ${id}`)
    }
  )
}

const deleteGift = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM gifts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(`Gifts deleted with ID: ${id}`)
  })
}

const registerUser = (request, response) => {
  const email = request.body.email;
  const hashedPassword = crypto.createHash('sha256').update(request.body.password).digest('base64');
  if (email && hashedPassword){
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email,hashedPassword], (error, results) => {
      // If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.rows[0].email === email && results.rows[0].password == hashedPassword) {
				// Give alert response data already exists
				response.status(409).json('This account is already exists!');
			} 
      else {
        // Insert new users data
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email,hashedPassword], (error, results) => {
          if (error) {
            console.log(`Inilah error yang terjadi : ${error}`);
            throw error;
          }
          response.status(201).json({
            "status_code" : 201,
            "message" : "Registration successfully",
            "data":results.rows[0]
          })
        })
			}			
    })
  }
  
}

const loginUser = (request, response) => {
  const { email, password } = request.body
  if (username && password){
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email,password], (error, results) => {
      // If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.status(200).json('Succesfully login');
			} 
      else {
				response.status(401).json('Incorrect Email and/or Password!');
			}			
			response.end();
    })
  }
  
  pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email,password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json(`Successfully Login`)
  })
}

const logoutUser = (request, response) => {
  request.session.loggedin = false;
  response.status(200).json('Logged out...')
	response.end();
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