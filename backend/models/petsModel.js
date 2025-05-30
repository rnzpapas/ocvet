import pool from '../config/db.js';
import {generateInitialId, generateNewId} from "../utils/idUtils.js";

const generateLatestPetId = async () => {
    const latest_pet_id = await pool.query('SELECT "PETID" FROM otcv_pets ORDER BY "PETID" DESC LIMIT 1');
    return latest_pet_id.rows;
}

export const createPetService = async (atypeid, pet_owner, nickname, image, registration_timestamp, breed) => {
    let new_pet_id = "";
    const latest_pet_id = await generateLatestPetId();

    (latest_pet_id).length > 0 ? new_pet_id = generateNewId(latest_pet_id, "PETID") : new_pet_id = generateInitialId("PETID");

    const query = await pool.query('INSERT INTO otcv_pets ("PETID", "ATYPEID", pet_owner, nickname, registration_timestamp, image, "PBID") VALUES ($1, $2, $3, $4, to_timestamp($5), $6, $7)',
        [new_pet_id, atypeid, pet_owner, nickname, registration_timestamp, image, breed]
    );
    return query.rows;
}

export const updatePetService = async (petid, atypeid, nickname, pbid) => {
    const query = await pool.query('UPDATE otcv_pets SET "ATYPEID" = $1, nickname = $2, "PBID" = $3 WHERE "PETID" = $4',
        [atypeid, nickname, pbid, petid]
    );
}

export const updatePetImageService = async (petid, image) => {
    const query = await pool.query('UPDATE otcv_pets SET image = $1 WHERE "PETID" = $2',
        [image, petid]
    );
}

export const deletePetService = async (id) => {
    const query = await pool.query('DELETE FROM otcv_pets WHERE "PETID" = $1',
        [id]
    );
}

export const getPetService = async (petid) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        LEFT JOIN otcv_pet_breeds pb
        ON p."PBID" = pb."PBID"
        WHERE p."PETID" = $1
    `
    ,[petid]);
    return result.rows[0];
}

export const getPetByNicknameService = async (nickname, pet_owner) => {
    let nickNameSearched = `%${nickname}%`
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE (p.nickname ILIKE $1 OR
        ant.animal_type ILIKE $1)
        AND p.pet_owner = $2`
    ,[nickNameSearched, pet_owner]);
    return result.rows;
}

export const getPetByNicknameAdminService = async (nickname) => {
    let nickNameSearched = `%${nickname}%`
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p.nickname ILIKE $1 OR
        ant.animal_type ILIKE $1`
    ,[nickNameSearched]);
    return result.rows;
}

export const getAllPetsService = async () => {
    const result = await pool.query(`
        SELECT p.*, ant.*, ud.*, pb.breed_name
        FROM otcv_pets p 
        INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        INNER JOIN otcv_user_details ud
        ON p."pet_owner" = ud."UID"
        LEFT JOIN otcv_pet_breeds pb
        ON pb."PBID" = p."PBID"
        ORDER BY p.nickname ASC`
    );
    return result.rows;
}

export const getAllPetsPdfService = async () => {
    const result = await pool.query(`
        SELECT p."PETID", p.nickname, INITCAP(ant.animal_type) as AnimalType, COALESCE(pb.breed_name, ''), ud.firstname || ' ' || ud.surname as fullname, 
        TO_CHAR(p.registration_timestamp, 'YYYY-MM-DD HH24:MI')
        FROM otcv_pets p 
        INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        INNER JOIN otcv_user_details ud
        ON p."pet_owner" = ud."UID"
        LEFT JOIN otcv_pet_breeds pb
        ON pb."PBID" = p."PBID"
        ORDER BY p.nickname ASC`
    );
    return result.rows;
}

export const getAllPetMedicalRecordsService = async (PETID) => {
    const result = await pool.query(`
        SELECT p."PETID", p.nickname, INITCAP(ant.animal_type) as AnimalType, 
        ud.firstname || ' ' || ud.surname as fullname, vs.vaccine_name, STRING_AGG(DISTINCT s.service, ', ' ) as service,
        STRING_AGG(DISTINCT d.diagnosis, ', ' ) as diagnosis, TO_CHAR(als.date, 'MM/DD/YYYY') as date, als.time, als.remarks
        FROM otcv_pets p 
        INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        INNER JOIN otcv_user_details ud
        ON p."pet_owner" = ud."UID"
        INNER JOIN otcv_appointment_schedule als
        ON als."PETID" = p."PETID"
        LEFT JOIN otcv_service s
        ON s."SERVICEID" = ANY(als."SERVICEIDS")
        LEFT JOIN otcv_diagnosis d
        ON d."DIAGID" = ANY(als."DIAGNOSIS")
        LEFT JOIN otcv_vaccinations vss
        ON vss."PETID" = p."PETID"
        LEFT JOIN otcv_vaccines vs
        on vs."VACCID" = vss."VACCID"
        WHERE als."PETID" = $1 AND als.status != 'Scheduled' AND als.status != 'Ongoing'
        GROUP BY als."ASID", p."PETID", als."PGID", p.nickname, als.date, als.time, als.remarks, 
        ant.animal_type, ud.firstname, ud.surname, vs.vaccine_name
        ORDER BY p.nickname ASC
    `, [PETID]);
    return result.rows;
}

export const getAllPetsByTypeService = async (atypeid) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."ATYPEID" = $1
        ORDER BY p.nickname ASC`
    ,[atypeid]);
    return result.rows;
}

