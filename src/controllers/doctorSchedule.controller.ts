import { Request, Response } from 'express';
import * as service from '../services/doctorSchedule.service';

export const createDoctorSchedule = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const schedule = await service.createSchedule(data);
        res.status(201).json(schedule);
    } catch (error: any) {
        res.status(400).json({ error: 'Could not create schedule', detail: error?.message });
    }
};

export const getDoctorsAllSchedule = async (_req: Request, res: Response) => {
    try {
        const schedules = await service.getAllSchedules();
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch schedules' });
    }
};

export const getScheduleById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const schedule = await service.getScheduleById(id);
        if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch schedule' });
    }
};

export const removeDoctorSchedule = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await service.deleteScheduleById(id);
        res.json({ message: 'Schedule deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete schedule' });
    }
};
