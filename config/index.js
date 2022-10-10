const dotenv = require("dotenv");

const path = require("path");

dotenv.config();

module.exports = {

  jwtKey: process.env.SECRET,

};