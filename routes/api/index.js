const express = require('express');
const router = express.Router();

// this is the etry poit of all the api/v1 named url's
router.use('/v1', require('./v1/index'));

module.exports = router;