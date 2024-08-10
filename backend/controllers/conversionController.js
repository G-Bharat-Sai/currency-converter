const axios = require('axios');

// Your API Key
const API_KEY = '5a0f5ff91297bbe5de242bf3';

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

module.exports = { convertCurrency };
