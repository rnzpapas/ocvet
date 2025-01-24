import bcrypt from "bcrypt";
const salt = 10;

export const hashPassword = (password) => {
    try{
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }catch (err) {
        throw err;
    }
}

export const comparePassword = async (password, dbpassword) => {
    try{
        const result = await bcrypt.compare(password, dbpassword);
        return result;
    }catch(err){
        return false;
    }
   
}