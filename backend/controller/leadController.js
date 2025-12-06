// controller/leadController.js
const Lead = require('../models/Lead');
const { sendError, sendSuccess } = require('../library/helper');

exports.list = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(500).populate('campaign', 'name');
    return sendSuccess(res, leads, 'Leads retrieved');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to fetch leads', err);
  }
};

exports.create = async (req, res) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user._id;
    const l = new Lead(payload);
    await l.save();
    return sendSuccess(res, l, 'Lead created');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to create lead', err);
  }
};

exports.get = async (req, res) => {
  try {
    const l = await Lead.findById(req.params.id).populate('campaign', 'name');
    if (!l) return sendError(res, 404, 'Lead not found');
    return sendSuccess(res, l, 'Lead fetched');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to fetch lead', err);
  }
};

exports.update = async (req, res) => {
  try {
    const l = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!l) return sendError(res, 404, 'Lead not found');
    return sendSuccess(res, l, 'Lead updated');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to update lead', err);
  }
};

exports.remove = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    return sendSuccess(res, {}, 'Lead deleted');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Failed to delete lead', err);
  }
};
