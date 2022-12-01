const jwt = require('jsonwebtoken');

const generateAccessToken = (username, expiredTime) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: 24*60 });
}

module.exports = generateAccessToken;