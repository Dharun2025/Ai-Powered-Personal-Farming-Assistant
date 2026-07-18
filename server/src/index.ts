import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Expense from './models/Expense';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'agri-ai-super-secret-key-12345';
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors());
app.use(express.json());

// In-Memory Database Fallbacks (If MongoDB is not connected)
let isMongoConnected = false;
const fallbackUsers: any[] = [];
let fallbackExpenses: any[] = [
  { id: "1", userId: "1", category: "Seeds", amount: 4500, date: "2026-06-10", desc: "Premium wheat seeds" },
  { id: "2", userId: "1", category: "Fertilizer", amount: 6200, date: "2026-06-15", desc: "Potash and Urea bags" },
  { id: "3", userId: "1", category: "Labor", amount: 8000, date: "2026-06-20", desc: "Field sowing labor wages" },
];

// Mongoose Connection Setup
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB connected successfully.');
      isMongoConnected = true;
    })
    .catch((err) => {
      console.error('MongoDB connection failed. Continuing in offline/fallback mock mode.', err.message);
    });
} else {
  console.log('MONGODB_URI not configured in env. Launching server in offline/fallback mock mode.');
}

// Authentication Middleware
const authenticateToken = (req: Request | any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

/* --- API ROUTER CHANNELS --- */

// Health & Status Check
app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    database: isMongoConnected ? 'MongoDB connected' : 'Local Fallback Storage Active',
    activeUsers: isMongoConnected ? 'Live' : fallbackUsers.length,
    timestamp: new Date()
  });
});

// Authentication: Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (isMongoConnected) {
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const newUser = await User.create({ name, email, password: hashedPassword, role });
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET);
      return res.status(201).json({ token, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    // In-memory fallback register
    const existing = fallbackUsers.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = { id: (fallbackUsers.length + 1).toString(), name, email, password: hashedPassword, role: role || 'farmer' };
    fallbackUsers.push(newUser);
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET);
    return res.status(201).json({ token, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
  }
});

// Authentication: Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

  if (isMongoConnected) {
    try {
      const dbUser = await User.findOne({ email });
      if (!dbUser) return res.status(400).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, dbUser.password);
      if (!match) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: dbUser._id, role: dbUser.role }, JWT_SECRET);
      return res.json({ token, user: { name: dbUser.name, email: dbUser.email, role: dbUser.role } });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    // In-memory login fallback
    const mockUser = fallbackUsers.find(u => u.email === email);
    if (!mockUser) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, mockUser.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: mockUser.id, role: mockUser.role }, JWT_SECRET);
    return res.json({ token, user: { name: mockUser.name, email: mockUser.email, role: mockUser.role } });
  }
});

// Expense Tracker: List
app.get('/api/expenses', authenticateToken, async (req: Request | any, res: Response) => {
  const userId = req.user.id;

  if (isMongoConnected) {
    try {
      const items = await Expense.find({ userId }).sort({ date: -1 });
      return res.json(items);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    return res.json(fallbackExpenses.filter(e => e.userId === userId));
  }
});

// Expense Tracker: Create
app.post('/api/expenses', authenticateToken, async (req: Request | any, res: Response) => {
  const userId = req.user.id;
  const { category, amount, date, desc } = req.body;

  if (!category || !amount) return res.status(400).json({ message: 'Missing fields' });

  if (isMongoConnected) {
    try {
      const item = await Expense.create({ userId, category, amount, date, desc });
      return res.status(201).json(item);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    const newItem = { id: (fallbackExpenses.length + 1).toString(), userId, category, amount, date: date || new Date().toISOString(), desc };
    fallbackExpenses.push(newItem);
    return res.status(201).json(newItem);
  }
});

// Expense Tracker: Delete
app.delete('/api/expenses/:id', authenticateToken, async (req: Request | any, res: Response) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await Expense.findByIdAndDelete(id);
      return res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    fallbackExpenses = fallbackExpenses.filter(e => e.id !== id);
    return res.json({ message: 'Deleted successfully' });
  }
});

// AI Proxies: Crop Recommendation Form Output
app.post('/api/ai/recommend', (req: Request, res: Response) => {
  const { soilType, ph, rainfall } = req.body;
  
  // Basic mock AI classifier logic
  let crop = "Wheat";
  let confidence = 94;
  let yieldEst = "4.2 Tons/Acre";
  let profitEst = "₹58,000 / Acre";

  if (soilType === 'Loamy' && ph > 6.0) {
    crop = "Basmati Rice";
    confidence = 92;
    yieldEst = "3.8 Tons/Acre";
    profitEst = "₹72,000 / Acre";
  } else if (soilType === 'Sandy') {
    crop = "Groundnuts";
    confidence = 88;
    yieldEst = "2.1 Tons/Acre";
    profitEst = "₹46,000 / Acre";
  }

  res.json({ crop, confidence, yieldEst, profitEst });
});

// Launch server listener
app.listen(PORT, () => {
  console.log(`AgriAI Server running on port ${PORT}`);
});
export default app;
