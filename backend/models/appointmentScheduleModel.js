import pool from "../config/db.js";
import { generateNewId, generateInitialId } from "../utils/idUtils.js";

const getLatestAppointmentID = async () => {
    const latest_appointment_id = await pool.query('SELECT "ASID" FROM otcv_appointment_schedule ORDER BY "ASID" DESC LIMIT 1');
    return latest_appointment_id.rows;
}

export const createAppointmentScheduleService = async (petid, pgid, servid, diagid, remarks, status, date, time ) => {
    let new_appointment_id;
    let latest_appointment_id = getLatestAppointmentID();
    (await latest_appointment_id).length > 0 ? new_appointment_id = generateNewId(await latest_appointment_id, "ASID") : new_appointment_id = generateInitialId("ASID");
    const res = await pool.query('INSERT INTO otcv_appointment_schedule ("ASID", "PETID", "PGID", "SERVICEIDS", "DIAGNOSIS", remarks, status, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
        [new_appointment_id, petid, pgid, servid, diagid, remarks, status, date, time]);
}

export const deleteAppointmentScheduleService = async (id) => {
    const res = await pool.query('DELETE FROM otcv_appointment_schedule WHERE "ASID" = $1', [id]);
}

export const getAppointmentsScheduleService = async (id) => {
    const res = await pool.query(`
        SELECT "ASID", a."PETID", a."PGID", service, diagnosis, status,
        ud.firstname || ' ' || ud.middlename || ' ' || ud.surname as fullname, 
        a.date, a.time
        FROM otcv_appointment_schedule a
        INNER JOIN otcv_service s
        ON a."SERVICEIDS" && (SELECT array_agg("SERVICEID") FROM otcv_service)
        INNER JOIN otcv_diagnosis d
        ON a."DIAGNOSIS" && (SELECT array_agg("DIAGID") FROM otcv_diagnosis)
        INNER JOIN otcv_pet_group pg
        ON pg."PGID" = a."PGID"
        INNER JOIN otcv_user_details ud
        ON ud."UID" = pg."PET_OWNER"
        WHERE a."PETID" = $1 OR a."PGID" = $1
        ORDER BY date DESC;
        `,
        [id]
    );
    return res.rows;
}

export const getAppointmentsScheduleByUserService = async (id) => {
    const res = await pool.query(`
        SELECT 	a."ASID", a."PETID", a."PGID", pg."GROUP_NICKNAME" as client, 
        STRING_AGG(DISTINCT s.service, ', ') AS service, 
        STRING_AGG(DISTINCT d.diagnosis, ', ') AS diagnosis, status, ud."UID",
        ud.firstname || ' ' || ud.middlename || ' ' || ud.surname as fullname, 
        a.date, a.time
        FROM otcv_appointment_schedule a
        INNER JOIN otcv_service s
        ON a."SERVICEIDS" && (SELECT array_agg("SERVICEID") FROM otcv_service)
        INNER JOIN otcv_diagnosis d
        ON a."DIAGNOSIS" && (SELECT array_agg("DIAGID") FROM otcv_diagnosis)
        INNER JOIN otcv_pet_group pg
        ON pg."PGID" = a."PGID"
        INNER JOIN otcv_user_details ud
        ON ud."UID" = pg."PET_OWNER"
        WHERE ud."UID" = $1 
        AND a."PGID" IS NOT NULL AND pg."PGID" = a."PGID"
        AND s."SERVICEID" = ANY(a."SERVICEIDS")
        AND d."DIAGID" = ANY(a."DIAGNOSIS")
        AND a.date >= CURRENT_DATE
        AND EXTRACT(MONTH FROM a.date) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM a.date) = EXTRACT(YEAR FROM CURRENT_DATE)
        GROUP BY 
        a."ASID", a."PETID", a."PGID" ,  pg."GROUP_NICKNAME", 
        a.status, ud."UID", ud.firstname, ud.middlename, ud.surname, 
        a.date, a.time
        UNION
        SELECT a."ASID", a."PETID", a."PGID", pt.nickname as client, 
        STRING_AGG(DISTINCT s.service, ', ') AS service, 
        STRING_AGG(DISTINCT d.diagnosis, ', ') AS diagnosis,
        status, ud."UID",
        ud.firstname || ' ' || ud.middlename || ' ' || ud.surname as fullname, 
        a.date, a.time
        FROM otcv_appointment_schedule a
        INNER JOIN otcv_service s
        ON a."SERVICEIDS" && (SELECT array_agg("SERVICEID") FROM otcv_service)
        INNER JOIN otcv_diagnosis d
        ON a."DIAGNOSIS" && (SELECT array_agg("DIAGID") FROM otcv_diagnosis)
        INNER JOIN otcv_pets pt
        ON pt."PETID" = pt."PETID"
        INNER JOIN otcv_user_details ud
        ON ud."UID" = pt."pet_owner"
        WHERE ud."UID" = $1
        AND a."PETID" IS NOT NULL AND pt."PETID" = a."PETID"
        AND s."SERVICEID" = ANY(a."SERVICEIDS")
        AND d."DIAGID" = ANY(a."DIAGNOSIS")
        AND a.date >= CURRENT_DATE
        AND EXTRACT(MONTH FROM a.date) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM a.date) = EXTRACT(YEAR FROM CURRENT_DATE)
        GROUP BY 
        a."ASID", a."PETID", a."PGID", pt.nickname, 
        a.status, ud."UID", ud.firstname, ud.middlename, ud.surname, 
        a.date, a.time
        ORDER BY date ASC
        `,
        [id]
    );
    return res.rows;
}

