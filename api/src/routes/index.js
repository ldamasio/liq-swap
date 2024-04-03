const express = require('express');
const router = express.Router();
const currencyRoutes = require('./currencyRoutes');

router.use('/api/currency', currencyRoutes);
router.use('/api/currency', currencyRoutes);

module.exports = router;
