import { createUserAccountService, deleteUserAccountService, getAllUsersAccountService, getUserAccountByIdService, getUserAccountByUsernameService, updateUserAccountService } from "../models/userAccountModel.js";
import handleResponse from "../middleware/responseHandler.js"

export const createUserAccount = async (req, res, next) => {
    const {username, password, email, role, date_joined} = req.body;
    const existing_user = await getUserAccountByUsernameService(username);
    try{
        if(username.length === 0 || password.length === 0 || email.length === 0 ||
                role.length === 0 || date_joined.length === 0 ) {
            return handleResponse(res, 400, "Please fill out all fields.");
        }else if(password.length < 6){
            return handleResponse(res, 400, "Password must be minimum of 6 characters.");
        }else if(existing_user){
            return handleResponse(res, 400, "User already exists.");
        }else{
            const newUser = await createUserAccountService(username, password, email, role, date_joined);
            return handleResponse(res, 201, "User created successfully.", newUser);
        }
    }catch(err) {
        return next(err);
    }
}

export const getAllUsersAccount = async (req, res, next) => {
    try{
        const users = await getAllUsersAccountService();
        if(!users) return handleResponse(res, 404, "Data retrieval failed");
        return handleResponse(res, 200, "Data retrieval success", users);
    }catch(err) {
        return next(err);
    }
}

export const getUserAccountById = async (req, res, next) => {
    try{
        const user = await getUserAccountByIdService(req.params.id);
        if(!user) return handleResponse(res, 404, "User not found");
        return handleResponse(res, 200, "Data retrieval success", user);
    }catch(err) {
        return next(err);
    }
}

export const updateUserAccount = async (req, res, next) => {
    const { old_username, username, password, email} = req.body;
    const old_user = await getUserAccountByUsernameService(username);
    const existing_user = await getUserAccountByUsernameService(username);
    try{
        const user = await updateUserAccountService(old_user.UAID, username, password, email);
        if(existing_user) return handleResponse(res, 400, "Username already taken.");
        return handleResponse(res, 200, "Data deletion success", user);
    }catch(err) {
        return next(err);
    }
}

export const deleteUserAccount = async (req, res, next) => {
    try{
        const user = await deleteUserAccountService(req.params.id);
        if(!user) return handleResponse(res, 404, "User not found", user);
        return handleResponse(res, 200, "Data deletion success", user);
    }catch(err) {
        return next(err);
    }
}

export const countAllUserAccount = async (req, res, next) => {

}
export const countAllUserAccountByDate = async (req, res, next) => {

}

export const sortUsernameAsc = async (req, res, next) => {

}
export const sortUsernameDesc = async (req, res, next) => {
    
}

export const sortDateJoinedAsc = async (req, res, next) => {

}

export const sortDateJoinedDesc = async (req, res, next) => {
    
}