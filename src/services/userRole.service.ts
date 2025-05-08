
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

export const deleteDoctorService = async (doctorId: number) => {
    try {
        const deletedDoctor = await prisma.doctor.delete({
            where: {
                id: doctorId,
            },
        });

        return deletedDoctor;
    } catch (error) {
        throw new Error('Error while deleting doctor');
    }
};
export const deletePatientService = async (patientId: number) => {
    try {
        const deletedPatient = await prisma.patient.delete({
            where: {
                id: patientId,
            },
        });

        return deletedPatient;
    } catch (error) {
        throw new Error('Error while deleting patient');
    }
};
export const deleteNurseService = async (nurseId: number) => {
    try {
        const deletedNurse = await prisma.nurse.delete({
            where: {
                id: nurseId,
            },
        });

        return deletedNurse;
    } catch (error) {
        throw new Error('Error while deleting nurse');
    }
};