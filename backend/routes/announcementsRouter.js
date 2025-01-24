import express from 'express';
import { createAnnouncement, deleteAnnouncement, getAnnouncementForRecipients} from '../controllers/announcementsController.js';

const ROUTER = express.Router();

ROUTER.get("/announcement", getAnnouncementForRecipients);
ROUTER.post("/announcement/create", createAnnouncement);
ROUTER.delete("/announcement/remove", deleteAnnouncement);

export default ROUTER;