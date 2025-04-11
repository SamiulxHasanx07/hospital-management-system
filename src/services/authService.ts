import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Roles } from "../utils/enums";
import prisma from '../../prisma/prismaClient';

export const registerUser = async (name: string, email: string, password: string, role: string) => {
    if (!Object.values(Roles).includes(role as Roles)) {
        throw new Error("Invalid role");
    }

    const isEmailRegistered = await prisma.user.findUnique({ where: { email } });
    if (isEmailRegistered) {
        throw new Error("Email is already registered");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPass,
            role: role as Roles,
        },
    });

    if (role === Roles.DOCTOR) {
        await prisma.doctor.create({
            data: {
                userId: newUser.id,
                specialty: "General",
                experience: 0,
            },
        });
    } else if (role === Roles.PATIENT) {
        await prisma.patient.create({
            data: {
                userId: newUser.id,
                age: 0,
                gender: "",
            },
        });
    } else if (role === Roles.NURSE) {
        await prisma.nurse.create({
            data: {
                userId: newUser.id,
                shift: "Day",
                department: "General",
            },
        });
    }

    const token = jwt.sign(
        { userId: newUser.id, role: newUser.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    return { message: "User registered successfully", token };
};


export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    return { user, token };
};