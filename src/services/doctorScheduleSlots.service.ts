import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDoctorScheduleSlot = async (
    startTime: string,
    endTime: string,
    maxPatients: number = 25
) => {
    try {
        const newSlot = await prisma.doctorScheduleSlot.create({
            data: {
                startTime,
                endTime,
                maxPatients,
            },
        });
        return newSlot;
    } catch (error) {
        throw new Error('Error creating new doctor schedule slot');
    }
};

export const getAllDoctorScheduleSlots = async () => {
    try {
        const slots = await prisma.doctorScheduleSlot.findMany();
        return slots;
    } catch (error) {
        throw new Error('Error fetching doctor schedule slots');
    }
};

export const getDoctorScheduleSlotById = async (id: number) => {
    try {
        const slot = await prisma.doctorScheduleSlot.findUnique({
            where: { id },
        });
        return slot;
    } catch (error) {
        throw new Error('Doctor schedule slot not found');
    }
};

export const updateDoctorScheduleSlot = async (id: number, updateData: { available?: boolean; maxPatients?: number }) => {
    try {
        const updatedSlot = await prisma.doctorScheduleSlot.update({
            where: { id },
            data: updateData,
        });
        return updatedSlot;
    } catch (error) {
        throw new Error('Error updating doctor schedule slot');
    }
};

export const deleteDoctorScheduleSlot = async (id: number) => {
    try {
        await prisma.doctorScheduleSlot.delete({
            where: { id },
        });
        return { message: 'Doctor schedule slot deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting doctor schedule slot');
    }
};