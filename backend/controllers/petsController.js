import handleResponse from "../middleware/responseHandler.js";
import { createPetService, deletePetService, getAllCountPetsByOwnerAndPetsService, getAllCountPetsByOwnerService, getAllPetMedicalRecordsService, getAllPetsAndOwnerByTypeService, getAllPetsByDateService, getAllPetsByOwnerDescendingService, getAllPetsByOwnerService, getAllPetsByRangeDateService, getAllPetsByTypeDescendingService, getAllPetsByTypeService, getAllPetsCountService, getAllPetsPdfService, getAllPetsService, getPetByNicknameAdminService, getPetByNicknameService, getPetsCountByTypeService, getPetService, updatePetImageService, updatePetService } from "../models/petsModel.js";
import { generatePdf } from "../utils/reportUtils.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/storage.js";

export const createPet = async (req, res, next) => {
    const { atypeid, pet_owner, nickname} = req.body;
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    const imageFile = req.file;
    const image_name = imageFile.originalname
    const registration_timestamp = Date.now() / 1000.0;

    try{
        if(existing_nickname.length > 0){
            return handleResponse(res, 400, "Pet nickname already taken.");
        }
        if(!imageFile) {
            return handleResponse(res, 400, "No pet image is not uploaded.");
        }
        const query = await createPetService(atypeid, pet_owner, nickname, image_name, registration_timestamp);
        return handleResponse(res, 201, "Pet successfully registered.");
    }catch(err) {
        return next(err);
    }
}

export const createPetNoImage = async (req, res, next) => {
    const { atypeid, pet_owner, nickname} = req.body;
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    const registration_timestamp = Date.now() / 1000.0;

    try{
        if(existing_nickname.length > 0){
            return handleResponse(res, 400, "Pet nickname already taken.");
        }
        await createPetService(atypeid, pet_owner, nickname, null, registration_timestamp);
        return handleResponse(res, 201, "Pet successfully registered.");
    }catch(err) {
        return next(err);
    }
}

export const updatePet = async (req, res, next) => {
    const petid = req.query.petid;
    const { pet_owner, atypeid, nickname } = req.body;
    const pet = await getPetService(petid);
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    try{
        if(existing_nickname.length > 0 && pet.nickname !== nickname){
            return handleResponse(res, 400, "Pet nickname already taken.");
        }

        if(nickname.length === 0){
            return handleResponse(res, 400, "Pet nickname is empty.");
        }

        if(nickname.length > 10){
            return handleResponse(res, 400, "Pet nickname is too long. Maximum of 10 characters only.");
        }
        const query = await updatePetService(petid, atypeid, nickname );
        return handleResponse(res, 200 , "Pet successfully updated.");
    }catch(err) {
        return next(err);
    }
}

export const updatePetImage = async (req, res, next) => {
    const id = req.params.id;
    const imageFile = req.file;

    if (!imageFile) {
        return handleResponse(res, 400, "No image uploaded.");
    }

    try {
        const pet = await getPetService(id);

        if (pet && pet.image) {
            await s3.send(
                new DeleteObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `pet/${pet.image}`,
                })
            );
        }
        const imageUrl = req.file.location;
        await updatePetImageService(id, imageFile.originalname);
        return handleResponse(res, 200, "Pet image successfully updated.", imageUrl || "URL NOT FOUND")
    } catch (err) {
        console.error("Error updating pet image:", err);
        next(err);
    }
}

export const deletePet = async (req, res, next) => {
    const id = req.params.id
    try{
        const query = await deletePetService(id);
        return handleResponse(res, 200, "Pet successfully deleted.");
    }catch(err) {
        return next(err);
    }
}

export const getPet = async (req, res, next) => {
    const petid = req.query.petid;
    try{
        const result = await getPetService(petid);
        return handleResponse(res, 200, "Pet successfully fetched.", result)
    }catch(err) {
        return next(err);
    }
}

