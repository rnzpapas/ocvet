import pool from "../config/db.js";
import {generateInitialId, generateNewId} from "../utils/idUtils.js";

const getLatestAnimalGroupId = async () => {
    const latest_pgid = await pool.query('SELECT "PGID" FROM otcv_pet_group ORDER BY "PGID" DESC LIMIT 1');
    return latest_pgid.rows;
}

export const createAnimalGroupService = async (PETS, ATYPEID, POPULATION, GROUP_NICKNAME, CREATED_TIMESTAMP, PET_OWNER) => {
    let new_pgid;
    let latest_pgid = getLatestAnimalGroupId();
    (await latest_pgid).length > 0 ? new_pgid = generateNewId(await latest_pgid, "PGID") : new_pgid = generateInitialId("PGID");
    const res = await pool.query('INSERT INTO otcv_pet_group ("PGID", "PETS", "ATYPEID", "POPULATION", "GROUP_NICKNAME", "CREATED_TIMESTAMP", "PET_OWNER") VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [new_pgid, PETS, ATYPEID, POPULATION, GROUP_NICKNAME, CREATED_TIMESTAMP, PET_OWNER]);
}

export const updateAnimalGroupService = async (PGID, GROUP_NICKNAME) => {
    const r = await pool.query('UPDATE otcv_pet_group SET "GROUP_NICKNAME" = $1 WHERE "PGID" = $2',
        [GROUP_NICKNAME, PGID]
    )
}

export const deleteAnimalGroupService = async (id) => {
    const res = await pool.query('DELETE FROM otcv_pet_group WHERE "PGID" = $1', [id]);
}

export const getAnimalGroupService = async () => {
    const res = await pool.query('SELECT * FROM otcv_pet_group ORDER BY "GROUP_NICKNAME" ASC');
    return res.rows;
}

export const getAnimalGroupByOwnerService = async(uid) => {
    const result = await pool.query('SELECT * FROM otcv_pet_group WHERE "PET_OWNER" = $1', [uid]);
    return result.rows;
}

export const getAnimalGroupDetailsByPetOwnerService = async(uid) => {
    const result = await pool.query(`
        SELECT pg."GROUP_NICKNAME", pg."PET_OWNER", pt."PETID", pt.nickname, pt.image
        FROM otcv_pet_group pg INNER JOIN otcv_pets pt
        ON pt."PETID" = ANY(pg."PETS")
        WHERE pg."PET_OWNER" = $1`, [uid]);
    return result.rows;
}

export const getAnimalGroupByIdService = async(pgid) => {
    const result = await pool.query('SELECT * FROM otcv_pet_group WHERE "PGID" = $1', [pgid]);
    return result.rows;
}

export const getAnimalGroupByPopulationService = async (POPULATION) => {
    const r = await pool.query('SELECT * FROM otcv_pet_group WHERE "POPULATION" = $1',
        [POPULATION]
    )
    return r.rows;
}

export const registerPetToPetGroupService = async (petid, pgid) => {
    await pool.query(`
        UPDATE otcv_pet_group
        SET "PETS" = array_append("PETS", $1)
        WHERE "PGID" = $2
    `,[petid, pgid])
}

export const removePetToPetGroupService = async (petid, pgid) => {
    await pool.query(`
        UPDATE otcv_pet_group
        SET "PETS" = array_remove("PETS", $1)
        WHERE "PGID" = $2
    `,[petid, pgid])
}