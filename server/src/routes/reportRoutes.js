import express from 'express';
import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from '../controllers/reportControllers.js';
import { validateReport } from '../middlewares/validateReport.js';

const router = express.Router();

// === Définition des routes ===
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.post('/',validateReport, createReport);
router.put('/:id',validateReport, updateReport);
router.delete('/:id', deleteReport);

export default router;
