import { Request, Response } from 'express';
import { createEmergencyAdmissionService, deleteEmergencyAdmissionService, getAllEmergencyAdmissionsService, getEmergencyAdmissionByIdService, updateEmergencyAdmissionService } from '../services/emergencyAdmission.service';

export const createEmergencyAdmission = async (req: Request, res: Response) => {
    try {
        const admission = await createEmergencyAdmissionService(req.body);
        res.status(201).json(admission);
    } catch (error) {
        console.error('Error in createEmergencyAdmission:', error);

        res.status(500).json({
            error: 'Failed to create emergency admission',
        });
    }
};

export const getAllEmergencyAdmissions = async (_req: Request, res: Response) => {
    try {
        const admissions = await getAllEmergencyAdmissionsService();
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emergency admissions', details: error });
    }
};

export const getEmergencyAdmissionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const admission = await getEmergencyAdmissionByIdService(Number(id));
        if (!admission) {
            return res.status(404).json({ error: 'Emergency Admission not found' });
        }
        res.status(200).json(admission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emergency admission', details: error });
    }
};

export const updateEmergencyAdmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedAdmission = await updateEmergencyAdmissionService(Number(id), req.body);
        res.status(200).json(updatedAdmission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update emergency admission', details: error });
    }
};

export const deleteEmergencyAdmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteEmergencyAdmissionService(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete emergency admission', details: error });
    }
};
