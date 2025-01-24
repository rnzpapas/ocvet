import express from 'express';
import { getAllUsersDetail, getUserDetailById, updateUserDetail, deleteUserDetail  } from '../controllers/userDetailsController.js';
import { getAllUsersAccount, getUserAccountById, updateUserAccount, deleteUserAccount, countAllUserAccount, countAllUserAccountByDate, sortDateJoinedAsc, sortDateJoinedDesc, sortUsernameAsc, sortUsernameDesc, loginUserAccount } from '../controllers/userAccountsController.js';
import { createUser, getUserFullDetails } from '../controllers/userController.js';


const ROUTER = express.Router();

// common
ROUTER.post("/user/register", createUser);
ROUTER.get("/user/account/full-details/:id", getUserFullDetails);
ROUTER.post("/user/login", loginUserAccount);

// USER DETAILS
ROUTER.get("/user", getAllUsersDetail);
ROUTER.get("/user/:id", getUserDetailById);
ROUTER.put("/user/:id", updateUserDetail);
ROUTER.delete("/user/:id", deleteUserDetail);

// USER ACCOUNTS
ROUTER.get("/user/account/all", getAllUsersAccount);
ROUTER.get("/user/account/details/:id", getUserAccountById);
ROUTER.put("/user/account/details/:id", updateUserAccount);
ROUTER.delete("/user/account/details/:id", deleteUserAccount);
ROUTER.get("/user/account/count", countAllUserAccount);
ROUTER.get("/user/account/count/:date", countAllUserAccountByDate);
ROUTER.get("/user/account/sort-date/asc", sortDateJoinedAsc);
ROUTER.get("/user/account/sort-date/desc", sortDateJoinedDesc);
ROUTER.get("/user/account/sort-un/asc", sortUsernameAsc);
ROUTER.get("/user/account/sort-un/desc", sortUsernameDesc);

export default ROUTER;