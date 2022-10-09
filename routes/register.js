

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')

/* POST register request. */
router.post('/', queriesFunction.registerUser);
module.exports = router;
