const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const addBedService = async (data: any) => {
    return await prisma.bed.create({ data });
};

export const addBedsService = async (beds: any) => {
    return await prisma.bed.createMany({ data: beds });
};

export const getAllBedsService = async () => {
    return await prisma.bed.findMany({ orderBy: { id: 'asc' } });

}