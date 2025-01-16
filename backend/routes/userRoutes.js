import express from 'express';
import { createUserDetail, getAllUsersDetail, getUserDetailById, updateUserDetail, deleteUserDetail  } from '../controllers/userDetailsController.js';
import { createUserAccount, getAllUsersAccount, getUserAccountById, updateUserAccount, deleteUserAccount, countAllUserAccount, countAllUserAccountByDate } from '../controllers/userAccountsController.js';


const ROUTER = express.Router();

// USER DETAILS
ROUTER.get("/user", getAllUsersDetail);
ROUTER.post("/user", createUserDetail);
ROUTER.get("/user/:id", getUserDetailById);
ROUTER.put("/user/:id", updateUserDetail);
ROUTER.delete("/user/:id", deleteUserDetail);

// USER ACCOUNTS
ROUTER.get("/user/account/all", getAllUsersAccount);
ROUTER.post("/user/account", createUserAccount);
ROUTER.get("/user/account/:id", getUserAccountById);
ROUTER.put("/user/account/:id", updateUserAccount);
ROUTER.delete("/user/account/:id", deleteUserAccount);
ROUTER.get("/user/account/count", countAllUserAccount);
ROUTER.get("/user/account/countimeline", countAllUserAccountByDate);

export default ROUTER;