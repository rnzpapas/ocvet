import dotenv from 'dotenv'
dotenv.config(); 

const jwt_skey = process.env.JWT_SECRET_KEY;

export default jwt_skey;