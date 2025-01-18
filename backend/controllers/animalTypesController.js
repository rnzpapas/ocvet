import handleResponse from "../middleware/responseHandler.js";
import { createAnimalTypeService, deleteAnimalTypeService, getAnimalTypeByTypeService, sortAnimalTypeAscService } from "../models/animalTypesModel.js";

export const createAnimalType = async (req, res, next) => {
    const { animal_type } = req.body;
    let existing_type = await getAnimalTypeByTypeService(animal_type);
    try{
        if(existing_type.length > 0){
            return handleResponse(res, 400, "Animal type already exists.");
        }else if(animal_type.length > 0){
            const atype = await createAnimalTypeService(animal_type);
            return handleResponse(res, 201, "Animal type has been added.");
        }else{
            return handleResponse(res, 400, "Please fill out all fields.");
        }
    }catch(err) {
        return next(err);
    }
}

export const deleteAnimalType = async (req, res, next) => {
    const atypeid = req.params.id
    try{
        const atype = await deleteAnimalTypeService(atypeid);
        return handleResponse(res, 200, "Animal type is deleted successfully.");
    }catch(err) {
        return next(err);
    }
}

export const sortAnimalTypeAsc = async (req, res, next) => {
    try{
        const atypes = await sortAnimalTypeAscService();
        return handleResponse(res, 200, "Animal types is fetch successfully.", atypes);
    }catch(err) {
        return next(err);
    }
}

