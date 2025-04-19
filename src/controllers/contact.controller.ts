import { Request, Response } from 'express';
import * as ContactService from '../services/contact.service';

export const createContact = async (req: Request, res: Response) => {
    try {
        const contact = await ContactService.createContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create contact', error });
    }
};

export const getContactByUserId = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const contact = await ContactService.getContactByUserId(userId);
        res.json(contact);
    } catch (error) {
        res.status(404).json({ message: 'Contact not found', error });
    }
};

export const updateContact = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const updated = await ContactService.updateContact(userId, req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update contact', error });
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        await ContactService.deleteContact(userId);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contact', error });
    }
};
