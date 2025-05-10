import handleResponse from '../middleware/responseHandler.js';
import { createVaccinationsService, deleteVaccinationService, getAllVaccinationsByPetGroupService, getAllVaccinationsByPetService, getAllVaccinationsService, getRecentVaccinationsByOwnerService, getVaccinesBaseOnDemandService } from '../models/vaccinationsModel.js'

export const createVaccinations = async (req, res, next) => {
    let { vaccid, petid, pgid, asid } = req.body;
    petid === 'null' && (petid = null);
    pgid === 'null' && (pgid = null);

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;  
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    try{
        await createVaccinationsService(vaccid, petid, pgid, asid, date, time);
        return handleResponse(res, 201, "Vaccination successfully created.");
    }catch(err){
        return next(err);
    }
}

export const deleteVaccination = async (req, res, next) => {
    const pvaccid = req.query.pvaccid;
    try{
        await deleteVaccinationService(pvaccid);
        return handleResponse(res, 200, "Vaccination successfully deleted.");
    }catch(err){
        return next(err);
    }
}

export const getAllVaccinations = async (req, res, next) => {
    try{
        const result = await getAllVaccinationsService();
        return handleResponse(res, 200, "Vaccination successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}

export const getAllVaccinationsByPet = async (req, res, next) => {
    const petid = req.query.petid;
    try{
        const result = await getAllVaccinationsByPetService(petid);
        return handleResponse(res, 200, "Vaccination successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}

export const getAllVaccinationsByPetGroup = async (req, res, next) => {
    const pgid = req.query.pgid;
    try{
        const result = await getAllVaccinationsByPetGroupService(pgid);
        return handleResponse(res, 200, "Vaccination successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}

export const getRecentVaccinationsByOwner = async (req, res, next) => {
    const uid = req.query.uid;
    try{
        const result = await getRecentVaccinationsByOwnerService(uid);
        return handleResponse(res, 200, "Vaccinations successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}

export const getVaccinesBaseOnDemand = async (req, res, next) => {
    try{
        const result = getVaccinesBaseOnDemandService();
        return handleResponse(res, 200, "Success", result);
    }catch(err){
        return next(err);
    }
}