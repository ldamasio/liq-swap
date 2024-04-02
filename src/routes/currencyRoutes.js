const express = require('express');
const router = express.Router();
const { currencyConverter } = require('../controllers/currencyController');

router.post('/convert', currencyConverter);

module.exports = router;