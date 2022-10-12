

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')
let auth = require('../middleware/auth');

/* DELETE logout request. */
router.delete('/', auth, queriesFunction.logoutUser);
module.exports = router;
