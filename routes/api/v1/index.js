const express = require('express');
const router = express.Router();

// this is the etry poit of all the api/v1/questions named url's
router.use('/question', require('./questions'));
router.use('/options', require('./options'));


module.exports = router;