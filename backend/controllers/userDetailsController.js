import { createUserDetailService, getAllUsersDetailService } from "../models/userDetailsModel.js";
import handleResponse from "../middleware/responseHandler.js"


export const createUserDetail = async (req, res, next) => {
    const {uaid, firstname, middlename, surname, gender, address} = req.body;
    try{
        const newUser = createUserDetailService(uaid, firstname, middlename, surname, gender, address);
        handleResponse(res, 201, "User created successfully", newUser);
    }catch(err) {
        next(err);
    }
}

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