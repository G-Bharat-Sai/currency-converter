const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Debug logging
console.log('PORT:', process.env.PORT); // Debug logging

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/currency', require('./routes/currency'));
app.use('/api/currency-operations', require('./routes/currencyOperations'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
