import handleResponse from "../middleware/responseHandler.js";
import { createAppointmentScheduleService, deleteAppointmentScheduleService, getAllAppointmentSchedulePdfService, getAllAppointmentScheduleService, getAllRecentAppointmentScheduleService, getAllUpcomingAppointmentScheduleService, getAppointmentScheduleByDateService, getAppointmentScheduleByDateTimeService, getAppointmentScheduleByStatusService, getAppointmentScheduleTimeslotsPerDateService, getAppointmentsScheduleByUserService, getAppointmentsScheduleService, updateAppointmentScheduleByStatusService } from "../models/appointmentScheduleModel.js";
import { generatePdf } from "../utils/reportUtils.js";

export const createAppointmentSchedule = async (req, res, next) => {
    const { PETID, PGID, SERVICEIDS, DIAGNOSIS, remarks, status, date, time } = req.body;
    const sched = new Date(date);
    const dateConverted = `${sched.getFullYear()}-${sched.getMonth()+1}-${sched.getDate()}`;
    // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    try{
        const q = await createAppointmentScheduleService(PETID || null, PGID || null, SERVICEIDS.split(','), DIAGNOSIS.split(','), remarks, status, dateConverted, time);
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
    const id = req.query.id;
    try{
        const q = await getAppointmentsScheduleService(id);
        return handleResponse(res, 200, "Appointments successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentsScheduleByUser= async (req, res, next) => {
    const id = req.query.id;
    try{
        const q = await getAppointmentsScheduleByUserService(id);
        return handleResponse(res, 200, "Appointments successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAllUpcomingAppointmentSchedule = async (req, res, next) => {
    try{
        const q = await getAllUpcomingAppointmentScheduleService();
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAllRecentAppointmentSchedule = async (req, res, next) => {
    try{
        const q = await getAllRecentAppointmentScheduleService();
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
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

export const generateAppointmentHistoryPdf = async (req, res, next) => {
    const dateObj = new Date();
    const dateTimeStamp = `${dateObj.getFullYear()}${dateObj.getMonth()+1}${dateObj.getDate()}_${dateObj.getHours()}${dateObj.getMinutes()}`
    try{
        const result = await getAllAppointmentSchedulePdfService();
        const headers = ['ID', "Client", "Date", "Time", "Status"]
        generatePdf(res, "Appointment History", headers, result, `AppointmentHistory${dateTimeStamp}`)
        // return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentScheduleTimeslotsPerDate = async (req, res, next) => {
    try{
        const q = await getAppointmentScheduleTimeslotsPerDateService();
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