import pool from '../config/db.js';
import { generateInitialId, generateNewId } from '../utils/idUtils.js';

const generateLatestVaccId = async () => {
    const r = await pool.query('SELECT "PVACCID" from otcv_vaccinations ORDER BY "PVACCID" DESC LIMIT 1');
    return r.rows;
}

export const createVaccinationsService = async (vaccid, petid, pgid, asid, date, time) => {
    let new_vacc_id = "";
    const latest_vacc_id = await generateLatestVaccId();

    (latest_vacc_id).length > 0 ? new_vacc_id = generateNewId(latest_vacc_id, "PVACCID") : new_vacc_id = generateInitialId("PVACCID");
    await pool.query('INSERT INTO otcv_vaccinations ("PVACCID", "VACCID", "PETID", "PGID", "DATE", "TIME", "ASID") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [new_vacc_id, vaccid, petid, pgid, date, time, asid]
    )
}

export const deleteVaccinationService = async (pvaccid) => {
    await pool.query('DELETE FROM otcv_vaccinations WHERE "PVACCID" = $1', [pvaccid]);
}

export const getAllVaccinationsService = async () => {
    const q = await pool.query('SELECT * FROM otcv_vaccinations');
    return q.rows;
}

export const getAllVaccinationsByPetService = async (petid) => {
    const q = await pool.query('SELECT * FROM otcv_vaccinations vcs INNER JOIN otcv_vaccines vc ON vcs."VACCID" = vc."VACCID" WHERE "PETID" = $1', [petid]);
    return q.rows;
}

export const getAllVaccinationsByPetGroupService = async (pgid) => {
    const q = await pool.query('SELECT * FROM otcv_vaccinations WHERE "PGID" = $1', [pgid]);
    return q.rows;
}

export const getRecentVaccinationsByOwnerService = async (uid) => {
    const q = await pool.query(`
        SELECT p.image, p.nickname, ud.firstname || ud.middlename || ud.surname as fullname 
        FROM otcv_vaccinations vcs 
        INNER JOIN otcv_pets p ON vcs."PETID" = p."PETID"
        INNER JOIN otcv_user_details ud ON p.pet_owner = ud."UID" 
        WHERE p.pet_owner = $1
		GROUP BY p.image, p.nickname, ud.firstname, ud.middlename, ud.surname,vcs."DATE"
        ORDER BY vcs."DATE" DESC LIMIT 5`, [uid]);
    return q.rows;
}

export const getVaccinesBaseOnDemandService = async () => {
    const q = await pool.query(`
    SELECT 
        vc."VACCID", 
        vc.vaccine_name,
        COUNT(vt."VACCID") AS demand_count
    FROM 
        otcv_vaccines vc
    LEFT JOIN 
        otcv_vaccinations vt
        ON vc."VACCID" = vt."VACCID"
    GROUP BY 
        vc."VACCID", vc.vaccine_name
    ORDER BY 
        demand_count DESC;
    `);
    return q.rows;
}