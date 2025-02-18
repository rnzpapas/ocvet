import pool from "../config/db.js";
import { generateInitialId, generateNewId } from "../utils/idUtils.js";

const getLatestAnnouncementID = async () => {
    const latest_annid = await pool.query('SELECT "ANNID" from otcv_announcements ORDER BY "ANNID" DESC LIMIT 1')
    return latest_annid.rows;
}

export const createAnnouncementService = async (tgid, uaid, announcement_title, message, date, time) => {
    let new_annid = "";
    let latest_annid = await getLatestAnnouncementID();
    (latest_annid).length > 0 ? new_annid = generateNewId((latest_annid), "ANNID") : new_annid = generateInitialId("ANNID");
    await pool.query('INSERT INTO otcv_announcements ("ANNID", "TGIDS", "UAID", announcement_title, message, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [new_annid, tgid, uaid, announcement_title, message, date, time])
}

export const deleteAnnouncementService = async (id) => {
    const result = await pool.query(`DELETE FROM otcv_announcements WHERE "ANNID" = $1`, [id]);
    return result.rows[0];
}

// upnext
export const getAnnouncementForRecipientsService = async(uaid) => {
    const result = await pool.query(`
        SELECT 
        a.*, 
        mg.group_nickname,
        STRING_AGG(concat(ud.firstname, ' ', ud.middlename, ' ', ud.surname) , ', ') AS user_names, 
        STRING_AGG(ua.email, ', ') AS user_emails,
        STRING_AGG(mg."TGID"::TEXT, ', ') AS mail_groups
        FROM otcv_announcements a
        LEFT JOIN otcv_user_details ud
        ON ud."UAID" = ANY(a."UAID")
        LEFT JOIN otcv_user_accounts ua
        ON ua."UAID" = ud."UAID"
        LEFT JOIN otcv_mail_groups mg
        ON mg."TGID" = ANY(a."TGIDS")
        WHERE $1 = ANY(a."UAID")
        OR $1 = ANY(mg.target_audience)
        GROUP BY a."ANNID", mg.group_nickname;  
        `, 
        [uaid]);
    return result.rows;
}

export const getAnnouncementForRecipientsMailGroupService = async(tgid, uaid) => {
    const result = await pool.query('SELECT * FROM otcv_announcements WHERE $1 = ANY("TGIDS");', 
        [tgid]);
    return result.rows;
}