export const getPetByNickname = async (req, res, next) => {
    const { pet_owner, nickname } = req.body;
    try{
        if(nickname.length > 0 && pet_owner.length > 0){
            const result = await getPetByNicknameService(nickname, pet_owner);
            return handleResponse(res, 200, "Pet successfully fetched", result);
        }
        return handleResponse(res, 400, "Please give a nickname to search.");
    }catch(err) {
        return next(err);
    }
}

export const getPetByNicknameAdmin = async (req, res, next) => {
    const pet = req.query.pet;
    try{
        if(pet.length > 0){
            const result = await getPetByNicknameAdminService(pet);
            return handleResponse(res, 200, "Pet successfully fetched", result);
        }
    }catch(err) {
        return next(err);
    }
}

export const getAllPets = async (req, res, next) => {
    try{
        const result = await getAllPetsService();
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsPdf = async (req, res, next) => {
    const dateObj = new Date();
    const dateTimeStamp = `${dateObj.getFullYear()}${dateObj.getMonth()+1}${dateObj.getDate()}_${dateObj.getHours()}${dateObj.getMinutes()}`

    try{
        const result = await getAllPetsPdfService();
        const headers = ['PET ID', 'Nickname', 'Animal Type', 'Pet Owner', 'Date Registered']
        generatePdf(res, 'Pets', headers, result, `PetList_${dateTimeStamp}`)
    }catch(err) {
        return next(err);
    }
}

export const getPetMedicalHistory = async (req, res, next) => {
    const { PETID } = req.query;
    try{
        const result = await getAllPetMedicalRecordsService(PETID);
        return handleResponse(res, 200, "Medical records fetched", result);
    }catch(err) {
        return next(err);
    }
}

export const getPetMedicalHistoryPdf = async (req, res, next) => {
    const { PETID } = req.query;
    const dateObj = new Date();
    const dateTimeStamp = `${dateObj.getFullYear()}${dateObj.getMonth()+1}${dateObj.getDate()}_${dateObj.getHours()}${dateObj.getMinutes()}`;

    try{
        const result = await getAllPetMedicalRecordsService(PETID);
        const headers = ['PET ID', 'Nickname', 'Animal Type', 'Pet Owner', 'Date Registered']
        generatePdf(res, 'Pets', headers, result, `PetList_${dateTimeStamp}`);
    }catch(err) {
        return next(err);
    }
}


export const getAllPetsAndOwnerByType = async (req, res, next) => {
    const atypeid  = req.query.atypeid;
    const uid = req.query.uid
    try{
        const result = await getAllPetsAndOwnerByTypeService(uid, atypeid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByType = async (req, res, next) => {
    const atypeid  = req.query.atypeid;
    try{
        const result = await getAllPetsByTypeService(atypeid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getPetsCountByType = async (req, res, next) => {
    try{
        const result = await getPetsCountByTypeService();
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByTypeDescending = async (req, res, next) => {
    const atypeid  = req.query.atypeid;

    try{
        const result = await getAllPetsByTypeDescendingService(atypeid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByOwner = async (req, res, next) => {
    const uid = req.query.uid;
    try{
        const result = await getAllPetsByOwnerService(uid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByOwnerDescending = async (req, res, next) => {
    const uid = req.query.uid;
    try{
        const result = await getAllPetsByOwnerDescendingService(uid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllCountPetsByOwner = async (req, res, next) => {
    const uid = req.query.uid;
    try{
        const result = await getAllCountPetsByOwnerService(uid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllCountPetsByOwnerAndPets = async (req, res, next) => {
    const uid = req.query.uid;
    try{
        const result = await getAllCountPetsByOwnerAndPetsService(uid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsCount = async (req, res, next) => {
    try{
        const result = await getAllPetsCountService();
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByDate = async (req, res, next) => {
    const date = req.query.date;
    const dateConverted = new Date(date);
    const dateQuery = `${dateConverted.getFullYear()}-${dateConverted.getMonth()+1}-${dateConverted.getDate()}`
    try{
        const result = await getAllPetsByDateService(dateQuery);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByRangeDate = async (req, res, next) => {
    const todate = req.query.todate;
    const fromdate = req.query.fromdate;

    try{
        const result = await getAllPetsByRangeDateService(todate, fromdate);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}
