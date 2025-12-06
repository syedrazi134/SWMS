// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./database');

const authRoutes = require('./routes/auth');
const campaignsRoutes = require('./routes/campaigns');
const leadsRoutes = require('./routes/leads');

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// connect db
connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/leads', leadsRoutes);

// health check
app.get('/api/ping', (req, res) => res.json({ ok: true }));

// fallback
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
