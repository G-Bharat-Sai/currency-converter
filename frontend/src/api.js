import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
  }
};

export const fetchCurrencyRates = async () => {
    const response = await axios.get('http://localhost:5000/api/currency/rates/USD');
    return response.data;
  };
  
  export const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const response = await axios.post('http://localhost:5000/api/currency/convert', {
      fromCurrency,
      toCurrency,
      amount
    });
    return response.data;
  };
