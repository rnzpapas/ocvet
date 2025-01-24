import jwt_skey from '../config/jwt.js';
import {verifyToken} from '../utils/jwtAuthUtils.js';
import handleResponse from './responseHandler.js';

export const authenticateSuperAdminJwt = async (req, res,  next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
    if (!token) {
      return handleResponse(res, 400, 'Token required.');
    }

    const tokenVerified = verifyToken(token);

    if(tokenVerified){
        req.user = tokenVerified

        if(tokenVerified.role !== 'Super Administrator') return handleResponse(res, 403, 'Invalid access.');

        return next();
    }

    return handleResponse(res, 400, "Invalid token.");
}

export const authenticateMngrJwt = async (req, res,  next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
    if (!token) {
      return handleResponse(res, 400, 'Token required.');
    }

    const tokenVerified = verifyToken(token);

    if(tokenVerified){
        req.user = tokenVerified

        if(tokenVerified.role !== 'Manager') return handleResponse(res, 403, 'Invalid access.');

        return next();
    }

    return handleResponse(res, 400, "Invalid token.");
}

export const authenticateStaffJwt = async (req, res,  next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
    if (!token) {
      return handleResponse(res, 400, 'Token required.');
    }

    const tokenVerified = verifyToken(token);

    if(tokenVerified){
        req.user = tokenVerified

        if(tokenVerified.role !== 'Staff') return handleResponse(res, 403, 'Invalid access.');

        return next();
    }

    return handleResponse(res, 400, "Invalid token.");
}

export const authenticateUserJwt = async (req, res,  next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
    if (!token) {
      return handleResponse(res, 400, 'Token required.');
    }

    const tokenVerified = verifyToken(token);

    if(tokenVerified){
        req.user = tokenVerified

        if(tokenVerified.role !== 'User') return handleResponse(res, 403, 'Invalid access.');

        return next();
    }

    return handleResponse(res, 400, "Invalid token.");
}