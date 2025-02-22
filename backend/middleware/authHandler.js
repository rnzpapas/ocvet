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

export const authenticateAdminJwt = async (req, res,  next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return handleResponse(res, 400, 'Token required.');
  }

  const tokenVerified = verifyToken(token);

  if(tokenVerified){
      req.user = await tokenVerified;
      if(req.user){
      let adminRoles = ['Staff', 'Manager', 'Super Administrator'];
      let role = req.user.role.trim();
      let isValidRole = adminRoles.some((r) => r === role);
      if(!isValidRole) return handleResponse(res, 403, 'Invalid access.');
    } 
      return next();
  }

  return handleResponse(res, 400, "Invalid token.");
}

export const authenticateUserJwt = async (req, res,  next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
  
    if (!token) {
      return handleResponse(res, 400, 'Token required.');
    }
    const tokenVerified = verifyToken(token);

    if(tokenVerified){
        req.user = await tokenVerified
        if(req.user.role !== 'User') return handleResponse(res, 403, 'Invalid access.');
        return next();
    }

    return handleResponse(res, 400, "Invalid token.");
}