const express = require('express');
const router = express.Router();
const databaseCntrl = require('../controllers/database-controller');

router.post('/insert',databaseCntrl.create_req);
router.get('/flush/:rid',databaseCntrl.delete_all);

module.exports = router;