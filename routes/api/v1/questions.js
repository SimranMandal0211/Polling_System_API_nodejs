const express = require('express');
const router = express.Router();

const optionsController = require('../../../controller/questions_controller');

router.post('/create', optionsController.create);
router.get('/view/:id', optionsController.showDetails);
router.delete('/delete/:id',optionsController.deleteQues);


router.use('/options', require('./options'));


module.exports = router;