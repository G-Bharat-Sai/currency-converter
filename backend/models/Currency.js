const currencySchema = new mongoose.Schema({
  currencyCode: { type: String, required: true },
  currencyName: { type: String, required: true },
  country: { type: String, required: true }
});

const Currency = mongoose.model('Currency', currencySchema);