export const getAllUpcomingAppointmentScheduleService = async () => {
    const res = await pool.query(`
    SELECT *
    FROM otcv_appointment_schedule sched
    LEFT JOIN otcv_pets p
    ON p."PETID" = sched."PETID"
    LEFT JOIN otcv_pet_group pg
    ON pg."PGID" = sched."PGID"
    WHERE date >= CURRENT_DATE
    ORDER BY date ASC;
    `);
    return res.rows;
}

export const getAllRecentAppointmentScheduleService = async () => {
    const res = await pool.query(`
    SELECT *
    FROM otcv_appointment_schedule sched
    LEFT JOIN otcv_pets p
    ON p."PETID" = sched."PETID"
    LEFT JOIN otcv_pet_group pg
    ON pg."PGID" = sched."PGID"
    WHERE date < CURRENT_DATE - INTERVAL '3 days'
    ORDER BY date DESC;
    `);
    return res.rows;
}

export const getAllAppointmentScheduleService = async () => {
    const res = await pool.query(`
    SELECT *
    FROM otcv_appointment_schedule sched
    LEFT JOIN otcv_pets p ON p."PETID" = sched."PETID"
    LEFT JOIN otcv_pet_group pg ON pg."PGID" = sched."PGID"
    WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)
    ORDER BY date DESC;
    `);
    return res.rows;
}

export const getAppointmentScheduleTimeslotsPerDateService = async () => {
    const res = await pool.query(`
    SELECT 
    date, 
    array_agg("time" ORDER BY "time") AS time_slots
    FROM public.otcv_appointment_schedule
    GROUP BY date
    ORDER BY date;
    `);
    return res.rows;
}


export const getAppointmentScheduleByDateService = async(date) => {
    const result = await pool.query('SELECT * FROM otcv_appointment_schedule WHERE date = $1', [date]);
    return result.rows;
}

export const getAppointmentScheduleByDateTimeService = async(date, time) => {
    const result = await pool.query(`SELECT * FROM otcv_appointment_schedule WHERE date = $1 AND TO_CHAR("time",'HH24:MI') = $2`, [date, time]);
    return result.rows;
}

export const getAppointmentScheduleByStatusService = async(status) => {
    const result = await pool.query('SELECT * FROM otcv_appointment_schedule WHERE status = $1', [status]);
    return result.rows;
}

export const updateAppointmentScheduleByStatusService = async (asid, status) => {
    const result = await pool.query('UPDATE otcv_appointment_schedule SET status = $1 WHERE "ASID" = $2', 
        [status, asid]);
    return result.rows;
}