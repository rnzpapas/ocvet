import handleResponse from "../middleware/responseHandler.js";
import { createAnnouncementService, deleteAnnouncementService, getAnnouncementForRecipientsService } from "../models/announcementsModel.js";

export const createAnnouncement = async (req, res, next) => {
    const { tgid, uaid, announcement_title, message, time} = req.body;
    const sched = new Date();
    const dateConverted = `${sched.getFullYear()}-${sched.getMonth()+1}-${sched.getDate()}`;
    try{
        if(announcement_title.length > 0 && message.length > 0){
            await createAnnouncementService(tgid, uaid, announcement_title, message, dateConverted, time);
            return handleResponse(res, 201, "Announcement successfully posted.");
        }
        return handleResponse(res, 400, "Announcement post failed.");
    }catch(err){
        return next(err);
    }
}

export const deleteAnnouncement = async (req, res, next) => {
    const id = req.query.id;

    try{
        await deleteAnnouncementService(id);
        return handleResponse(res, 200, "Announcement successfully deleted.");
    }catch(err){
        return next(err);
    }
}

export const getAnnouncementForRecipients = async(req, res, next) => {
    const { tgid, uaid } = req.body;

    try{
        const result = await getAnnouncementForRecipientsService(tgid, uaid);
        return handleResponse(res, 200, "Announcement successfully fetched.", result);
    }catch(err){
        return next(err);
    }
}