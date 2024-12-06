import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getUser(userId: number) {

    prisma.user.findUnique({
        where: {
            id: userId
        }
    });

}