import pool from "../config/db.js";
import { generateInitialId, generateNewId } from "../utils/idUtils.js";

const getLatestPetBreedID = async () => {
    const latestPBID = await pool.query('SELECT "PBID" from otcv_pet_breeds ORDER BY "PBID" DESC LIMIT 1')
    return latestPBID.rows;
}

export const createPetBreedService = async (ATYPEID, breed_name) => {
    let new_pbid = "";
    let latest_pbid = getLatestPetBreedID();
    (await latest_pbid).length > 0 ? new_pbid = generateNewId(await(latest_pbid), "PBID") : new_pbid = generateInitialId("PBID");
    const result = await pool.query('INSERT INTO otcv_pet_breeds ("PBID", "ATYPEID", breed_name) VALUES ($1, $2, $3)', [new_pbid, ATYPEID, breed_name]);
    return result.rows[0];
}

export const getPetBreedService = async () => {
    const result = await pool.query(`SELECT * FROM otcv_pet_breeds ORDER breed_name ASC`, []);
    return result.rows;
}


export const deletePetBreedService = async (id) => {
    const result = await pool.query(`DELETE FROM otcv_pet_breeds WHERE "PBID" = $1`, [id]);
    return result.rows[0];
}
