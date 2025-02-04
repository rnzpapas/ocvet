import express from 'express';
import { createAppointmentSchedule, deleteAppointmentSchedule, getAllAppointmentSchedule, getAppointmentScheduleByDate, getAppointmentScheduleByDateTime, getAppointmentScheduleByStatus, updateAppointmentScheduleByStatus, getAppointmentsSchedule, getAppointmentsScheduleByUser} from '../controllers/appointmentScheduleController.js';

const ROUTER = express.Router();

ROUTER.get("/appointment/pet", getAppointmentsSchedule);
ROUTER.put("/appointment/update", updateAppointmentScheduleByStatus);
ROUTER.post("/appointment/pet", createAppointmentSchedule);
ROUTER.post("/appointment/create", createAppointmentSchedule);
ROUTER.delete("/appointment/delete", deleteAppointmentSchedule);
ROUTER.get("/appointment/all", getAllAppointmentSchedule);
ROUTER.get("/appointment", getAppointmentScheduleByDate);
ROUTER.get("/appointment/user", getAppointmentsScheduleByUser)
ROUTER.get("/appointment/datetime", getAppointmentScheduleByDateTime);
ROUTER.get("/appointment/status", getAppointmentScheduleByStatus);


export default ROUTER;