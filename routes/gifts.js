

var express = require('express');
var router = express.Router();
var queriesFunction = require('./queries')

/* GET users listing. */
router.get('/', queriesFunction.getGifts);
router.get('/{id}', queriesFunction.getGiftById);
router.post('/',queriesFunction.createGift);
router.put('/{id}',queriesFunction.updateGift);
router.delete('/{id}',queriesFunction.deleteGift);

module.exports = router;
