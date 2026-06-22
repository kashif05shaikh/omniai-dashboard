const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: String, required: true }, // name of provider
  model: { type: String, required: true }, // e.g., gpt-4o
  requestCount: { type: Number, default: 1 },
  inputTokens: { type: Number, default: 0 },
  outputTokens: { type: Number, default: 0 },
  totalTokens: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UsageLog', usageLogSchema);
