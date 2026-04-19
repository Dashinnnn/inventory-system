import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {

  console.log('Attempting to connect to:', MONGODB_URI);
  
  if (!MONGODB_URI) {
    console.error(' MONGODB_URI is missing in .env file');
    process.exit(1);
  }

  // Prevent multiple connections if already connected/ing
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB already connected or connecting');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log(' MongoDB connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  }
};

// Event listeners (only attach once)
mongoose.connection.on('connected', () => console.log('Mongoose: Connected to DB'));
mongoose.connection.on('error', (err) => console.error('Mongoose: Error', err));
mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose: Disconnected - will auto-retry');
});