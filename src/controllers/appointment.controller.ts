import { Request, Response } from 'express';
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentByDoctorId, getAppointmentById, updateAppointment } from "../services/appointment.service";

export const create = async (req: Request, res: Response) => {
    try {
        const appointment = await createAppointment(req.body);
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create appointment', details: err });
    }
};

export const getAll = async (_req: Request, res: Response) => {
    const appointments = await getAllAppointments();
    res.json(appointments);
};

export const getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const appointment = await getAppointmentById(id);
    if (!appointment) return res.status(404).json({ error: 'Not found' });
    res.json(appointment);
};
export const getByDoctorId = async (req: Request, res: Response) => {
    const doctorId = parseInt(req.params.doctorId);
    const appointment = await getAppointmentByDoctorId(doctorId);
    if (!appointment) return res.status(404).json({ error: 'Not found' });
    res.json(appointment);
};

export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const updated = await updateAppointment(id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Update failed', details: err });
    }
};

export const remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await deleteAppointment(id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Delete failed', details: err });
    }
};