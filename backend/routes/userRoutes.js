import express from 'express';
import { getAllUsersDetail, getUserDetailById, updateUserDetail  } from '../controllers/userDetailsController.js';
import { getAllUsersAccount, getUserAccountById, updateUserAccount, deleteUserAccount, countAllUserAccount, countAllUserAccountByDate, sortDateJoinedAsc, sortDateJoinedDesc, sortUsernameAsc, 
sortUsernameDesc, loginUserAccount, updateUserAccountPassword, updateUserOtp, verifyUserOtp, recoversUserAccountPassword, 
getAllPetOwnersAccount,
getAllAdministrators,
generateAllPetOwnersPdf,
getAdminEmail,
getAllAdminEmail,
getAllAdministratorsFiltered,
getAllAdminCount} from '../controllers/userAccountsController.js';
import { createUser, getUserFullDetails, getUserCompleteDetailByNameEmail, createAdmin, deleteUserDetail } from '../controllers/userController.js';
import { authenticateUserJwt, authenticateAdminJwt, authenticateSuperAdminJwt } from '../middleware/authHandler.js';


const ROUTER = express.Router();


// admin
ROUTER.get('/admin/all', authenticateAdminJwt, getAllAdministrators);
ROUTER.get('/admin/all/find', authenticateAdminJwt, getAllAdministratorsFiltered);
ROUTER.get('/admin/email', authenticateAdminJwt, getAdminEmail);
ROUTER.get('/admin/email/all', authenticateAdminJwt, getAllAdminEmail);
ROUTER.post("/admin/register", authenticateAdminJwt, createAdmin);
ROUTER.delete("/admin/:id", authenticateAdminJwt, deleteUserDetail);
ROUTER.get("/admin/count", authenticateAdminJwt, getAllAdminCount);



// common
ROUTER.post("/user/register", createUser);
ROUTER.get("/user/account/full-details/:id", authenticateUserJwt,  getUserFullDetails);
ROUTER.get("/user/account/full-details-search", authenticateAdminJwt,  getUserCompleteDetailByNameEmail);
ROUTER.get("/user/account/admin-full-details/:id", authenticateAdminJwt,  getUserFullDetails);
ROUTER.post("/user/login", loginUserAccount);
ROUTER.put("/user/account-recovery/otp-update", updateUserOtp);
ROUTER.post("/user/account-recovery/otp-verify", verifyUserOtp);
ROUTER.post("/user/account-recovery/otp-changpw", recoversUserAccountPassword);


// USER DETAILS
ROUTER.get("/user", authenticateAdminJwt, getAllUsersDetail);
ROUTER.get("/user/:id", getUserDetailById);
ROUTER.put("/user/:id", authenticateUserJwt, updateUserDetail);

// USER ACCOUNTS
ROUTER.get("/user/account/all", authenticateAdminJwt, getAllUsersAccount);
ROUTER.get("/user/account/petowners", authenticateAdminJwt, getAllPetOwnersAccount);
ROUTER.get("/user/account/petowners/export", authenticateAdminJwt, generateAllPetOwnersPdf);
ROUTER.get("/user/account/details/:id", getUserAccountById);
ROUTER.put("/user/account/details/update", updateUserAccount);
ROUTER.put("/user/account/pw", authenticateUserJwt, updateUserAccountPassword)
ROUTER.delete("/user/account/details/delete/:id", authenticateAdminJwt, deleteUserAccount);
ROUTER.get("/user/account/count", authenticateSuperAdminJwt, countAllUserAccount);
ROUTER.get("/user/account/count/:date", authenticateSuperAdminJwt, countAllUserAccountByDate);
ROUTER.get("/user/account/sort-date/asc", sortDateJoinedAsc);
ROUTER.get("/user/account/sort-date/desc", sortDateJoinedDesc);
ROUTER.get("/user/account/sort-un/asc", sortUsernameAsc);
ROUTER.get("/user/account/sort-un/desc", sortUsernameDesc);

export default ROUTER;