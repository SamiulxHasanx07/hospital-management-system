import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createContact = async (data: any) => {
    return await prisma.contact.create({ data });
};

export const getContactByUserId = async (userId: number) => {
    return await prisma.contact.findUnique({ where: { userId } });
};

export const updateContact = async (userId: number, data: any) => {
    return await prisma.contact.update({
        where: { userId },
        data,
    });
};

export const deleteContact = async (userId: number) => {
    return await prisma.contact.delete({
        where: { userId },
    });
};
