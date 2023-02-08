var express = require('express');
var router = express.Router();
const indexCntrl = require('../controllers/index-controller');

router.post('/sendData',indexCntrl.send);
router.post('/createTopic',indexCntrl.create);

module.exports = router;
