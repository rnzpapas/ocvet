import pool from "../config/db.js";
import {generateInitialId, generateNewId} from "../utils/idUtils.js";

const getLatestMailGroupId = async () => {
    const latest_group_id = await pool.query('SELECT "TGID" FROM otcv_mail_groups ORDER BY "TGID" DESC LIMIT 1');
    return latest_group_id.rows;
}

export const createMailGroupsService = async (audience, nickname) => {
    let new_group_id;
    let latest_group_id = getLatestMailGroupId();
    (await latest_group_id).length > 0 ? new_group_id = generateNewId(await latest_group_id, "TGID") : new_group_id = generateInitialId("TGID");
    const res = await pool.query('INSERT INTO otcv_mail_groups ("TGID", target_audience, group_nickname) VALUES ($1, $2, $3)', [new_group_id, audience, nickname])
}

export const deleteMailGroupsService = async (id) => {
    const res = await pool.query('DELETE FROM otcv_mail_groups WHERE "TGID" = $1', [id]);
}

export const getMailGroupsService = async () => {
    const res = await pool.query('SELECT * FROM otcv_mail_groups ORDER BY group_nickname ASC');
    return res.rows;
}

export const getMailGroupsByGroupNicknameService = async (mail_group) => {
    const result = await pool.query('SELECT * FROM otcv_mail_groups WHERE group_nickname = $1', [mail_group]);
    return result.rows;
}

export const getMailGroupsByUserService = async (uaid) => {
    const result = await pool.query('SELECT * FROM otcv_mail_groups WHERE $1 = ANY("target_audience")', [uaid]);
    return result.rows;
}