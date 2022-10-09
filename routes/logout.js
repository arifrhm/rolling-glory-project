

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')

/* get logout request. */
router.get('/', queriesFunction.loginUser);
module.exports = router;
