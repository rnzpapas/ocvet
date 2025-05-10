import express from 'express';
import { createVaccinations, deleteVaccination, 
    getAllVaccinations, getAllVaccinationsByPet, 
    getAllVaccinationsByPetGroup, getRecentVaccinationsByOwner, 
    getVaccinesBaseOnDemand} from '../controllers/vaccinationsController.js';

const ROUTER = express.Router();

ROUTER.post("/vaccinations/create", createVaccinations);
ROUTER.delete("/vaccinations/remove", deleteVaccination);
ROUTER.get("/vaccinations/all", getAllVaccinations);
ROUTER.get("/vaccinations/pet", getAllVaccinationsByPet);
ROUTER.get("/vaccinations/pet/group", getAllVaccinationsByPetGroup);
ROUTER.get("/vaccinations/owner/latest", getRecentVaccinationsByOwner);
ROUTER.get("/vaccinations/demand", getVaccinesBaseOnDemand);

export default ROUTER;
