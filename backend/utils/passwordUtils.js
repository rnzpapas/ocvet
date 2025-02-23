import bcryptjs from "bcryptjs";
const salt = 10;

export const hashPassword = (password) => {
    try{
        const hashedPassword = bcryptjs.hashSync(password, salt);
        return hashedPassword;
    }catch (err) {
        throw err;
    }
}

export const comparePassword = async (password, dbpassword) => {
    try{
        const result = await bcryptjs.compare(password, dbpassword);
        return result;
    }catch(err){
        return false;
    }
   
}