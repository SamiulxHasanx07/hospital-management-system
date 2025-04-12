
import prisma from '../../prisma/prismaClient';

export const fetchAllDoctors = async () => {
    return await prisma.doctor.findMany({
        include: { user: true },
    });
};

export const fetchDoctorById = async (id: number) => {
    return await prisma.doctor.findUnique({
        where: { id },
        include: { user: true },
    });
};

export const fetchAllPatients = async () => {
    return await prisma.patient.findMany({
        include: { user: true },
    });
};

export const fetchPatientById = async (id: number) => {
    return await prisma.patient.findUnique({
        where: { id },
        include: { user: true },
    });
};

export const fetchAllNurses = async () => {
    return await prisma.nurse.findMany({
        include: { user: true },
    });
};

export const fetchNurseById = async (id: number) => {
    return await prisma.nurse.findUnique({
        where: { id },
        include: { user: true },
    });
};
