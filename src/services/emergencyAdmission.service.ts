const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const createEmergencyAdmissionService = async (data: any) => {
    try {
        if (data.patientId) {
            const patient = await prisma.patient.findUnique({
                where: { id: data.patientId },
            });

            if (!patient) {
                throw new Error(`Patient not found with the given patientId: ${data.patientId}`);
            }
        }

        if (data.admittedById && data.patientId) {
            const existingAdmission = await prisma.emergencyAdmission.findFirst({
                where: {
                    admittedById: data.admittedById,
                    patientId: data.patientId,
                    status: "admitted",
                },
            });

            if (existingAdmission) {
                throw new Error(`User with ID ${data.admittedById} has already admitted patient with ID ${data.patientId}`);
            }
        }

        if (data.admittedById) {
            const admittedBy = await prisma.user.findUnique({
                where: { id: data.admittedById },
            });
            if (!admittedBy) {
                throw new Error(`User not found with the given admittedById: ${data.admittedById}`);
            }
        }

        if (data.bedId) {
            const bed = await prisma.bed.findUnique({
                where: { id: data.bedId },
            });
            if (!bed) {
                throw new Error(`Bed not found with the given bedId: ${data.bedId}`);
            }
        }

        return await prisma.emergencyAdmission.create({
            data,
        });
    } catch (error) {
        if (error) {
            console.error('Prisma Error:', error);
            throw new Error(`Prisma error: ${error} | Code: ${error}`);
        }

        console.error('Unknown error:', error);
        throw new Error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const getAllEmergencyAdmissionsService = async () => {
    return await prisma.emergencyAdmission.findMany({
        include: {
            patient: true,
            admittedBy: true,
            bed: true,
        },
    });
};

export const getEmergencyAdmissionByIdService = async (id: number) => {
    return await prisma.emergencyAdmission.findUnique({
        where: { id },
        include: {
            patient: true,
            admittedBy: true,
            bed: true,
        },
    });
};

export const updateEmergencyAdmissionService = async (id: number, data: any) => {
    return await prisma.emergencyAdmission.update({
        where: { id },
        data,
    });
};

export const deleteEmergencyAdmissionService = async (id: number) => {
    return await prisma.emergencyAdmission.delete({
        where: { id },
    });
};
