import handleResponse from "../middleware/responseHandler.js";
import { createPetService, deletePetService, getAllPetsByDateService, getAllPetsByOwnerDescendingService, getAllPetsByOwnerService, getAllPetsByRangeDateService, getAllPetsByTypeDescendingService, getAllPetsByTypeService, getAllPetsCountService, getAllPetsService, getPetByNicknameService, getPetService, updatePetImageService, updatePetService } from "../models/petsModel.js";

export const createPet = async (req, res, next) => {
    const { atypeid, pet_owner, nickname, pet_image, registration_timestamp } = req.body;
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    // module to save images on project folder ....
    const imageFile = req.file;
    try{
        if(existing_nickname.length > 0){
            return handleResponse(res, 400, "Pet nickname already taken.");
        }
        if(!imageFile) {
            return handleResponse(res, 400, "No pet image is not uploaded.");
        }
        const image = imageFile.path;
        const query = await createPetService(atypeid, pet_owner, nickname, pet_image, registration_timestamp);
        return handleResponse(res, 201, "Pet successfully registered.");
    }catch(err) {
        return next(err);
    }
}

export const updatePet = async (req, res, next) => {
    const { petid, pet_owner, atypeid, nickname } = req.body;
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    try{
        if(existing_nickname.length > 0){
            return handleResponse(res, 400, "Pet nickname already taken.");
        }
        const query = await updatePetService(petid, atypeid, nickname );
        return handleResponse(res, 200 , "Pet successfully updated.");
    }catch(err) {
        return next(err);
    }
}

export const updatePetImage = async (req, res, next) => {
    const { petid, pet_image } = req.body;
    const imageFile = req.file;
    try{
        if(imageFile){
            const image = imageFile.path;
            const query = updatePetImageService(petid, pet_image);
            return handleResponse(res, 200, "Pet image successfully uploaded.");
        }
        return handleResponse(res, 400, "No pet image uploaded.");
    }catch(err) {
        return next(err);
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
    const petid = req.params.id;
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

export const getAllPets = async (req, res, next) => {
    try{
        const result = await getAllPetsService();
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByType = async (req, res, next) => {
    const { atypeid } = req.body;
    try{
        const result = await getAllPetsByTypeService(atypeid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByTypeDescending = async (req, res, next) => {
    const { atypeid } = req.body;
    try{
        const result = await getAllPetsByTypeDescendingService(atypeid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByOwner = async (req, res, next) => {
    const { uid } = req.body;
    try{
        const result = await getAllPetsByOwnerService(uid);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByOwnerDescending = async (req, res, next) => {
    const { uid } = req.body;
    try{
        const result = await getAllPetsByOwnerDescendingService(uid);
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
    const { date } = req.body;
    try{
        const result = await getAllPetsByDateService(date);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}

export const getAllPetsByRangeDate = async (req, res, next) => {
    const { todate, fromdate } = req.body;
    try{
        const result = await getAllPetsByRangeDateService(todate, fromdate);
        return handleResponse(res, 200, "Pets successfully fetched.", result);
    }catch(err) {
        return next(err);
    }
}
