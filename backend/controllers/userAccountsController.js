import { countAllUserAccountByDateService, countAllUserAccountService, deleteUserAccountService, getAllUsersAccountService, getUserAccountByEmailService, getUserAccountByIdService, getUserAccountByUsernameService, sortDateJoinedAscService, sortDateJoinedDescService, sortUsernameAscService, sortUsernameDescService, updateUserAccountPasswordService, updateUserAccountService } from "../models/userAccountModel.js";
import handleResponse from "../middleware/responseHandler.js"
import { comparePassword } from "../utils/passwordUtils.js";
import { createToken } from "../utils/jwtAuthUtils.js";

export const loginUserAccount = async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const user = await getUserAccountByUsernameService(username);

        if(username.length === 0 || password.length === 0  ) return handleResponse(res, 400, "Please fill out all fields.");
        if(user.length === 0) return handleResponse(res, 400, "Incorrect username or password.");

        let userPw = user[0].password;
        let isRightPassword = await comparePassword(password, userPw);
        if(!isRightPassword) return handleResponse(res, 400, "Incorrect username or password.");

        const payload = {
            "uaid": user[0].uaid,
            "role": user[0].role,
        };

        const token = await createToken(payload);

        const response = {
            "access_token": token,
            "uaid": user[0].UAID,
            "email": user[0].email,
            "role": user[0].role,
            "date_joined": user[0].date_joined
        }

        return handleResponse(res, 200, "Successfully login.", response);

    }catch(err){
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
    const { old_username, username, email} = req.body;
    const old_user = await getUserAccountByUsernameService(old_username);
    const existing_user = await getUserAccountByUsernameService(username);
    const existing_email = await getUserAccountByEmailService(email);
    
    try{
        if(existing_user.length > 0) return handleResponse(res, 400, "Username already taken.");
        if(existing_email.length > 0) return handleResponse(res, 400, "E-Mail already taken.");
        await updateUserAccountService(old_user[0].UAID, username, email);
        return handleResponse(res, 200, "Information change success");
    }catch(err) {
        return next(err);
    }
}

export const updateUserAccountPassword = async (req, res, next) => {
    const { old_pw, pw, cpw, uaid } = req.body;
    const user_acc = getUserAccountByIdService(uaid);
    try{
        if(old_pw.length === 0 || pw.length === 0 || cpw.length === 0) return handleResponse(res, 400, 'Please fill out all fields');
        if(pw !== cpw) return handleResponse(res, 400, 'Two password does not match.');
        let isValidPw = comparePassword(old_pw, user_acc.password);
        if(!isValidPw) return handleResponse(res, 400, 'Old password does not match any of our records.');
        if(pw.length < 6) return handleResponse(res, 400, 'Password must be at least 6 characters long.');
        console.log(pw)
        console.log(uaid)
        const user = await updateUserAccountPasswordService(pw, uaid);
        return handleResponse(res, 200, "Password change success", user);
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
    try{
        const count = await countAllUserAccountService();
        return handleResponse(res, 200, "Data count successfully established.", count);
    }catch(err){
        return next(err)
    }
}

export const countAllUserAccountByDate = async (req, res, next) => {
    const date = req.params.date;
    const dateConverted = new Date(date);
    try{
        if(!date) handleResponse(res, 400, "Data count by date successfully established.", countByDate);
        const countByDate = await countAllUserAccountByDateService(dateConverted);
        return handleResponse(res, 200, "Data count by date successfully established.", countByDate);
    }catch(err){
        return next(err)
    }
}

export const sortUsernameAsc = async (req, res, next) => {
    try{
        const userAsc = await sortUsernameAscService();
        return handleResponse(res, 200, "User order by ascending successfully established.", userAsc);
    }catch(err){
        return next(err)
    }
}

export const sortUsernameDesc = async (req, res, next) => {
    try{
        const userDesc = await sortUsernameDescService();
        return handleResponse(res, 200, "User order by descending successfully established.", userDesc);
    }catch(err){
        return next(err)
    }
}

export const sortDateJoinedAsc = async (req, res, next) => {
    try{
        const dateAsc = await sortDateJoinedAscService();
        return handleResponse(res, 200, "User order by date joined ascending successfully established.", dateAsc);
    }catch(err){
        return next(err)
    }
}

export const sortDateJoinedDesc = async (req, res, next) => {
    try{
        const dateDesc = await sortDateJoinedDescService();
        return handleResponse(res, 200, "User order by date joined descending successfully established.", dateDesc);
    }catch(err){
        return next(err)
    }
}