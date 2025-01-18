import pool from "../config/db.js"
import {generateInitialId, generateNewId} from "../utils/idUtils.js";

const getLatestServiceId = async () => {
    const latestServiceId = await pool.query('SELECT "SERVICEID" FROM otcv_service ORDER BY "SERVICEID" DESC LIMIT 1');
    return latestServiceId.rows;
}

export const createServiceClinicService = async (service) => {
    let new_service_id = "";
    const latestServiceId = getLatestServiceId();
    (await latestServiceId).length > 0 ? new_service_id = generateNewId(await (latestServiceId), "SERVID", "SERVICEID") : new_service_id = generateInitialId("SERVID");
    const res = await pool.query('INSERT INTO otcv_service ("SERVICEID", service) VALUES ($1, $2)', [new_service_id, service]);
}

export const deleteServiceClinicService = async (id) => {
    const res = await pool.query('DELETE FROM otcv_service WHERE "SERVICEID" = $1', [id]);
}

export const getServiceClinicService = async () => {
    const res = await pool.query('SELECT * FROM otcv_service ORDER BY service ASC');
    return res.rows;
}

export const getServiceByServiceDescService = async(service) => {
    const result = await pool.query('SELECT * FROM otcv_service WHERE service = $1', [service]);
    return result.rows;
}