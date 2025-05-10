import handleResponse from "../middleware/responseHandler.js";
import { createVaccineService, deleteVaccineService, getVaccineByVaccineService, getVaccineService, updateVaccineStockService } from "../models/vaccineModel.js";

export const createVaccine = async (req, res, next) => {
    const { vaccine } = req.body;
    let existing_vaccine = await getVaccineByVaccineService(vaccine);
    try{
        if(existing_vaccine.length > 0) {
            return handleResponse(res, 400, "Vaccine already exists.");
        }else if(vaccine.length > 0){
            const result = await createVaccineService(vaccine)
            return handleResponse(res, 201, "Vaccine added successfully.");
        }
        return handleResponse(res, 400, "Vaccine failed to add.");
    }catch(err){
        return next(err);
    }
}

export const deleteVaccine = async (req, res, next) => {
    const id = req.params.id;
    try{
        const result = await deleteVaccineService(id);
        return handleResponse(res, 200, "Vaccine deleted successfully.");
    }catch(err){
        return next(err);
    }
}

export const getVaccine = async (req, res, next) => {
    try{
        const result = await getVaccineService();
        return handleResponse(res, 200, "Vaccine fetched successfully.", result);
    }catch(err){
        return next(err);
    }
}

export const updateVaccineStock = async (req, res, next) => {
    const { new_count, vaccid } = req.body;
    try{
        const result = await updateVaccineStockService(parseInt(new_count), vaccid);
        return handleResponse(res, 200, "Updated vaccine stock.", result);
    }catch(err){
        return next(err)
    }
}