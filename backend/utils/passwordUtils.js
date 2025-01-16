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

export const comparePassword = (password, cpassword) => {
    bcrypt.compare(enteredPassword, storedHashedPassword, (err, result) => {
        if (err) {
            console.error('Error comparing passwords:', err);
        } else if (result) {
            return true;
        } else {
            return false;
        }
    });
}