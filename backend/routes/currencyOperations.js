const express = require('express');
const { convertCurrency } = require('../controllers/conversionController');
const router = express.Router();

// Convert Currency Using Pair Conversion Endpoint
router.post('/convert', convertCurrency);

module.exports = router;
