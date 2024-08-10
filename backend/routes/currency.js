const express = require('express');
const { getRates, convertCurrency } = require('../controllers/currencyController');
const router = express.Router();

// Get Exchange Rates for a Specific Base Currency
router.get('/rates/:baseCurrency', getRates);

// Convert Currency Using Pair Conversion Endpoint
router.post('/convert', convertCurrency);

module.exports = router;
