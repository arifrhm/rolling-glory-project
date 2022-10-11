const express = require('express');
var router = express.Router();
let queriesFunction = require('./queries')
let auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', auth, queriesFunction.getGifts);
router.get('/:id', auth, queriesFunction.getGiftById);
router.post('/', auth, queriesFunction.createGift);
router.put('/:id', auth, queriesFunction.updateGift);
router.delete('/:id', auth, queriesFunction.deleteGift);

module.exports = router;
