

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')
let auth = require('../middleware/auth');

/* POST register request. */
router.post('/', auth, queriesFunction.redeemGift);
module.exports = router;
