import "dotenv/config";
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./modules/authModules/auth.routes.js";
import userRoutes from "./modules/userManagement/userManagement.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// 1. DATABASE CONNECTION
connectDB();

// 2. CORS CONFIGURATION
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
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
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. ROUTES
app.get('/', (_, res) => {
  res.json({
    message: 'ims-api is running!',
    timestamp: new Date().toISOString(),
    database: 'MongoDB (Mongoose)'
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get('/health', (_, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', database: dbStatus, uptime: process.uptime() });
});

app.get('/db', async (_, res) => {
  try {
    if (mongoose.connection.readyState !== 1) throw new Error('Database not connected');
    if (!mongoose.connection.db) throw new Error('Database object is not available');
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'ok', message: 'Database ping successful' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
});

// 5. SERVER START
const server = app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
});

// 6. GRACEFUL SHUTDOWN
const gracefulShutdown = () => {
  server.close(() => {
    mongoose.connection.close().then(() => process.exit(0)).catch(() => process.exit(1));
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);