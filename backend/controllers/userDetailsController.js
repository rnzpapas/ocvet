import { getAllUsersDetailService } from "../models/userDetailsModel.js";
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

}

export const deleteUserDetail = async (req, res, next) => {

}