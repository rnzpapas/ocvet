import handleResponse from "../middleware/responseHandler.js";
import { createPetBreedService, deletePetBreedService, getPetBreedService } from "../models/animalBreedModel.js";

export const createPetBreed = async () => {
    const { ATYPEID, breed_name } = req.body;
    try{
        await createPetBreedService(ATYPEID, breed_name);
        return handleResponse(res, 201, 'Success');
    }catch(err){
        return next(err);
    }
}

export const getPetBreed = async () => {
    const ATYPEID = req.query.ATYPEID;
    try{
        let result = await getPetBreedService(ATYPEID);
        return handleResponse(res, 200, 'Success', result);
    }catch(err){
        return next(err);
    }
}


export const deletePetBreed = async () => {
    const PBID = req.query.PBID;
    try{
        await deletePetBreedService(PBID);
        return handleResponse(res, 200, 'Success');
    }catch(err){
        return next(err);
    }
}

