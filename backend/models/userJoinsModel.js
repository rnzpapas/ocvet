import pool from "../config/db.js";
import { generateInitialId, generateNewId } from "../utils/idUtils.js";
import { hashPassword } from "../utils/passwordUtils.js";

const getLatestuserAccId = async() => {
    const result = await pool.query('SELECT "UAID" from otcv_user_accounts ORDER BY "UAID" DESC LIMIT 1');
    return result.rows;
}

const generateUserDetailsId = async() => {
    const result = await pool.query('SELECT "UID" from otcv_user_details ORDER BY "UID" DESC LIMIT 1');
    return result.rows;
}

export const getUserCompleteDetailByIdService = async(id) => {
    const result = await pool.query(`SELECT 
    ud."UID", ud.firstname, ud.middlename, ud.surname, ud.gender, ud.address,
    ua."UAID", ua.username, ua.email,ua.verified, ua.role, ua.date_joined
    FROM otcv_user_details ud INNER JOIN otcv_user_accounts ua ON ud."UAID" = ua."UAID"  
    WHERE ud."UID" = $1 or ua."UAID" = $1`, [id]);
    return result.rows[0];
}

export const getUserCompleteDetailByNameEmailService = async(namemail) => {
    let searchVal = `%${namemail}%`
    const result = await pool.query(`
        SELECT ud."UID", ud.firstname, ud.middlename, ud.surname, ud.gender, ud.address,
        ua."UAID", ua.username, ua.email,ua.verified, ua.role, ua.date_joined
        FROM otcv_user_details ud 
        INNER JOIN otcv_user_accounts ua ON ud."UAID" = ua."UAID"  
        WHERE (ud."firstname" ILIKE $1 OR 
        ud."middlename" ILIKE $1 OR 
        ud."surname" ILIKE $1 OR 
        ua."email" ILIKE $1) AND
        ua.role = 'User'
        `, 
        [searchVal]);
    return result.rows;
}

export const createUserService = async(fn, mn, sn, gd, adrs, un, pw, em, rl, dj) => {
    let new_uaid = "";
    let latest_uaid = getLatestuserAccId();
    (await latest_uaid).length > 0 ? new_uaid = generateNewId(await(latest_uaid), "UAID") : new_uaid = generateInitialId("UAID");
    pw = hashPassword(pw);
    const resultAcc = await pool.query('INSERT INTO otcv_user_accounts ("UAID", username, password, email, role, date_joined) values ($1, $2, $3, $4, $5, $6) RETURNING "UAID"', 
        [new_uaid, un, pw, em, rl, dj]);

    let new_uid = generateUserDetailsId();
    (await new_uid).length > 0 ? new_uid = generateNewId(await(new_uid), "UID") : new_uid = generateInitialId("UID");

    const resultDetails = await pool.query(`
         INSERT INTO otcv_user_details ("UID", "UAID", firstname, middlename, surname, gender, address)
    SELECT $1, ua."UAID", $2, $3, $4, $5, $6
    FROM otcv_user_accounts ua
    WHERE ua."UAID" = $7
    RETURNING "UID"`,
    [new_uid, fn, mn, sn, gd, adrs, resultAcc.rows[0].UAID]);
    
    // const updateUIAD = await pool.query(`
    //     UPDATE otcv_user_details
    //     SET "UAID" = otcv_user_accounts."UAID"
    //     FROM otcv_user_accounts
    //     WHERE "UID" = $2 AND "UAID" = $1 otcv_user_details."UAID" = otcv_user_accounts."UAID";
    // `,[resultDetails.rows[0], resultAcc.rows[0]]);

    let userIds = {
        "UAID": resultAcc.rows[0],
        "UID": resultDetails.rows[0]
    }

    return userIds;
}

export const deleteUserService = async(id) => {
    let userUidQuery = await pool.query('SELECT "UID" FROM otcv_user_details WHERE "UAID" = $1', [id])
    let userUid = userUidQuery.rows[0]
    await pool.query('DELETE FROM otcv_user_details WHERE "UID" = $1', [userUid.UID]);
    await pool.query('DELETE FROM otcv_user_accounts WHERE "UAID" = $1', [id]);

}