import pool from "../config/db.js";

// export const createUserDetailService = async(uaid, fn, mn, sn, gd, adrs) => {
//     let new_uid = generateUserId();
//     if((await new_uid).length > 0 ) {
//         new_uid = generateNewId(new_uid, "UID");
//     }else{
//         new_uid = generateInitialId("UID");
//     }
//     const result = await pool.query('INSERT INTO otcv_user_details ("UID", "UAID", firstname, middlename, surname, gender, address) values ($1, $2, $3, $4, $5, $6, $7)', 
//         [new_uid, uaid, fn, mn, sn, gd, adrs]);
//     return result.rows;
// }

export const getAllUsersDetailService = async() => {
    const result = await pool.query("SELECT * FROM otcv_user_details");
    return result.rows;
}

export const getUserDetailByIdService = async(id) => {
    const result = await pool.query("SELECT * FROM users WHERE uid = $1", [id]);
    return result.rows[0];
}

export const updateUserDetailService = async() => {

}

export const deleteUserDetailService = async() => {

}
