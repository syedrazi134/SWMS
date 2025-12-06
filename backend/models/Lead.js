// models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  source: { type: String },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
