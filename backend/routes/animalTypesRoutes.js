import express from 'express';
import { createAnimalType, deleteAnimalType, sortAnimalTypeAsc } from '../controllers/animalTypesController.js';

const ROUTER = express.Router();

ROUTER.get("/atypes/sort", sortAnimalTypeAsc);
ROUTER.post("/atypes/add", createAnimalType);
ROUTER.delete("/atypes/remove/:id", deleteAnimalType);

export default ROUTER;