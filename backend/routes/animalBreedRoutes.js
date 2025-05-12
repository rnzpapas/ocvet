import express from 'express';
import { createPetBreed, deletePetBreed, getPetBreed } from '../controllers/animalBreedController.js';

const ROUTER = express.Router();

ROUTER.post("/breed/create", createPetBreed);
ROUTER.get("/breed/delete", deletePetBreed);
ROUTER.get("/breed/all", getPetBreed);

export default ROUTER;