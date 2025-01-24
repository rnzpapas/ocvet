import express from 'express';
import { createVaccinations, deleteVaccination, getAllVaccinations, getAllVaccinationsByPet, getAllVaccinationsByPetGroup } from '../controllers/vaccinationsController.js';

const ROUTER = express.Router();

ROUTER.post("/vaccinations/create", createVaccinations);
ROUTER.delete("/vaccinations/remove", deleteVaccination);
ROUTER.get("/vaccinations/all", getAllVaccinations);
ROUTER.get("/vaccinations/pet", getAllVaccinationsByPet);
ROUTER.get("/vaccinations/pet/group", getAllVaccinationsByPetGroup);


export default ROUTER;
