import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createSchedule = async (data: any) => {
  return prisma.doctorSchedule.create({ data });
};

export const getAllSchedules = async () => {
  return prisma.doctorSchedule.findMany();
};

export const getScheduleById = async (id: number) => {
  return prisma.doctorSchedule.findUnique({ where: { id } });
};

export const deleteScheduleById = async (id: number) => {
  return prisma.doctorSchedule.delete({ where: { id } });
};
