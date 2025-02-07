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

export const getAllPetOwnersService = async() => {
    const result = await pool.query(`
        SELECT * 
        FROM otcv_user_accounts ua 
        INNER JOIN otcv_user_details ud
        ON ua."UAID" = ud."UAID"
        WHERE ua.role = 'User';`
    );
    return result.rows;
}

export const getAllAdministratorsService = async () => {
    let r = await pool.query(`
        SELECT * FROM otcv_user_accounts ua
        INNER JOIN otcv_user_details ud
        ON ua."UAID" = ud."UAID"
        WHERE role = 'Staff' OR role = 'Manager' OR role = 'Super Administrator'
    `)
    return r.rows;
}

export const getUserAccountByUsernameService = async(un) => {
    const u = await pool.query('SELECT * FROM otcv_user_accounts WHERE username = $1', [un]);
    return u.rows;
}

export const getUserAccountByEmailService = async(em) => {
    const u = await pool.query('SELECT * FROM otcv_user_accounts WHERE email = $1', [em]);
    return u.rows;
}

export const getUserAccountByIdService = async(id) => {
    const result = await pool.query('SELECT * FROM otcv_user_accounts WHERE "UAID" = $1', [id]);
    return result.rows[0];
}

export const updateUserAccountService = async(uaid, un, em) => {
    const result = await pool.query('UPDATE otcv_user_accounts SET username = $1, email = $2 WHERE "UAID" = $3', 
        [un, em, uaid]);
}

export const updateUserAccountPasswordService = async(pw, uaid) => {
    let hashed_pw = hashPassword(pw);
    const result = await pool.query('UPDATE otcv_user_accounts SET "password" = $1 WHERE "UAID" = $2', 
        [hashed_pw, uaid]);
}

export const recoverserAccountPasswordService = async(pw, uaid) => {
    let hashed_pw = hashPassword(pw);
    const result = await pool.query('UPDATE otcv_user_accounts SET "password" = $1 WHERE "UAID" = $2', 
        [hashed_pw, uaid]);
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

export const updateUserOtpService = async (uaid, otp) => {
    let result = await pool.query(`UPDATE otcv_user_accounts SET otp = $1 WHERE "UAID" = $2 RETURNING otp`,
        [otp, uaid]
    )
    return result.rows[0]
}

export const verifyUserOtpService = async (uaid, otp) => {
    let result = await pool.query(`SELECT "UAID", otp FROM otcv_user_accounts  WHERE otp = $1 AND "UAID" = $2`,
        [otp, uaid]
    )
    return result.rows
}