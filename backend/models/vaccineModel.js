import pool from "../config/db.js";
import {generateInitialId, generateNewId} from "../utils/idUtils.js";

const getLatestVaccineId = async () => {
    const latest_vacc_id = await pool.query('SELECT "VACCID" FROM otcv_vaccines ORDER BY "VACCID" DESC LIMIT 1');
    return latest_vacc_id.rows;
}

export const createVaccineService = async (vaccine) => {
    let new_vacc_id;
    let latest_vacc_id = getLatestVaccineId();
    (await latest_vacc_id).length > 0 ? new_vacc_id = generateNewId(await latest_vacc_id, "VACCID") : new_vacc_id = generateInitialId("VACCID");
    const res = await pool.query('INSERT INTO otcv_vaccines ("VACCID", vaccine_name) VALUES ($1, $2)', [new_vacc_id, vaccine])
}

export const deleteVaccineService = async (id) => {
    const res = await pool.query('DELETE FROM otcv_vaccines WHERE "VACCID" = $1', [id]);
}

export const getVaccineService = async () => {
    const res = await pool.query('SELECT * FROM otcv_vaccines ORDER BY vaccine_name ASC');
    return res.rows;
}

export const getVaccineByVaccineService = async(vaccine) => {
    const result = await pool.query('SELECT * FROM otcv_vaccines WHERE vaccine_name = $1', [vaccine]);
    return result.rows;
}

export const updateVaccineStockService = async (new_count, vaccid) => {
    const result = await pool.query(`
        UPDATE otcv_vaccines 
        SET stock = $1
        WHERE "VACCID" = $2
    `,[new_count, vaccid]);
    return result.rows;
}