import express from 'express';
import { createAnimalGroup, deleteAnimalGroup, getAnimalGroup, getAnimalGroupByOwner, getAnimalGroupByPopulation, updateAnimalGroup } from '../controllers/animalGroupController.js'


const ROUTER = express.Router();

ROUTER.post("/animal/group/create", createAnimalGroup);
ROUTER.delete("/animal/group/remove", deleteAnimalGroup);
ROUTER.get("/animal/group/all", getAnimalGroup);
ROUTER.get("/animal/group/owner", getAnimalGroupByOwner);
ROUTER.get("/animal/group/population", getAnimalGroupByPopulation);
ROUTER.put("/animal/group/update", updateAnimalGroup);



export default ROUTER;