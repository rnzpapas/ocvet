import express from 'express';
import { createAppointmentSchedule, deleteAppointmentSchedule, getAllAppointmentSchedule, 
getAppointmentScheduleByDate, getAppointmentScheduleByDateTime, getAppointmentScheduleByStatus, 
updateAppointmentScheduleByStatus, getAppointmentsSchedule, getAppointmentsScheduleByUser,
getAllRecentAppointmentSchedule, getAllUpcomingAppointmentSchedule} from '../controllers/appointmentScheduleController.js';
import { authenticateAdminJwt } from '../middleware/authHandler.js'
const ROUTER = express.Router();

ROUTER.get("/appointment/pet", getAppointmentsSchedule);
ROUTER.put("/appointment/update", updateAppointmentScheduleByStatus);
ROUTER.post("/appointment/pet", createAppointmentSchedule);
ROUTER.post("/appointment/create", createAppointmentSchedule);
ROUTER.delete("/appointment/delete", deleteAppointmentSchedule);
ROUTER.get("/appointment/all", authenticateAdminJwt, getAllAppointmentSchedule);
ROUTER.get("/appointment/all/recent", authenticateAdminJwt, getAllRecentAppointmentSchedule);
ROUTER.get("/appointment/all/upcoming", authenticateAdminJwt, getAllUpcomingAppointmentSchedule);
ROUTER.get("/appointment", getAppointmentScheduleByDate);
ROUTER.get("/appointment/user", getAppointmentsScheduleByUser)
ROUTER.get("/appointment/datetime", getAppointmentScheduleByDateTime);
ROUTER.get("/appointment/status", getAppointmentScheduleByStatus);


export default ROUTER;