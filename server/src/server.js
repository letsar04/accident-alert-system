import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// === Middlewares globaux ===
app.use(cors());
app.use(express.json());

// === Route test ===
app.get('/', (req, res) => {
  res.send('✅ API Accident Alert System opérationnelle');
});

// === Routes principales ===
app.use('/api/reports', reportRoutes);

// === Lancement du serveur ===
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});
