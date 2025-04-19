import express from 'express';
import {
    createContact,
    getContactByUserId,
    updateContact,
    deleteContact,
} from '../controllers/contact.controller';

const router = express.Router();

router.post('/', createContact);
router.get('/:userId', getContactByUserId);
router.put('/:userId', updateContact);
router.delete('/:userId', deleteContact);

export default router;
