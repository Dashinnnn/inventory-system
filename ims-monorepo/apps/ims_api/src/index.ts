import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';  
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ────────────────────────────────────────────────
//                DATABASE CONNECTION
// ────────────────────────────────────────────────
connectDB();  // Call once here – Mongoose will handle the rest

// ────────────────────────────────────────────────
//                    MIDDLEWARES
// ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ────────────────────────────────────────────────
//                      ROUTES
// ────────────────────────────────────────────────
app.get('/', (_, res) => {
  res.json({
    message: 'ims-api is running!',
    timestamp: new Date().toISOString(),
    database: 'MongoDB (Mongoose)'
  });
});

app.get('/health', (_, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    database: dbStatus,
    uptime: process.uptime()
  });
});

app.get('/db', async (_, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    if (!mongoose.connection.db) {
      throw new Error('Database object is not available');
    }
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'ok', message: 'Database ping successful' });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database check failed',
      error: (error as Error).message
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

// Graceful shutdown (helps with auto-reload tools like tsx watch / nodemon)
const gracefulShutdown = () => {
  console.log('Received shutdown signal. Closing server...');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close().then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    }).catch((err) => {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);  // Ctrl+C