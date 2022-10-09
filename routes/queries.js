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
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateGift = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, points, reviews, stocks } = request.body

  pool.query(
    'UPDATE gifts SET title = $1, points = $2, reviews = $3, stocks = $4 WHERE id = $5',
    [title, points, reviews, stocks, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Gifts modified with ID: ${id}`)
    }
  )
}

const deleteGift = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM gifts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Gifts deleted with ID: ${id}`)
  })
}

module.exports = {
  getGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
} 