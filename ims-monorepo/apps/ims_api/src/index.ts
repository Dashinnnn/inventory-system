import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";


import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./modules/authModules/auth.routes.js";
import userRoutes from "./modules/userManagement/userManagement.routes.js";
import organizationRoutes from "./modules/organizationModules/organization.routes.js";
import notificationRoutes from "./modules/notificationModules/notification.routes.js";
import inventoryRoutes from "./modules/internModules/inventoryModule/inventory.routes.js"
import { taskRoutes } from './modules/taskModules/task.routes.js';

const app = express();
const httpServer = createServer(app);
const PORT = Number(process.env.PORT) || 8000;

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
app.use(express.json());
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
app.use('/api/tasks', taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes)

app.get('/', (_, res) => {
  res.json({
    message: 'ims-api is running!',
    timestamp: new Date().toISOString(),
    database: 'MongoDB (Mongoose)'
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/orgs", organizationRoutes); // Using '/orgs' for brevity, match your Postman!
app.use("/api/notifications", notificationRoutes);

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

// 6. GRACEFUL SHUTDOWN
const gracefulShutdown = () => {
  console.log('Received shutdown signal. Closing server...');

  httpServer.close(() => {
    console.log('HTTP server closed');

    mongoose.connection
      .close()
      .then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      });
  });
};

// 7. SOCKET.IO SETUP
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // Or your specific frontend URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('join', (userId: string) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room`);
  });
});

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 IMS Backend & Socket.io running on http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Allowed Origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : 'Dev Mode (All)'}`);
});