import { countAllUserAccountByDateService, countAllUserAccountService, deleteUserAccountService, generateAllPetOwnersPdfService, getAllAdministratorsService, getAllPetOwnersService, getAllUsersAccountService, getUserAccountByEmailService, getUserAccountByIdService, getUserAccountByUsernameService, sortDateJoinedAscService, sortDateJoinedDescService, sortUsernameAscService, sortUsernameDescService, updateUserAccountPasswordService, updateUserAccountService, updateUserOtpService, verifyUserOtpService } from "../models/userAccountModel.js";
import handleResponse from "../middleware/responseHandler.js"
import { comparePassword } from "../utils/passwordUtils.js";
import { createToken } from "../utils/jwtAuthUtils.js";
import generateOtp from "../utils/otpUtils.js";
import { sendEmail } from '../config/email.js';
import { generatePdf } from "../utils/reportUtils.js"

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

export const getAllAdministrators = async (req, res, next) => {
    try{
        const users = await getAllAdministratorsService();
        if(!users) return handleResponse(res, 404, "Data retrieval failed");
        return handleResponse(res, 200, "Data retrieval success", users);
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

export const getAllPetOwnersAccount = async (req, res, next) => {
    try{
        const users = await getAllPetOwnersService();
        if(!users) return handleResponse(res, 404, "Data retrieval failed");
        return handleResponse(res, 200, "Data retrieval success", users);
    }catch(err) {
        return next(err);
    }
}

export const generateAllPetOwnersPdf = async (req, res, next) => {
    const dateObj = new Date();
    const dateTimeStamp = `${dateObj.getFullYear()}${dateObj.getMonth()+1}${dateObj.getDate()}_${dateObj.getHours()}${dateObj.getMinutes()}`

    try{
        const users = await generateAllPetOwnersPdfService();
        if(!users) return handleResponse(res, 404, "Data retrieval failed");
        const headers = ['ID', 'Full Name', 'E-Mail', 'Username', 'Joined_Date']
        generatePdf(res, 'Pet Owners', headers, users, `PetOwnersList_${dateTimeStamp}`)
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

export const updateUserOtp = async (req, res, next) => {
    const unmail = req.query.unmail;
    let otp = generateOtp();
    let user;

    try{
        user = await getUserAccountByEmailService(unmail);
        user = !user && user.length == 0 ? (await getUserAccountByUsernameService(unmail)) : user;
        if(unmail.length === 0) return handleResponse(res, 400, "Please provide your e-mail or username to proceed.")
        
        if(user && user.length > 0){
            let result = await updateUserOtpService(user[0].UAID, otp);
            sendEmail(result.otp, unmail, 'Verification Code for Your Account Recovery');

            setTimeout(async () => {
                otp = null;
                try{
                    await updateUserOtpService(user[0].UAID, otp);
                    return handleResponse(res, 200, "OTP successfully cleared")
                }catch(err){
                    return next(err)
                }
            },300000)
        }else{
            return handleResponse(res, 400, "The username or e-mail you submitted is not on our records.")
        }
    }catch(err){
        return next(err)
    }
}

export const verifyUserOtp = async (req, res, next) => {
    const unmail = req.query.unmail;
    const { otp } = req.body
    let user;
    try{    
        if(otp.length === 0 ) return handleResponse(res, 400, 'Please provide the one-time pin (OTP) sent to you email.')
        user = await getUserAccountByEmailService(unmail);
        user = !user && user.length == 0 ? (await getUserAccountByUsernameService(unmail)) : user;
        if(unmail.length === 0) return handleResponse(res, 400, "Please provide your e-mail or username to proceed.")
        
        if(user && user.length > 0){
            let result = await verifyUserOtpService(user[0].UAID, otp);
            return result.length > 0 ?
            handleResponse(res, 200, "Verified OTP", result) :
            handleResponse(res, 400, "OTP you submitted is invalid. It might incorrect or expired OTP sent.")
        }else{
            return handleResponse(res, 400, "The username or e-mail you submitted is not on our records.")
        }
    } catch(err){
        return next(err)
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
        const user = await updateUserAccountPasswordService(pw, uaid);
        return handleResponse(res, 200, "Password change success", user);
    }catch(err) {
        return next(err);
    }
}

export const recoversUserAccountPassword = async(req, res, next) => {
    const { pw, cpw, uaid } = req.body;
    try{
        if( pw.length === 0 || cpw.length === 0) return handleResponse(res, 400, 'Please fill out all fields');
        if(pw !== cpw) return handleResponse(res, 400, 'Two password does not match.');
        if(pw.length < 6) return handleResponse(res, 400, 'Password must be at least 6 characters long.');
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