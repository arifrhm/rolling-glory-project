

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')
let auth = require('../middleware/auth');

/* POST logout request. */
router.get('/', auth, queriesFunction.logoutUser);
module.exports = router;
