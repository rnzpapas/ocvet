import express from 'express';
import { createAnnouncement, deleteAnnouncement, getAnnouncementForRecipients, getAnnouncementForRecipientsMailGroup} from '../controllers/announcementsController.js';

const ROUTER = express.Router();

ROUTER.get("/announcement/user", getAnnouncementForRecipients);
ROUTER.get("/announcement/group", getAnnouncementForRecipientsMailGroup);
ROUTER.post("/announcement/create", createAnnouncement);
ROUTER.delete("/announcement/remove", deleteAnnouncement);

export default ROUTER;