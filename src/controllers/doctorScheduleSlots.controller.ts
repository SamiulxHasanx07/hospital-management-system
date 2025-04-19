import { Request, Response } from 'express';
import {
  createDoctorScheduleSlot,
  getAllDoctorScheduleSlots,
  getDoctorScheduleSlotById,
  updateDoctorScheduleSlot,
  deleteDoctorScheduleSlot
} from './../services/doctorScheduleSlots.service';

export const addSlot = async (req: Request, res: Response) => {
  const { startTime, endTime, maxPatients } = req.body;
  try {
    const newSlot = await createDoctorScheduleSlot(startTime, endTime, maxPatients);
    return res.status(201).json(newSlot);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getSlots = async (req: Request, res: Response) => {
  try {
    const slots = await getAllDoctorScheduleSlots();
    return res.status(200).json(slots);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateSlot = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log("Updating schedule slot:", { id, updateData });

  try {
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid ID provided" });
    }
    const updatedSlot = await updateDoctorScheduleSlot(Number(id), updateData);

    if (!updatedSlot) {
      return res.status(404).json({ message: 'Schedule slot not found' });
    }
    console.log("Successfully updated slot:", updatedSlot);
    return res.status(200).json(updatedSlot);

  } catch (error) {
    console.error("Error updating slot:", error);
    return res.status(500).json({ message: 'Error updating doctor schedule slot', error });
  }
};

export const getSlotById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const slot = await getDoctorScheduleSlotById(Number(id));
    if (!slot) {
      return res.status(404).json({ message: 'Doctor schedule slot not found' });
    }
    return res.status(200).json(slot);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteSlot = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await deleteDoctorScheduleSlot(Number(id));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};