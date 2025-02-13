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
        SELECT a."ASID", a."PETID", a."PGID", array_agg(DISTINCT service) as services, 
        array_agg(DISTINCT diagnosis) as diagnosis, vs.vaccine_name, status,
        ud.firstname || ' ' || ud.middlename || ' ' || ud.surname as fullname, 
        a.date, a.time
        FROM otcv_appointment_schedule a
        LEFT JOIN otcv_service s
        ON s."SERVICEID" = ANY(a."SERVICEIDS")
        LEFT JOIN otcv_diagnosis d
        ON d."DIAGID" = ANY(a."DIAGNOSIS")
        LEFT JOIN otcv_pets pt
        ON pt."PETID" = a."PETID"
        LEFT JOIN otcv_pet_group pg
        ON pg."PGID" = a."PGID"
        LEFT JOIN otcv_user_details ud
        ON ud."UID" = pg."PET_OWNER"
        LEFT JOIN otcv_vaccinations v
        ON pt."PETID" = v."PETID" AND pg."PGID" = v."PGID"
        LEFT JOIN otcv_vaccines vs
        ON v."VACCID" = vs."VACCID"
        WHERE a."PETID" = $1 OR a."PGID" = $1
        GROUP BY a."ASID", a."PETID", a."PGID", status, fullname, vs.vaccine_name, a.date, a.time
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

export const getAppointmentsScheduleCountByUserService = async (id) => {
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
        WHERE ud."UID" = 'UID100000' 
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
        WHERE ud."UID" = 'UID100000'
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
    WHERE date >= CURRENT_DATE AND status = 'Scheduled'
    ORDER BY date ASC, time ASC;
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
    WHERE date BETWEEN CURRENT_DATE - INTERVAL '3 days' AND CURRENT_DATE - INTERVAL '1 days'
    ORDER BY date DESC, time ASC;
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
    ORDER BY date, time ASC;
    `);
    return res.rows;
}

export const getAllAppointmentSchedulePdfService = async () => {
    const res = await pool.query(`
    SELECT sched."ASID", COALESCE(p.nickname, pg."GROUP_NICKNAME") as client, TO_CHAR(sched.date, 'YYYY-MM-DD') AS formatted_date, sched.time, 
    CASE 
        WHEN sched.status = 'Scheduled' AND sched.date < CURRENT_DATE THEN 'Missed' 
        ELSE sched.status 
    END AS status
    FROM otcv_appointment_schedule sched
    LEFT JOIN otcv_pets p ON p."PETID" = sched."PETID"
    LEFT JOIN otcv_pet_group pg ON pg."PGID" = sched."PGID"
    WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', CURRENT_DATE)
    ORDER BY date, time ASC;
    `);
    return res.rows;
}

export const getAllUpcomingAppointmentSchedulePdfService = async () => {
    const res = await pool.query(`
    SELECT sched."ASID", COALESCE(p.nickname, pg."GROUP_NICKNAME") as client, TO_CHAR(sched.date, 'YYYY-MM-DD') AS formatted_date, sched.time
    FROM otcv_appointment_schedule sched
    LEFT JOIN otcv_pets p ON p."PETID" = sched."PETID"
    LEFT JOIN otcv_pet_group pg ON pg."PGID" = sched."PGID"
    WHERE date >= CURRENT_DATE
    ORDER BY date, time ASC;
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

export const updateAppointmentStatusService = async (status, asid) => {
    await pool.query(`UPDATE otcv_appointment_schedule SET status = $1 WHERE "ASID" = $2`, [status, asid])
}

export const getAppointmentStatsService = async() => {
    const todayQuery = await pool.query(`SELECT COUNT(*) AS total_today FROM public.otcv_appointment_schedule WHERE date = CURRENT_DATE;`);
    const weekQuery = await pool.query(`SELECT COUNT(*) AS total_this_week FROM public.otcv_appointment_schedule WHERE date >= DATE_TRUNC('week', CURRENT_DATE) AND date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days';`);
    const monthQuery = await pool.query(`SELECT COUNT(*) AS total_this_month FROM public.otcv_appointment_schedule WHERE date >= DATE_TRUNC('month', CURRENT_DATE) AND date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';`);
    return[todayQuery, weekQuery, monthQuery]
}

export const getAppointmentSuccessStatsService = async() => {
    const completedQuery = `SELECT COUNT(*) AS total_completed FROM public.otcv_appointment_schedule WHERE status = 'Done';`;
    const missedQuery = `SELECT COUNT(*) AS total_missed FROM public.otcv_appointment_schedule WHERE status = 'Missed'`;
    const completedRes = await pool.query(completedQuery);
    const successfulRes = await pool.query(missedQuery);
    return [completedRes, successfulRes];
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