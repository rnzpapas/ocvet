import handleResponse from "../middleware/responseHandler.js";
import { createAnimalGroupService, deleteAnimalGroupService, getAnimalGroupByOwnerService, getAnimalGroupByPopulationService, getAnimalGroupService, updateAnimalGroupService } from "../models/animalGroupModel.js";

export const createAnimalGroup = async (req, res, next) => {
    const { PETS, ATYPEID, POPULATION, GROUP_NICKNAME } = req.body;
    const CREATED_TIMESTAMP = new Date();
    try{
        GROUP_NICKNAME.length === 0 && (GROUP_NICKNAME = "MyPets");
        await createAnimalGroupService(PETS, ATYPEID, POPULATION, GROUP_NICKNAME, CREATED_TIMESTAMP);
        return handleResponse(res, 201, "Pet group successfully created.");
    }catch(err){
        return next(err);
    }
}

export const updateAnimalGroup = async (req, res, next) => {
    const { PGID, PETS, ATYPEID, POPULATION, GROUP_NICKNAME } = req.body;
    try{
        GROUP_NICKNAME.length === 0 && (GROUP_NICKNAME = "MyPets");
        await updateAnimalGroupService(PGID, PETS, ATYPEID, POPULATION, GROUP_NICKNAME);
        return handleResponse(res, 200, "Pet group successfully updated.");
    }catch(err){
        return next(err);
    }
}

export const deleteAnimalGroup = async (req, res, next) => {
    const id = req.query.id;
    try{
        await deleteAnimalGroupService(id);
        return handleResponse(res, 200, "Pet group successfully deleted.");
    }catch(err){
        return next(err);
    }
}

export const getAnimalGroup = async (req, res, next) => {
    try{
        const result = await getAnimalGroupService();
        return handleResponse(res, 200, "Pet group successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}

export const getAnimalGroupByOwner = async(req, res, next) => {
    const id = req.query.id;
    try{
        const result = await getAnimalGroupByOwnerService(id);
        return handleResponse(res, 200, "Pet group successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}

export const getAnimalGroupByPopulation = async (req, res, next) => {
    const total = req.query.total;
    try{
        const result = await getAnimalGroupByPopulationService(total);
        return handleResponse(res, 200, "Pet group successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}