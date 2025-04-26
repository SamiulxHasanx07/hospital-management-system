import { Request, Response } from "express";
import { addBedService, addBedsService, getAllBedsService } from "../services/bed.service";

export const addBed = async (req: Request, res: Response) => {
    try {
        const { department, roomNumber, bedNumber } = req.body;

        const newBed = await addBedService({ department, roomNumber, bedNumber });

        res.status(201).json({ success: true, bed: newBed });
    } catch (error) {
        console.error('Add Bed Error:', error);
        res.status(500).json({ success: false, message: 'Failed to add bed' });
    }
};

export const addBeds = async (req: Request, res: Response) => {
    try {
        const { beds } = req.body;

        const result = await addBedsService(beds);

        res.status(201).json({ success: true, count: result.count });
    } catch (error) {
        console.error('Add Multiple Beds Error:', error);
        res.status(500).json({ success: false, message: 'Failed to add multiple beds' });
    }
};

export const getAllBeds = async (req: Request, res: Response) => {
    try {
        const beds = await getAllBedsService();
        res.status(200).json({ success: true, beds });
    } catch (error) {
        console.error('Get All Beds Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch beds' });
    }
};
