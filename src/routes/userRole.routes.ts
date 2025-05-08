import express from "express";
import { getAllDoctors, getDoctorById, getAllPatients, getPatientById, getAllNurses, getNurseById, deletePatient, deleteNurse, deleteDoctor } from '../controllers/userRole.controller';
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
// @ts-ignore
router.delete('/doctors/:id', deleteDoctor); 
// @ts-ignore
router.delete('/patients/:id', deletePatient); 
// @ts-ignore
router.delete('/nurses/:id', deleteNurse); 
export default router;
