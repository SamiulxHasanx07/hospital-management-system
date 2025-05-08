import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import prisma from '../../prisma/prismaClient';
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, role } = req.body;

    try {
        const result = await registerUser(name, email, password, role);
        return res.status(201).json(result);
    } catch (error: any) {
        const errorMsg = error.message || "Something went wrong";

        if (errorMsg === "Invalid role") {
            return res.status(400).json({ error: errorMsg });
        } else if (errorMsg === "Email is already registered") {
            return res.status(409).json({ error: errorMsg });
        }

        return res.status(500).json({ error: "Failed to register user" });
    }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const { user, token } = await loginUser(email, password);
        let actualId: number | null = null;

        if (user.role === 'DOCTOR') {
            const doctor = await prisma.doctor.findUnique({
                where: { userId: user.id },
                select: { id: true },
            });
            actualId = doctor?.id ?? null;
        } else if (user.role === 'PATIENT') {
            const patient = await prisma.patient.findUnique({
                where: { userId: user.id },
                select: { id: true },
            });
            actualId = patient?.id ?? null;
        } else if (user.role === 'NURSE') {
            const patient = await prisma.nurse.findUnique({
                where: { userId: user.id },
                select: { id: true },
            });
            actualId = patient?.id ?? null;
        }

        return res.status(200).json({ message: "Login successful", user, token, actualId });
    } catch (error: any) {
        const message = error.message || "Internal server error";

        if (message === "User not found") return res.status(404).json({ error: message });
        if (message === "Invalid password") return res.status(401).json({ error: message });

        return res.status(500).json({ error: message });
    }
};