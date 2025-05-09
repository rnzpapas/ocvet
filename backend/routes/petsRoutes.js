import express from 'express';
import upload from '../config/storage.js'; 
import { createPet, deletePet, getAllPets, getAllPetsByDate, getAllPetsByOwner,
getAllPetsByOwnerDescending, getAllPetsByRangeDate, getAllPetsByType, getAllPetsByTypeDescending,
getAllPetsCount, getPet, getPetByNickname, updatePet, updatePetImage, getAllCountPetsByOwner, getAllCountPetsByOwnerAndPets,
getAllPetsAndOwnerByType,
getPetByNicknameAdmin,
getAllPetsPdf,
getPetsCountByType,
createPetNoImage,
getPetMedicalHistoryPdf,
getPetMedicalHistory} from "../controllers/petsController.js"
import { authenticateAdminJwt, authenticateUserJwt } from '../middleware/authHandler.js'
const ROUTER = express.Router();

ROUTER.post("/pets/register", authenticateUserJwt, upload.single('image'), createPet);
ROUTER.post("/pets/register/noimg", authenticateUserJwt, createPetNoImage);
ROUTER.put("/pets/update/image/:id", authenticateUserJwt, upload.single("image"), updatePetImage);
ROUTER.delete("/pets/remove/:id", authenticateUserJwt, deletePet);
ROUTER.get("/pets/all", authenticateAdminJwt, getAllPets);
ROUTER.get("/pets/all/export", authenticateAdminJwt, getAllPetsPdf);
ROUTER.get("/pets?", getAllPetsByDate); 
ROUTER.get("/pets/owner", authenticateUserJwt, getAllPetsByOwner);
ROUTER.get("/pets/owner/desc", authenticateUserJwt, getAllPetsByOwnerDescending);
ROUTER.get("/pets/owner/count", authenticateUserJwt, getAllCountPetsByOwner);
ROUTER.get("/pets/owner/pet/count", authenticateUserJwt, getAllCountPetsByOwnerAndPets);
ROUTER.get("/pets/date/range", getAllPetsByRangeDate);
ROUTER.get("/pets/type", getAllPetsByType);
ROUTER.get("/pets/ownertype", authenticateUserJwt, getAllPetsAndOwnerByType);
ROUTER.get("/pets/type/desc", getAllPetsByTypeDescending);
ROUTER.get("/pets/count", getAllPetsCount);
ROUTER.get("/pets/details", getPet);
ROUTER.post("/pets/nickname", getPetByNickname);
ROUTER.get("/pets/admin/nickname", authenticateAdminJwt, getPetByNicknameAdmin);
ROUTER.put("/pets/update", updatePet);
ROUTER.get("/pet/records/export", getPetMedicalHistoryPdf);
ROUTER.get("/pet/records", getPetMedicalHistory);

// admin
ROUTER.get("/pets/type/count", authenticateAdminJwt, getPetsCountByType);

export default ROUTER;