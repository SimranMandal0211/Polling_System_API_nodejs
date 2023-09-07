const express = require('express');

const router = express.Router();
const questionController = require('../controller/questions_controller');

console.log('router loaded');

router.get('/', questionController.home);


module.exports = router;