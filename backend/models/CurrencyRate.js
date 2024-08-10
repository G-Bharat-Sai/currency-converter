const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencyRateSchema = new Schema({
  base: {
    type: String,
    required: true,
  },
  rates: {
    type: Map,
    of: Number, 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CurrencyRate', CurrencyRateSchema);
