import express from 'express';
import {upload} from "../config/storage.js";
import { createPet, deletePet, getAllPets, getAllPetsByDate, getAllPetsByOwner,
getAllPetsByOwnerDescending, getAllPetsByRangeDate, getAllPetsByType, getAllPetsByTypeDescending,
getAllPetsCount, getPet, getPetByNickname, updatePet, updatePetImage} from "../controllers/petsController.js"
import { authenticateAdminJwt, authenticateUserJwt } from '../middleware/authHandler.js'
const ROUTER = express.Router();

ROUTER.post("/pets/register", authenticateUserJwt, upload.single('image'), createPet);
ROUTER.put("/pets/update/image/:id", authenticateUserJwt, upload.single("image"), updatePetImage);
ROUTER.delete("/pets/remove/:id", authenticateUserJwt, deletePet);
ROUTER.get("/pets/all", authenticateAdminJwt, getAllPets);
ROUTER.get("/pets?", getAllPetsByDate); 
ROUTER.get("/pets/owner?", authenticateUserJwt, getAllPetsByOwner);
ROUTER.get("/pets/owner/desc", getAllPetsByOwnerDescending);
ROUTER.get("/pets/date/range", getAllPetsByRangeDate);
ROUTER.get("/pets/type", getAllPetsByType);
ROUTER.get("/pets/type/desc", getAllPetsByTypeDescending);
ROUTER.get("/pets/count", getAllPetsCount);
ROUTER.get("/pets/details", getPet);
ROUTER.post("/pets/nickname", getPetByNickname);
ROUTER.put("/pets/update", updatePet);


export default ROUTER;