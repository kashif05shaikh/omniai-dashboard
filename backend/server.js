const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

// CORS for Vite dev server
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Temporary mock Auth Middleware
app.use((req, res, next) => {
  // Hardcoded test user ID (valid MongoDB ObjectId)
  req.user = { 
    id: '64a1b2c3d4e5f6a7b8c9d0e1',
    _id: new mongoose.Types.ObjectId('64a1b2c3d4e5f6a7b8c9d0e1')
  };
  next();
});

// Routes
app.use('/api/health', (req, res) => res.json({ status: 'ok', msg: 'Backend running' }));
app.use('/api/providers', require('./routes/providerRoutes'));
app.use('/api/usage', require('./routes/usageRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/costs', require('./routes/costRoutes'));

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
