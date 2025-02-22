import { getAllUsersDetailService, updateUserDetailService } from "../models/userDetailsModel.js";
import handleResponse from "../middleware/responseHandler.js"

export const getAllUsersDetail = async (req, res, next) => {
    try{
        const users = getAllUsersDetailService()
        handleResponse(res, 200, "Data successfully retrieved", users);
    }catch(err) {
        next(err);
    }
}

export const getUserDetailById = async (req, res, next) => {

}

export const updateUserDetail = async (req, res, next) => {
    const id = req.params.id;
    const { firstname, middlename, surname, address, gender } = req.body;
    try{
        await updateUserDetailService(firstname, middlename, surname, address, gender, id);
        return handleResponse(res, 200, 'User information change success.');
    }catch(err){
        return next(err)
    }
}

