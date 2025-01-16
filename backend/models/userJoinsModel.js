import pool from "../config/db.js";

export const getUserCompleteDetailByIdService = async(id) => {
    const result = await pool.query('SELECT * EXCEPT(password) FROM octv_user_details ud INNER JOIN octv_user_accounts ua ON ud."UAID" = ua."UAID" WHERE "UID" = $1', [id]);
    return result.rows[0];
}