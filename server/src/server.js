import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../generated/prisma/index.js';
import 'dotenv/config';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// GET /reports - Récupérer tous les rapports
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des rapports" });
  }
});

// GET /reports/:id - Récupérer un rapport spécifique
app.get('/api/reports/:id', async (req, res) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!report) {
      return res.status(404).json({ error: "Rapport non trouvé" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du rapport" });
  }
});

// POST /reports - Créer un nouveau rapport
app.post('/api/reports', async (req, res) => {
  try {
    const { user_id, gps_lat, gps_long, severity, description } = req.body;
    const report = await prisma.report.create({
      data: {
        user_id,
        gps_lat,
        gps_long,
        severity,
        description
      }
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du rapport" });
  }
});

// PUT /reports/:id - Mettre à jour un rapport
app.put('/api/reports/:id', async (req, res) => {
  try {
    const { user_id, gps_lat, gps_long, severity, description } = req.body;
    const report = await prisma.report.update({
      where: { id: parseInt(req.params.id) },
      data: {
        user_id,
        gps_lat,
        gps_long,
        severity,
        description
      }
    });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du rapport" });
  }
});

// DELETE /reports/:id - Supprimer un rapport
app.delete('/api/reports/:id', async (req, res) => {
  try {
    await prisma.report.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du rapport" });
  }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne s'est produite" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.send('✅ API Accident Alert System opérationnelle');
});
