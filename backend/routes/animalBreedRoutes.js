import express from 'express';
import { createPetBreed, deletePetBreed, getPetBreed } from '../controllers/animalBreedController.js';

const ROUTER = express.Router();

ROUTER.get("/breed", getPetBreed);
ROUTER.post("/breed/create", createPetBreed);
ROUTER.delete("/breed/delete", deletePetBreed);

export default ROUTER;