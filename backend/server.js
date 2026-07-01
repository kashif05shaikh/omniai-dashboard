const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { clerkMiddleware, requireAuth } = require('@clerk/express');
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

// Clerk JWT Verification Middleware
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY
}));

// Routes
app.use('/api/health', (req, res) => res.json({ status: 'ok', msg: 'Backend running' }));
app.use('/api/providers', requireAuth(), require('./routes/providerRoutes'));
app.use('/api/usage', requireAuth(), require('./routes/usageRoutes'));
app.use('/api/analytics', requireAuth(), require('./routes/analyticsRoutes'));
app.use('/api/costs', requireAuth(), require('./routes/costRoutes'));

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
