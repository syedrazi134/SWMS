// library/seed.js
require('dotenv').config();
const connectDB = require('../database');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await connectDB();
  const exists = await User.findOne({ email: 'admin@swms.com' });
  if (exists) { console.log('Admin already exists'); process.exit(0); }
  const hash = await bcrypt.hash('admin', 10);
  const u = new User({ name: 'Admin', email: 'admin@swms.com', passwordHash: hash, role: 'Admin' });
  await u.save();
  console.log('Admin user created: admin@swms.com / admin');
  process.exit(0);
};

seed();
