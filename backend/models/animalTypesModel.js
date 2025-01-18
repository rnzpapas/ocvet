import pool from "../config/db.js";
import { generateInitialId, generateNewId } from "../utils/idUtils.js";

const getLatestAnimalTypeID = async () => {
    const latestATYPEID = await pool.query('SELECT "ATYPEID" from otcv_animal_types ORDER BY "ATYPEID" DESC LIMIT 1')
    return latestATYPEID.rows;
}

export const createAnimalTypeService = async (animal_type) => {
    let new_atypeid = "";
    let latest_atypeid = getLatestAnimalTypeID();
    (await latest_atypeid).length > 0 ? new_atypeid = generateNewId(await(latest_atypeid), "ATID", "ATYPEID") : new_atypeid = generateInitialId("ATID");
    const result = await pool.query('INSERT INTO otcv_animal_types ("ATYPEID", animal_type) VALUES ($1, $2)',[new_atypeid, animal_type])
    return result.rows[0];
}

export const deleteAnimalTypeService = async (id) => {
    const result = await pool.query(`DELETE FROM otcv_animal_types WHERE "ATYPEID" = $1`, [id]);
    return result.rows[0];
}

export const sortAnimalTypeAscService = async () => {
    const result = await pool.query('SELECT * FROM otcv_animal_types ORDER BY animal_type ASC');
    return result.rows;
}

export const getAnimalTypeByTypeService = async(type) => {
    const result = await pool.query('SELECT * FROM otcv_animal_types WHERE animal_type = $1', [type]);
    return result.rows;
}