import express from 'express';
import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from '../controllers/reportController.js';

const router = express.Router();

// === Définition des routes ===
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.post('/', createReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

export default router;
