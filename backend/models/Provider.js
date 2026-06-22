const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // e.g., OpenAI, Claude
  accountName: { type: String, required: true },
  apiKeyRef: { type: String }, // Encrypted reference/placeholder
  status: { type: String, enum: ['connected', 'disconnected'], default: 'connected' },
  color: { type: String, default: '#ffffff' }
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);
