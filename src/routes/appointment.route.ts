import express from 'express';
const router = express.Router();

import * as Appointment from "../controllers/appointment.controller"

router.post('/', Appointment.create);
router.get('/', Appointment.getAll);
// @ts-ignore
router.get('/:id', Appointment.getById);
// @ts-ignore
router.get('/by-doctor/:doctorId', Appointment.getByDoctorId);
router.put('/:id', Appointment.update);
router.delete('/:id', Appointment.remove);

export default router;