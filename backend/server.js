import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { initDatabase } from './db/store.js';
import authRoutes from './routes/authRoutes.js';
import claimRoutes from './routes/claimRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded documents statically
const uploadsFolder = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}
app.use('/uploads', express.static(uploadsFolder));

// Friendly Root Landing Route
app.get('/', (req, res) => {
  res.send(`
    <!Valid HTML>
    <html>
      <head>
        <title>Turants Claims API Backend</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #FDFBF7; color: #1C2B26; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
          .card { background: rgba(233, 229, 214, 0.6); padding: 40px; border-radius: 20px; border: 1px solid #C4B38A; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
          h1 { color: #2E5334; margin-bottom: 8px; }
          p { color: #5C655F; line-height: 1.5; font-size: 0.95rem; }
          .status { display: inline-block; background: #2E5334; color: #fff; padding: 6px 16px; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>⚡ Turants Claims Platform API</h1>
          <p>Official Healthcare Reimbursement Ledger & Audit System Backend is Live & Ready.</p>
          <div class="status">● API SERVICE ONLINE</div>
        </div>
      </body>
    </html>
  `);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/claims', claimRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    service: 'Turant Claims Management Platform API'
  });
});

// Initialize DB and start server
initDatabase(MONGO_URI).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Claims API backend running on http://127.0.0.1:${PORT}`);
  });
});
