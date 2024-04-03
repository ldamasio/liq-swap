const express = require('express');
const router = express.Router();
const { currencyConverterController, listSymbolsController } = require('../controllers/currencyController');

router.post('/convert', currencyConverterController);
router.get('/symbols', listSymbolsController);

module.exports = router;
