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

// CORS for Vite dev server (localhost + GitHub Codespaces forwarded URLs)
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      origin === 'http://localhost:5173' ||
      origin === 'http://127.0.0.1:5173' ||
      /\.app\.github\.dev$/.test(new URL(origin).hostname)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Debug middleware to log incoming requests and auth state
app.use((req, res, next) => {
  console.log(`📨 [${req.method}] ${req.path}`);
  console.log(`   Authorization header:`, req.headers.authorization ? `Bearer ${req.headers.authorization.substring(0, 20)}...` : 'none');
  console.log(`   req.auth before routes:`, req.auth ? JSON.stringify(req.auth) : 'undefined');
  next();
});

// Clerk JWT Verification Middleware
app.use(clerkMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY
}));

// Debug middleware after Clerk middleware
app.use((req, res, next) => {
  if (req.auth) {
    console.log(`   req.auth keys:`, Object.keys(req.auth));
    console.log(`   req.auth.userId:`, req.auth.userId);
    console.log(`   req.auth.sessionId:`, req.auth.sessionId);
    console.log(`   req.auth:`, JSON.stringify(req.auth, null, 2));
  } else {
    console.log(`   req.auth is undefined`);
  }
  next();
});

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