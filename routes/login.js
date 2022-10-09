

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')

/* POST login request. */
router.post('/', queriesFunction.loginUser);
module.exports = router;
