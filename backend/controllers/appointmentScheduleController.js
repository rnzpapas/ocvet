import handleResponse from "../middleware/responseHandler.js";
import { createAppointmentScheduleService, deleteAppointmentScheduleService, getAllAppointmentScheduleService, getAppointmentScheduleByDateService, getAppointmentScheduleByDateTimeService, getAppointmentScheduleByStatusService, getAppointmentsScheduleService, updateAppointmentScheduleByStatusService } from "../models/appointmentScheduleModel.js";

export const createAppointmentSchedule = async (req, res, next) => {
    // "ASID", "PETID", "SERVICEIDS", "DIAGNOSIS", remarks, status, date, time
    const { PETID, SERVICEIDS, DIAGNOSIS, remarks, status, date, time } = req.body;
    const sched = new Date(date);
    const dateConverted = `${sched.getFullYear()}-${sched.getMonth()+1}-${sched.getDate()}`;
    // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    try{
        const q = await createAppointmentScheduleService(PETID, SERVICEIDS, DIAGNOSIS, remarks, status, dateConverted, time);
        return handleResponse(res, 201, "Appointment created.");
    }catch(err) {
        return next(err);
    }
}

export const deleteAppointmentSchedule = async (req, res, next) => {
    const asid = req.query.asid;
    try{
        const q = await deleteAppointmentScheduleService(asid);
        return handleResponse(res, 200, "Appointment deleted.");
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentsSchedule = async (req, res, next) => {
    const petid = req.query.petid;
    const pgid = req.query.pgid;
    console.log(petid)
    try{
        const q = await getAppointmentsScheduleService(petid, pgid);
        return handleResponse(res, 200, "Appointments successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAllAppointmentSchedule = async (req, res, next) => {
    try{
        const q = await getAllAppointmentScheduleService();
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentScheduleByDate = async(req, res, next) => {
    const date = req.query.date;
    const dateConverted = new Date(date);
    const dateParsed = `${dateConverted.getFullYear()}-${dateConverted.getMonth()+1}-${dateConverted.getDate()}`;

    try{
        const q = await getAppointmentScheduleByDateService(dateParsed);
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentScheduleByDateTime = async(req, res, next) => {
    const date = req.query.date;
    const time = req.query.time;
    const dateConverted = new Date(date);
    const dateParsed = `${dateConverted.getFullYear()}-${dateConverted.getMonth()+1}-${dateConverted.getDate()}`;
    // const timeParsed = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    try{
        const q = await getAppointmentScheduleByDateTimeService(dateParsed, time);
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentScheduleByStatus = async(req, res, next) => {
    const status = req.query.status;
    try{
        const q = await getAppointmentScheduleByStatusService(status);
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const updateAppointmentScheduleByStatus = async(req, res, next) => {
    const {asid, status} = req.body;
    try{
        const q = await updateAppointmentScheduleByStatusService(asid, status);
        return handleResponse(res, 200, "Appointment successfully updated.");
    }catch(err) {
        return next(err);
    }
}