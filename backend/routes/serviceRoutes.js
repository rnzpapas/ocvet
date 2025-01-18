import express from 'express';
import { createServiceClinic, deleteServiceClinic, getServiceClinic } from '../controllers/serviceController.js';

const ROUTER = express.Router();

ROUTER.get("/service",  getServiceClinic);
ROUTER.post("/service/add", createServiceClinic);
ROUTER.delete("/service/remove/:id", deleteServiceClinic);

export default ROUTER;