import pool from "../config/db.js";
import {generateInitialId, generateNewId} from "../utils/idUtils.js";

const getLatestDiagnosisId = async () => {
    const latest_diag_id = await pool.query('SELECT "DIAGID" FROM otcv_diagnosis ORDER BY "DIAGID" DESC LIMIT 1');
    return latest_diag_id.rows;
}

export const createDiagnosisService = async (diagnosis) => {
    let new_diag_id;
    let latest_diag_id = getLatestDiagnosisId();
    (await latest_diag_id).length > 0 ? new_diag_id = generateNewId(await latest_diag_id, "DIAGID") : new_diag_id = generateInitialId("DIAGID");
    const res = await pool.query('INSERT INTO otcv_diagnosis ("DIAGID", diagnosis) VALUES ($1, $2)', [new_diag_id, diagnosis])
}

export const deleteDiagnosisService = async (id) => {
    const res = await pool.query('DELETE FROM otcv_diagnosis WHERE "DIAGID" = $1', [id]);
}

export const getDiagnosisService = async () => {
    const res = await pool.query('SELECT * FROM otcv_diagnosis ORDER BY diagnosis ASC');
    return res.rows;
}

export const getDiagnosisByDiagnosisService = async(diagnosis) => {
    const result = await pool.query('SELECT * FROM otcv_diagnosis WHERE diagnosis = $1', [diagnosis]);
    return result.rows;
}