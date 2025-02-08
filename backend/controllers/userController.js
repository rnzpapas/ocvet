import handleResponse from "../middleware/responseHandler.js";
import { getUserAccountByEmailService, getUserAccountByUsernameService } from "../models/userAccountModel.js";
import { createUserService, getUserCompleteDetailByIdService } from "../models/userJoinsModel.js";

export const getUserFullDetails = async (req, res, next) => {
    try{
        const userFull = await getUserCompleteDetailByIdService(req.params.id);
        return handleResponse(res, 200, "User full details successfully fetched.", userFull);
    }catch(err){
        return next(err)
    }
}

export const createUser = async (req, res, next) => {
    const {  firstname, middlename, surname, gender, address, username, password, email, role, date_joined } = req.body;
    const formattedDateJoined = new Date(date_joined);
    const splitDateJoined = formattedDateJoined.toISOString().split('T')[0];
    const existing_username = await getUserAccountByUsernameService(username);
    const existing_email = await getUserAccountByEmailService(email);
    try{
        if(username.length === 0 || password.length === 0 || email.length === 0 ||
                role.length === 0 || date_joined.length === 0 || firstname.length === 0 || 
                middlename.length === 0 || surname.length === 0 || gender.length === 0 || 
                address.length === 0) {
            return handleResponse(res, 400, "Please fill out all fields.");
        }else if(password.length < 6){
            return handleResponse(res, 400, "Password must be minimum of 6 characters.");
        }else if(existing_username.length > 0){
            return handleResponse(res, 400, "Username already taken.");
        }else if(existing_email.length > 0){
            return handleResponse(res, 400, "Email already taken.");
        }else{
            const userIDs = await createUserService(firstname, middlename, surname, gender, address, username, password, email, role, splitDateJoined);
            return handleResponse(res, 201, "User created successfully.", userIDs);
        }
    }catch(err) {
        return next(err);
    }
}

