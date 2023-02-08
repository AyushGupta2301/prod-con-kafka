var express = require('express');
var router = express.Router();
const indexCntrl = require('../controllers/index-controller');
const path = require('path');

router.post('/readData',indexCntrl.recieve);
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/html/clients.html'));
    // res.end();
});

module.exports = router;
