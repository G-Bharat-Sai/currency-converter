const CurrencyRate = require('../models/CurrencyRate');
const axios = require('axios');

// Your API Key
const API_KEY = '5a0f5ff91297bbe5de242bf3';

// In-memory cache for rates
const cache = {};

// Get Exchange Rates for a Specific Base Currency
const getRates = async (req, res) => {
  const { baseCurrency } = req.params;

  if (cache[baseCurrency] && Date.now() - cache[baseCurrency].timestamp < 3600000) {
    return res.json(cache[baseCurrency].data);
  }

  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
    const { base_code, conversion_rates } = response.data;

    if (!base_code || !conversion_rates) {
      throw new Error('API response is missing base or rates data');
    }

    let currencyRate = await CurrencyRate.findOne({ base: base_code });
    if (currencyRate) {
      currencyRate.rates = conversion_rates;
      currencyRate.date = Date.now();
      await currencyRate.save();
    } else {
      currencyRate = new CurrencyRate({ base: base_code, rates: conversion_rates });
      await currencyRate.save();
    }

    cache[baseCurrency] = {
      data: { base: base_code, rates: conversion_rates, date: Date.now() },
      timestamp: Date.now(),
    };

    res.json(cache[baseCurrency].data);
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    res.status(500).json({ error: 'Error fetching exchange rates' });
  }
};

// Convert Currency Using Pair Conversion Endpoint
const convertCurrency = async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;

    if (!fromCurrency || !toCurrency || !amount) {
        return res.status(400).json({ message: 'Please provide fromCurrency, toCurrency, and amount' });
    }

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const { conversion_result } = response.data;

        if (conversion_result === undefined) {
            return res.status(400).json({ message: 'Invalid currency pair or amount' });
        }

        res.json({ convertedAmount: conversion_result });
    } catch (error) {
        console.error('Error converting currency:', error.message);
        res.status(500).json({ error: 'Error converting currency' });
    }
};

module.exports = { getRates, convertCurrency };
