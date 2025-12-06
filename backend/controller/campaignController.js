// controller/campaignController.js
const Campaign = require('../models/Campaign');
const { sendError, sendSuccess } = require('../library/helper');

exports.list = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).limit(100);
    return sendSuccess(res, campaigns, 'Campaigns retrieved');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to fetch campaigns', err);
  }
};

exports.create = async (req, res) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user._id;
    const c = new Campaign(payload);
    await c.save();
    return sendSuccess(res, c, 'Campaign created');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to create campaign', err);
  }
};

exports.get = async (req, res) => {
  try {
    const c = await Campaign.findById(req.params.id);
    if (!c) return sendError(res, 404, 'Campaign not found');
    return sendSuccess(res, c, 'Campaign fetched');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to fetch campaign', err);
  }
};

exports.update = async (req, res) => {
  try {
    const c = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!c) return sendError(res, 404, 'Campaign not found');
    return sendSuccess(res, c, 'Campaign updated');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to update campaign', err);
  }
};

exports.remove = async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    return sendSuccess(res, {}, 'Campaign deleted');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to delete campaign', err);
  }
};
