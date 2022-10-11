const jwt = require('jsonwebtoken');

const generateAccessToken = (username, expiredTime) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: expiredTime });
}

module.exports = generateAccessToken;