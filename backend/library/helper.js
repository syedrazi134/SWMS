// library/helper.js
exports.sendSuccess = (res, data = {}, message = 'OK') => {
  return res.json({ success: true, message, data });
};

exports.sendError = (res, status = 500, message = 'Server Error', err = null) => {
  if (err) console.error(err);
  return res.status(status).json({ success: false, message });
};
