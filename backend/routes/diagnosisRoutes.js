import express from 'express';
import { createDiagnosis, deleteDiagnosis, getDiagnosis } from '../controllers/diagnosisController.js';

const ROUTER = express.Router();

ROUTER.get("/diagnosis", getDiagnosis);
ROUTER.post("/diagnosis/add", createDiagnosis);
ROUTER.delete("/diagnosis/remove/:id", deleteDiagnosis);

export default ROUTER;