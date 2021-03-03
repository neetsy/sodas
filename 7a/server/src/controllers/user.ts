import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Creates a user
 * @param {string} firstName the user's first name
 * @param {string} lastName the user's last name
 * @param {string} email the user's email address
 * @param {string} password unhashed password
 * @returns {Promise<user>}
 */
export const createUser = async (firstName: string, lastName: string, email: string, password: string): Promise<User | boolean> => {
    if (await prisma.user.findUnique({where: { email } })) {
        return false;
    }
    const user = await prisma.user.create({
        data: {
            email,
            password,
            firstName,
            lastName
        }
    });

    return user;
};