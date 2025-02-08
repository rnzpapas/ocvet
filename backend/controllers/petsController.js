import handleResponse from "../middleware/responseHandler.js";
import { createPetService, deletePetService, getAllCountPetsByOwnerAndPetsService, getAllCountPetsByOwnerService, getAllPetsAndOwnerByTypeService, getAllPetsByDateService, getAllPetsByOwnerDescendingService, getAllPetsByOwnerService, getAllPetsByRangeDateService, getAllPetsByTypeDescendingService, getAllPetsByTypeService, getAllPetsCountService, getAllPetsService, getPetByNicknameService, getPetService, updatePetImageService, updatePetService } from "../models/petsModel.js";
import path from "path";
import fs from 'fs'

export const createPet = async (req, res, next) => {
    const { atypeid, pet_owner, nickname} = req.body;
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    // module to save images on project folder ....
    const imageFile = req.file;
    const filename = imageFile.originalname.split(".")[0];
    const image_name = filename + path.extname(imageFile.path);
    const registration_timestamp = Date.now() / 1000.0;

    try{
        if(existing_nickname.length > 0){
            return handleResponse(res, 400, "Pet nickname already taken.");
        }
        if(!imageFile) {
            return handleResponse(res, 400, "No pet image is not uploaded.");
        }
        const image = imageFile.path;
        const query = await createPetService(atypeid, pet_owner, nickname, image_name, registration_timestamp);
        return handleResponse(res, 201, "Pet successfully registered.");
    }catch(err) {
        return next(err);
    }
}

export const updatePet = async (req, res, next) => {
    const petid = req.query.petid;
    const { pet_owner, atypeid, nickname } = req.body;
    const existing_nickname = await getPetByNicknameService(nickname, pet_owner);
    try{
        if(existing_nickname.length > 0){
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
    const filename = imageFile.originalname.split(".")[0];
    const image_name = filename + path.extname(imageFile.path);

    try{
        if(imageFile){
            const pet_image = await getPetService(id);
            const pet_last_image = path.join("..", "frontend", "public", "pet", pet_image.image);
            const pet_last_img_abspath = path.resolve(pet_last_image);
            
            if(fs.existsSync(pet_last_img_abspath)){
                fs.unlink(pet_last_img_abspath, (err) => {
                    if(err) {
                        return handleResponse(res, 400, "Failed to delete the previous image.");
                    }
                    const image = imageFile.path;
                    const query = updatePetImageService(id, image_name);
                    return handleResponse(res, 200, "Pet image successfully updated.");
                })
            }else{
                const image = imageFile.path;
                const query = updatePetImageService(id, image_name);
                return handleResponse(res, 200, "Pet image successfully updated.");
            }
        }else{
            return handleResponse(res, 400, "No pet image uploaded.");
        }
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

export const getAllPets = async (req, res, next) => {
    try{
        const result = await getAllPetsService();
        return handleResponse(res, 200, "Pets successfully fetched.", result);
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
