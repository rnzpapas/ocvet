import pool from "../config/db.js";
import { hashPassword } from "../utils/passwordUtils.js"


// export const createUserAccountService = async(un, pw, em, rl, dj) => {
//     let new_uid = "";
//     let latest_uid = getLatestuserId();
//     if((await latest_uid).length > 0 ) {
//         new_uid = generateNewId(await(latest_uid), "UAID");
//     }else{
//         new_uid = generateInitialId("UAID");
//     }
//     pw = hashPassword(pw);
//     const result = await pool.query('INSERT INTO otcv_user_accounts ("UAID", username, password, email, role, date_joined) values ($1, $2, $3, $4, $5, $6) RETURNING "UAID"', 
//         [new_uid, un, pw, em, rl, dj]);
//     return result.rows[0];
// }

export const getAllUsersAccountService = async() => {
    const result = await pool.query("SELECT * FROM otcv_user_accounts");
    return result.rows;
}

export const getUserAccountByUsernameService = async(un) => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts WHERE username = $1', [un]);
    return result.rows;
}

export const getUserAccountByEmailService = async(em) => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts WHERE email = $1', [em]);
    return result.rows[0];
}

export const getUserAccountByIdService = async(id) => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts WHERE "UAID" = $1', [id]);
    return result.rows[0];
}

export const updateUserAccountService = async(uaid, un, pw, em) => {
    pw = hashPassword(pw);
    const result = await pool.query('UPDATE otcv_user_accounts SET password = $1, email = $2 WHERE "UAID" = $4', 
        [uaid, un, pw, em]);
    return result.rows[0];
}

export const deleteUserAccountService = async(uaid) => {
    const result = await pool.query('DELETE FROM otcv_user_accounts WHERE "UAID" = $1', [uaid]);
    return result.rows[0];
}

export const countAllUserAccountService = async () => {
    const result = await pool.query("SELECT COUNT(*) FROM otcv_user_accounts");
    return result.rows;
}

export const countAllUserAccountByDateService = async (date) => {
    const result = await pool.query("SELECT COUNT(*) FROM otcv_user_accounts WHERE date_joined = $1", [date]);
    return result.rows;
}

export const sortUsernameAscService = async () => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts ORDER BY "UAID" ASC');
    return result.rows;
}

export const sortUsernameDescService = async () => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts ORDER BY "UAID" DESC');
    return result.rows;
}

export const sortDateJoinedAscService = async () => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts ORDER BY date_joined ASC');
    return result.rows;
}

export const sortDateJoinedDescService = async () => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts ORDER BY date_joined DESC');
    return result.rows;
}