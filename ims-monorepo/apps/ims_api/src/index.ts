import "dotenv/config";
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
<<<<<<< HEAD
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./modules/authModules/auth.routes";
import userRoutes from "./modules/userManagement/userManagement.routes";
import organizationRoutes from "./modules/organizationModules/organization.routes";
=======
import { createServer } from 'http';
import { Server } from 'socket.io';
// Add this with your other module imports
import notificationRoutes from "./modules/notificationModules/notification.routes.js";
>>>>>>> notificationModule

const app = express();
const httpServer = createServer(app);
const PORT = Number(process.env.PORT) || 8000;

app.use("/api/notifications", notificationRoutes);

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
app.use("/api/organizations", organizationRoutes);

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

<<<<<<< HEAD
// 5. SERVER START
const server = app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
});

// 6. GRACEFUL SHUTDOWN
const gracefulShutdown = () => {
  server.close(() => {
    mongoose.connection.close().then(() => process.exit(0)).catch(() => process.exit(1));
=======
// 6. GRACEFUL SHUTDOWN
const gracefulShutdown = () => {
  console.log('Received shutdown signal. Closing server...');
  
  // Change 'server' to 'httpServer' here
  httpServer.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close().then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    }).catch((err) => {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    });
>>>>>>> notificationModule
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