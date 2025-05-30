import express from 'express';
import { createAnimalGroup, deleteAnimalGroup, getAnimalGroup, getAnimalGroupByOwner, 
getAnimalGroupByPopulation, updateAnimalGroup, getAnimalGroupById, getAnimalGroupDetailsByPetOwner,
registerPetToPetGroup, removePetToPetGroup } from '../controllers/animalGroupController.js'
import { authenticateUserJwt } from '../middleware/authHandler.js'

const ROUTER = express.Router();

ROUTER.post("/animal/group/create", authenticateUserJwt, createAnimalGroup);
ROUTER.delete("/animal/group/remove", deleteAnimalGroup);
ROUTER.get("/animal/group/all", getAnimalGroup);
ROUTER.get("/animal/group/owner", getAnimalGroupByOwner);
ROUTER.get("/animal/group/petowner", getAnimalGroupDetailsByPetOwner);
ROUTER.get("/animal/group", getAnimalGroupById);
ROUTER.get("/animal/group/population", getAnimalGroupByPopulation);
ROUTER.put("/animal/group/update", updateAnimalGroup);
ROUTER.put("/animal/group/pet/add", registerPetToPetGroup);
ROUTER.put("/animal/group/pet/remove", removePetToPetGroup);




export default ROUTER;