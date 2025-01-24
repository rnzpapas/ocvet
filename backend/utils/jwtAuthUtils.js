import jwt from "jsonwebtoken";
import jwt_skey from '../config/jwt.js';

export const createToken = async (payload) => {
    const tokenSigned = jwt.sign(payload, jwt_skey, {expiresIn: '3h'})
    return tokenSigned;
}

export const verifyToken = async (token) => {
    const decodedToken = jwt.verify(token, jwt_skey, (err, decoded) => {
        if(err) return false;
        return decoded
    });

}