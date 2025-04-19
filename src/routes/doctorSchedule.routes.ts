import { Router } from 'express';
import { createDoctorSchedule, getDoctorsAllSchedule, getScheduleById, removeDoctorSchedule } from '../controllers/doctorSchedule.controller';

const router = Router();

router.post('/', createDoctorSchedule);
router.get('/', getDoctorsAllSchedule);
// @ts-ignore
router.get('/:id', getScheduleById);
router.delete('/:id', removeDoctorSchedule);

export default router;
