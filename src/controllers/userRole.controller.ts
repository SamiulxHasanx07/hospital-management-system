import { Request, Response } from 'express';
import * as roleService from '../services/userRole.service';

export const getAllDoctors = async (req: Request, res: Response) => {
    const doctors = await roleService.fetchAllDoctors();
    res.json(doctors);
};

export const getDoctorById = async (req: Request, res: Response) => {
    const doctor = await roleService.fetchDoctorById(Number(req.params.id));
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
};

export const getAllPatients = async (req: Request, res: Response) => {
    const patients = await roleService.fetchAllPatients();
    res.json(patients);
};

export const getPatientById = async (req: Request, res: Response) => {
    const patient = await roleService.fetchPatientById(Number(req.params.id));
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
};

export const getAllNurses = async (req: Request, res: Response) => {
    const nurses = await roleService.fetchAllNurses();
    res.json(nurses);
};

export const getNurseById = async (req: Request, res: Response) => {
    const nurse = await roleService.fetchNurseById(Number(req.params.id));
    if (!nurse) return res.status(404).json({ message: 'Nurse not found' });
    res.json(nurse);
};
