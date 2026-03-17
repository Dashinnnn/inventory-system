import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma';

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: ' ims-api is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/db', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'ok', message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed', error });
  }
});

app.listen(PORT, () => {
  console.log(` Express server running on http://localhost:${PORT}`);
});