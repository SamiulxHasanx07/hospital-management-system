import { Appointment, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAppointment = async (data: Omit<Appointment, 'id'>) => {
    return await prisma.appointment.create({ data });
};

export const getAllAppointments = async () => {
    return await prisma.appointment.findMany({
        include: {
            doctor: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true
                        },
                    },
                },
            },
            patient: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true
                        },
                    },
                },
            },
        },
    });
};
export const getAppointmentById = async (id: number) => {
    return await prisma.appointment.findUnique({
        where: { id },
        include: {
            doctor: true,
            patient: true,
        },
    });
};

export const updateAppointment = async (
    id: number,
    data: Partial<Omit<Appointment, 'id'>>
) => {
    if (data.doctorId) {
        const doctorExists = await prisma.doctor.findUnique({
            where: { id: data.doctorId },
        });

        if (!doctorExists) {
            throw new Error(`Doctor with ID ${data.doctorId} does not exist`);
        }
    }

    return await prisma.appointment.update({
        where: { id },
        data,
    });
};

export const deleteAppointment = async (id: number) => {
    return await prisma.appointment.delete({
        where: { id },
    });
};