import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

// === Contrôleur : gestion des rapports d'accidents ===

export const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des rapports" });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await prisma.report.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!report) return res.status(404).json({ error: "Rapport non trouvé" });
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération du rapport" });
  }
};

export const createReport = async (req, res) => {
  try {
    const { user_id, gps_lat, gps_long, severity, description } = req.body;

    // Validation simple
    if (!user_id || !gps_lat || !gps_long || !severity) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    const report = await prisma.report.create({
      data: { user_id, gps_lat, gps_long, severity, description },
    });

    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du rapport" });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { user_id, gps_lat, gps_long, severity, description } = req.body;
    const report = await prisma.report.update({
      where: { id: parseInt(req.params.id) },
      data: { user_id, gps_lat, gps_long, severity, description },
    });
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du rapport" });
  }
};

export const deleteReport = async (req, res) => {
  try {
    await prisma.report.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression du rapport" });
  }
};
