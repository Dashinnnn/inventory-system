import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import authRoutes from "./modules/authModules/auth.routes.js";
import userRoutes from "./modules/userManagement/userManagement.routes.js";
import organizationRoutes from "./modules/organizationModules/organization.routes.js";
import notificationRoutes from "./modules/notificationModules/notification.routes.js";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 8000;

// ====================== 1. DATABASE CONNECTION ======================
connectDB();

// ====================== 2. CORS CONFIGURATION ======================
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// ====================== 3. MIDDLEWARES ======================
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// ====================== 4. ROUTES ======================
app.get("/", (_, res) => {
  res.json({
    message: "ims-api is running!",
    timestamp: new Date().toISOString(),
    database: "MongoDB (Mongoose)",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/notifications", notificationRoutes);   // ← Added from main branch

// Health check
app.get("/health", (_, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({
    status: "ok",
    database: dbStatus,
    uptime: process.uptime(),
  });
});

// Database ping endpoint
app.get("/db", async (_, res) => {
  try {
    if (mongoose.connection.readyState !== 1) throw new Error("Database not connected");
    if (!mongoose.connection.db) throw new Error("Database object is not available");
    await mongoose.connection.db.admin().ping();
    res.json({ status: "ok", message: "Database ping successful" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ====================== 5. SOCKET.IO SETUP ======================
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // Change this to your frontend URL in production for better security
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room`);
  });

  // You can add more socket events here (e.g., disconnect, send-notification, etc.)
});

// ====================== 6. START SERVER ======================
const server = httpServer.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV || "development"}`);
});

// ====================== 7. GRACEFUL SHUTDOWN ======================
const gracefulShutdown = () => {
  console.log("SIGTERM/SIGINT received: closing server...");

  server.close(() => {
    console.log("HTTP server closed.");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  });

  // Also close Socket.IO connections
  io.close(() => {
    console.log("Socket.IO server closed.");
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default app;   // Optional: if you need to export for testing