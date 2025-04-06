import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { Roles } from "../utils/roles";
import prisma from '../../prisma/prismaClient';

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role)
    try {
        if (!Object.values(Roles).includes(role)) {
            return res.status(400).json({ error: "Invalid role" })
        }
        const isEmailRegistered = await prisma.user.findUnique({ where: { email } });
        if (isEmailRegistered) {
            return res.status(409).json({ error: "Email is already registered!" });
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPass,
                role
            }
        });

        const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET!, { expiresIn: "1hr" })
        return res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to register user' });
    }

}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};