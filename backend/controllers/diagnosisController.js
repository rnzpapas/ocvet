import handleResponse from "../middleware/responseHandler.js"
import { createDiagnosisService, deleteDiagnosisService, getDiagnosisByDiagnosisService, getDiagnosisService } from "../models/diagnosisModel.js";

export const createDiagnosis = async (req, res, next) => {
    const { diagnosis } = req.body;
    let existing_diagnosis = await getDiagnosisByDiagnosisService(diagnosis);
    try{
        if(existing_diagnosis.length > 0){
            return handleResponse(res, 400, "Diagnosis already exists.");
        }else if(diagnosis.length > 0){
            const result = await createDiagnosisService(diagnosis);
            return handleResponse(res, 201, "Diagnosis successfully added.");
        }
        return handleResponse(res, 400, "Diagnosis failed to be added.");
    }catch(err) {
        return next(err);
    }
}

export const deleteDiagnosis = async (req, res, next) => {
    const id = req.params.id
    try{
        const result = await deleteDiagnosisService(id);
        return handleResponse(res, 200, "Successfully deleted the diagnosis.")
    }catch(err) {
        return next(err);
    }
}

export const getDiagnosis = async (req, res, next) => {
    try{
        const result = await getDiagnosisService();
        return handleResponse(res, 200, "Services successfully fetched.", result)
    }catch(err) {
        return next(err);
    }
}
