import express from 'express';
import { createAppointmentSchedule, deleteAppointmentSchedule, getAllAppointmentSchedule, 
getAppointmentScheduleByDate, getAppointmentScheduleByDateTime, getAppointmentScheduleByStatus, 
updateAppointmentScheduleByStatus, getAppointmentsSchedule, getAppointmentsScheduleByUser,
getAllRecentAppointmentSchedule, getAllUpcomingAppointmentSchedule, getAppointmentScheduleTimeslotsPerDate,
generateAppointmentHistoryPdf,
generateUpcomingAppointmentPdf,
getAppointmentStats,
getAppointmentSuccessStats,
updateAppointmentStatus,
getOngoinglAppointmentSchedule,
createAppointmentScheduleWithImage} from '../controllers/appointmentScheduleController.js';
import { authenticateAdminJwt } from '../middleware/authHandler.js';
import upload from '../config/storage.js';
const ROUTER = express.Router();

ROUTER.get("/appointment/pet", getAppointmentsSchedule);
ROUTER.put("/appointment/update", updateAppointmentScheduleByStatus);
ROUTER.post("/appointment/pet", createAppointmentSchedule);
ROUTER.post("/appointment/create", createAppointmentSchedule);
ROUTER.post("/appointment/create/image", upload.single('image') , createAppointmentScheduleWithImage);
ROUTER.delete("/appointment/delete", deleteAppointmentSchedule);
ROUTER.get("/appointment/all",  getAllAppointmentSchedule);
ROUTER.get("/appointment/datetime",  getAppointmentScheduleTimeslotsPerDate);
ROUTER.get("/appointment/all/recent", authenticateAdminJwt, getAllRecentAppointmentSchedule);
ROUTER.get("/appointment/all/history/export", authenticateAdminJwt, generateAppointmentHistoryPdf);
ROUTER.get("/appointment/all/upcoming/export", authenticateAdminJwt, generateUpcomingAppointmentPdf);
ROUTER.get("/appointment/all/upcoming", authenticateAdminJwt, getAllUpcomingAppointmentSchedule);
ROUTER.get("/appointment/all/ongoing", authenticateAdminJwt, getOngoinglAppointmentSchedule);
ROUTER.get("/appointment/stats", getAppointmentStats);
ROUTER.get("/appointment/stats/success", getAppointmentSuccessStats);
ROUTER.get("/appointment", getAppointmentScheduleByDate);
ROUTER.get("/appointment/user", getAppointmentsScheduleByUser)
ROUTER.put("/appointment/status", updateAppointmentStatus)
// ROUTER.get("/appointment/datetime", getAppointmentScheduleByDateTime);
ROUTER.get("/appointment/status", getAppointmentScheduleByStatus);


export default ROUTER;