import handleResponse from "../middleware/responseHandler.js";
import { createAppointmentScheduleService, deleteAppointmentScheduleService, getAllAppointmentSchedulePdfService, getAllAppointmentScheduleService, getAllRecentAppointmentScheduleService, getAllUpcomingAppointmentSchedulePdfService, getAllUpcomingAppointmentScheduleService, getAppointmentScheduleByDateService, getAppointmentScheduleByDateTimeService, getAppointmentScheduleByStatusService, getAppointmentScheduleTimeslotsPerDateService, getAppointmentsScheduleByUserService, getAppointmentsScheduleService, getAppointmentStatsService, getAppointmentSuccessStatsService, getOngoinglAppointmentScheduleService, updateAppointmentScheduleByStatusService, updateAppointmentStatusService } from "../models/appointmentScheduleModel.js";
import { generatePdf } from "../utils/reportUtils.js";

export const createAppointmentSchedule = async (req, res, next) => {
    const { PETID, PGID, SERVICEIDS, DIAGNOSIS, remarks, status, date, time } = req.body;

    const sched = new Date(date);
    const dateConverted = `${sched.getFullYear()}-${sched.getMonth()+1}-${sched.getDate()}`;
    // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const services = Array.isArray(SERVICEIDS) ? SERVICEIDS : SERVICEIDS.split(',');
    const diagnosis = Array.isArray(DIAGNOSIS) ? DIAGNOSIS : DIAGNOSIS.split(',');
    let petid = String(PETID).trim().length > 0 ? PETID : null;
    let pgid = String(PGID).trim().length > 0 ? PGID : null;
    try{
        const q = await createAppointmentScheduleService(petid, pgid, services, diagnosis, remarks, status, dateConverted, time);
        return handleResponse(res, 201, "Appointment created.");
    }catch(err) {
        return next(err);
    }
}

export const createAppointmentScheduleWithImage = async (req, res, next) => {
    const { PETID, PGID, SERVICEIDS, DIAGNOSIS, remarks, status, date, time } = req.body;

    const imageFile = req.file;
    const image_name = imageFile.originalname
    const sched = new Date(date);
    const dateConverted = `${sched.getFullYear()}-${sched.getMonth()+1}-${sched.getDate()}`;
    // const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const services = Array.isArray(SERVICEIDS) ? SERVICEIDS : SERVICEIDS.split(',');
    const diagnosis = Array.isArray(DIAGNOSIS) ? DIAGNOSIS : DIAGNOSIS.split(',');
    let petid = String(PETID).trim().length > 0 ? PETID : null;
    let pgid = String(PGID).trim().length > 0 ? PGID : null;
    try{
        const q = await createAppointmentScheduleService(petid, pgid, services, diagnosis, remarks, status, dateConverted, time, image_name);
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

export const getOngoinglAppointmentSchedule = async (req, res, next) => {
    try{
        const q = await getOngoinglAppointmentScheduleService();
        return handleResponse(res, 200, "Appointment successfully fetched.", q);
    }catch(err) {
        return next(err);
    }
}

export const updateAppointmentStatus = async (req, res, next) => {
    const { status, remarks } = req.body;
    const asid = req.query.asid
    try{
        await updateAppointmentStatusService(status, asid, remarks);
        return handleResponse(res, 200, "Status successfully updated.")
    }catch(err) {
        return next(err)
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


export const generateUpcomingAppointmentPdf = async (req, res, next) => {
    const dateObj = new Date();
    const dateTimeStamp = `${dateObj.getFullYear()}${dateObj.getMonth()+1}${dateObj.getDate()}_${dateObj.getHours()}${dateObj.getMinutes()}`
    try{
        const result = await getAllUpcomingAppointmentSchedulePdfService();
        const headers = ['ID', "Client", "Date", "Time"]
        generatePdf(res, "Upcoming Appointment", headers, result, `UpcomingAppointment${dateTimeStamp}`)
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


export const getAppointmentStats = async(req, res, next) => {
    try{
        const result = await getAppointmentStatsService();
        let stats = {
            'totalToday': result[0].rows[0].total_today,
            'totalThisWeek': result[1].rows[0].total_this_week,
            'totalThisMonth': result[2].rows[0].total_this_month,
        }
        return handleResponse(res, 200, "Appointment successfully fetched.",  stats);
    }catch(err) {
        return next(err);
    }
}

export const getAppointmentSuccessStats = async(req, res, next) => {
    try{
        const result = await getAppointmentSuccessStatsService();
        let stats = {
            'totalCompleted': result[0].rows[0].total_completed,
            'totalMissed': result[1].rows[0].total_missed,
        }
        return handleResponse(res, 200, "Appointment successfully fetched.",  stats);
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