import handleResponse from "../middleware/responseHandler.js"
import { createServiceClinicService, deleteServiceClinicService, getServiceByServiceDescService, getServiceClinicService } from "../models/serviceModel.js";

export const createServiceClinic = async (req, res, next) => {
    const { service } = req.body;
    let existing_service = await getServiceByServiceDescService(service);
    try{
        if(existing_service.length > 0){
            return handleResponse(res, 400, "Service already exists.");
        }else if(service.length > 0){
            const result = await createServiceClinicService(service);
            return handleResponse(res, 201, "Service successfully added.");
        }
        return handleResponse(res, 400, "Service failed to be added.");
    }catch(err) {
        return next(err);
    }
}

export const deleteServiceClinic = async (req, res, next) => {
    const id = req.params.id
    try{
        const result = await deleteServiceClinicService(id);
        return handleResponse(res, 200, "Successfully deleted the service.")
    }catch(err) {
        return next(err);
    }
}

export const getServiceClinic = async (req, res, next) => {
    try{
        const result = await getServiceClinicService();
        return handleResponse(res, 200, "Services successfully fetched.", result)
    }catch(err) {
        return next(err);
    }
}
