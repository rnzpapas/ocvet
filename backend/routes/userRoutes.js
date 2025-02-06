import express from 'express';
import { getAllUsersDetail, getUserDetailById, updateUserDetail, deleteUserDetail  } from '../controllers/userDetailsController.js';
import { getAllUsersAccount, getUserAccountById, updateUserAccount, deleteUserAccount, countAllUserAccount, countAllUserAccountByDate, sortDateJoinedAsc, sortDateJoinedDesc, sortUsernameAsc, 
sortUsernameDesc, loginUserAccount, updateUserAccountPassword, updateUserOtp, verifyUserOtp, recoversUserAccountPassword, 
getAllPetOwnersAccount} from '../controllers/userAccountsController.js';
import { createUser, getUserFullDetails } from '../controllers/userController.js';
import { authenticateUserJwt, authenticateAdminJwt, authenticateSuperAdminJwt } from '../middleware/authHandler.js';


const ROUTER = express.Router();

// common
ROUTER.post("/user/register", createUser);
ROUTER.get("/user/account/full-details/:id", authenticateUserJwt,  getUserFullDetails);
ROUTER.get("/user/account/admin-full-details/:id", authenticateAdminJwt,  getUserFullDetails);
ROUTER.post("/user/login", loginUserAccount);
ROUTER.put("/user/account-recovery/otp-update", updateUserOtp);
ROUTER.post("/user/account-recovery/otp-verify", verifyUserOtp);
ROUTER.post("/user/account-recovery/otp-changpw", recoversUserAccountPassword);


// USER DETAILS
ROUTER.get("/user", authenticateAdminJwt, getAllUsersDetail);
ROUTER.get("/user/:id", getUserDetailById);
ROUTER.put("/user/:id", authenticateUserJwt, updateUserDetail);
ROUTER.delete("/user/:id", authenticateAdminJwt, deleteUserDetail);

// USER ACCOUNTS
ROUTER.get("/user/account/all", authenticateAdminJwt, getAllUsersAccount);
ROUTER.get("/user/account/petowners", authenticateAdminJwt, getAllPetOwnersAccount);
ROUTER.get("/user/account/details/:id", getUserAccountById);
ROUTER.put("/user/account/details/update", authenticateUserJwt, updateUserAccount);
ROUTER.put("/user/account/pw", authenticateUserJwt, updateUserAccountPassword)
ROUTER.delete("/user/account/details/delete/:id", authenticateAdminJwt, deleteUserAccount);
ROUTER.get("/user/account/count", authenticateSuperAdminJwt, countAllUserAccount);
ROUTER.get("/user/account/count/:date", authenticateSuperAdminJwt, countAllUserAccountByDate);
ROUTER.get("/user/account/sort-date/asc", sortDateJoinedAsc);
ROUTER.get("/user/account/sort-date/desc", sortDateJoinedDesc);
ROUTER.get("/user/account/sort-un/asc", sortUsernameAsc);
ROUTER.get("/user/account/sort-un/desc", sortUsernameDesc);

export default ROUTER;