export const getAllPetsByTypeDescendingService = async (atypeid) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."ATYPEID" = $1
        ORDER BY p.nickname DESC`
    ,[atypeid]);
    return result.rows;
}

export const getAllPetsByOwnerService = async (uid) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."pet_owner" = $1
        ORDER BY p.nickname ASC`
    ,[uid]);
    return result.rows;
}

export const getAllPetsByOwnerDescendingService = async (uid) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."pet_owner" = $1
        ORDER BY p.nickname ASC`
    ,[uid]);
    return result.rows;
}

export const getAllPetsAndOwnerByTypeService = async (uid, atypeid) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."pet_owner" = $1 AND p."ATYPEID" = $2
        ORDER BY p.nickname ASC`
    ,[uid, atypeid]);
    return result.rows;
}

export const getAllCountPetsByOwnerService = async (uid) => {
    const result = await pool.query(`
        SELECT COUNT(*) FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."pet_owner" = $1`
    ,[uid]);
    return result.rows[0];
}

export const getAllCountPetsByOwnerAndPetsService = async (uid) => {
    const result = await pool.query(`
        SELECT ant.*, COUNT(*) as animal_count FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p."pet_owner" = $1
        GROUP BY p."ATYPEID", ant."ATYPEID", ant.animal_type`
    ,[uid]);
    return result.rows;
}

export const getAllPetsCountService = async () => {
    const result = await pool.query(`SELECT COUNT(*) FROM otcv_pets`);
    return result.rows[0];
}

export const getAllPetsByDateService = async (date) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p.registration_timestamp::TIMESTAMPTZ::DATE = $1
        ORDER BY p.nickname ASC`
    ,[date]);
    return result.rows;
}

export const getAllPetsByRangeDateService = async (todate, fromdate) => {
    const result = await pool.query(`
        SELECT * FROM 
        otcv_pets p INNER JOIN otcv_animal_types ant
        ON p."ATYPEID" = ant."ATYPEID"
        WHERE p.registration_timestamp BETWEEN $1 AND $2
        ORDER BY p.nickname ASC`,
    [fromdate, todate]);
    return result.rows;
}


export const getPetsCountByTypeService = async () => {
    const result = await pool.query(`
    SELECT at."ATYPEID", at.animal_type, COUNT(p."PETID") AS total_population
    FROM public.otcv_animal_types at
    LEFT JOIN public.otcv_pets p ON at."ATYPEID" = p."ATYPEID"
    GROUP BY at."ATYPEID", at.animal_type
    ORDER BY total_population DESC;`);
    return result.rows;
}