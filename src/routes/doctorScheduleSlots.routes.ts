import { Router } from "express";
import { addSlot, addSlots, deleteSlot, getSlotById, getSlots, updateSlot } from "../controllers/doctorScheduleSlots.controller";

const router = Router()
// @ts-ignore
router.post('/slot', addSlot);

// @ts-ignore
router.post('/slots', addSlots);

// @ts-ignore
router.get('/slots', getSlots);

// @ts-ignore
router.post('/update/:id', updateSlot);

// @ts-ignore
router.get('/slot/:id', getSlotById);

// @ts-ignore
router.delete('/delete/:id', deleteSlot);

export default router;
