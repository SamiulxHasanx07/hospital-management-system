import express from "express";
import { getAllDoctors, getDoctorById, getAllPatients, getPatientById, getAllNurses, getNurseById } from '../controllers/userRole.controller';
const router = express.Router();

// @ts-ignore
router.get('/doctors', getAllDoctors);
// @ts-ignore
router.get('/doctors/:id', getDoctorById);

// @ts-ignore
router.get('/patients', getAllPatients);
// @ts-ignore
router.get('/patients/:id', getPatientById);

// @ts-ignore
router.get('/nurses', getAllNurses);
// @ts-ignore
router.get('/nurses/:id', getNurseById);

export default router;
