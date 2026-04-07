import "dotenv/config";
import express from "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import authRoutes from "./modules/authModules/auth.routes.js";
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 8000;

const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan('dev'));
// 1. DATABASE CONNECTION
connectDB();

// 2. CORS CONFIGURATION
// Convert the comma-separated string from .env into an array
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // 1. Allow if no origin (Postman/Mobile apps)
    // 2. Allow if origin is in our ALLOWED_ORIGINS list
    // 3. Allow everything if in development mode
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// 3. MIDDLEWARES
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send('API is running');
});

// 4. ROUTES
app.use("/api/auth", authRoutes);

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
    if (mongoose.connection.readyState !== 1) throw new Error('Database not connected');
    if (!mongoose.connection.db) throw new Error('Database object is not available');
    
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

// 5. SERVER START
const server = app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Allowed Origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : 'None (Dev Mode only)'}`);
});

// 6. GRACEFUL SHUTDOWN
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
process.on('SIGINT', gracefulShutdown);