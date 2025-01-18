import express from 'express';
import { createVaccine, deleteVaccine, getVaccine } from '../controllers/vaccinesController.js';

const ROUTER = express.Router();

ROUTER.get("/vaccine", getVaccine);
ROUTER.post("/vaccine/add", createVaccine);
ROUTER.delete("/vaccine/remove/:id", deleteVaccine);

export default ROUTER;