import handleResponse from "../middleware/responseHandler.js"
import { createMailGroupsService, deleteMailGroupsService, getMailGroupsService } from "../models/mailGroupsModel.js";

export const createMailGroups = async (req, res, next) => {
    const { audience, nickname } = req.body;
    try{
        if(audience.length > 0 && nickname.length > 0){
            const result = await createMailGroupsService(audience, nickname);
            return handleResponse(res, 201, "Mail group successfully added.");
        }
        return handleResponse(res, 400, "Mail group failed to be added.");
    }catch(err) {
        return next(err);
    }
}

export const deleteMailGroups = async (req, res, next) => {
    const id = req.params.id
    try{
        const result = await deleteMailGroupsService(id);
        return handleResponse(res, 200, "Successfully deleted the mail group.")
    }catch(err) {
        return next(err);
    }
}

export const getMailGroups = async (req, res, next) => {
    try{
        const result = await getMailGroupsService();
        return handleResponse(res, 200, "Mail groups successfully fetched.", result)
    }catch(err) {
        return next(err);
    }
}
