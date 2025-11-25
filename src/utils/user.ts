import prisma from "../../lib/prisma";


export async function getUserFromDb(email: string) {
    return prisma.user.findFirst({
        where: {
            email
        }
    });
}