// models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: '' },
  status: { type: String, enum: ['Draft','Planned','Active','Completed'], default: 'Draft' },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
