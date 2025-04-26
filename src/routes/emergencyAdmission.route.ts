import { Router } from 'express';
const router = Router();

import { createEmergencyAdmission, deleteEmergencyAdmission, getAllEmergencyAdmissions, getEmergencyAdmissionById, updateEmergencyAdmission } from '../controllers/emergencyAdmission.controller';

router.post('/', createEmergencyAdmission);
router.get('/', getAllEmergencyAdmissions);
// @ts-ignore
router.get('/:id', getEmergencyAdmissionById);
router.put('/:id', updateEmergencyAdmission);
router.delete('/:id', deleteEmergencyAdmission);

export default router;
