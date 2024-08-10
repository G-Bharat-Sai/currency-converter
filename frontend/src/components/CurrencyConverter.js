import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/currency/rates/USD');
        setCurrencies(Object.keys(response.data.rates));
      } catch (err) {
        console.error('Error fetching currencies:', err);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/currency/convert', {
        fromCurrency,
        toCurrency,
        amount
      });
      setConvertedAmount(response.data.convertedAmount);
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Conversion failed. Please check the currency codes and try again.');
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="">Select Currency</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="">Select Currency</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && <p>Converted Amount: {convertedAmount}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
