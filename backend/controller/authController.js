// controller/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendError, sendSuccess } = require('../library/helper');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return sendError(res, 400, 'name, email and password are required');
    const existing = await User.findOne({ email });
    if (existing) return sendError(res, 400, 'Email already registered');
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash: hash, role: role || 'Employee' });
    await user.save();
    const out = { id: user._id, name: user.name, email: user.email, role: user.role };
    return sendSuccess(res, out, 'Registered');
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Registration failed', err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, 400, 'email and password are required');
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 400, 'Invalid credentials');
    const ok = await user.verifyPassword(password);
    if (!ok) return sendError(res, 400, 'Invalid credentials');
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const userObj = { id: user._id, name: user.name, email: user.email, role: user.role };
    return res.json({ token, user: userObj });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'Login failed', err);
  }
};
