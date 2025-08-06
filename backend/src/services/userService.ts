import { PrismaClient } from '../generated/prisma'
import { hashPassword, comparePasswords } from '../utils/hash'
import { generateToken } from '../utils/jwt';
const prisma = new PrismaClient();

// register user

export const registerUser = async (username: string, email: string, password: string) => {

    // find existing user

    const existing = await prisma.user.findUnique({
        where: { email }
    });

    if (existing) throw new Error("Email already exists");

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashed
        },
    });

    return user;

};

// login user

export const loginUser = async (username: string, password: string) => {
    // find user

    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) throw new Error("username or password is incorrect");

    const checkPassword = await comparePasswords(password, user.password);
    if (!checkPassword) throw new Error("username or password is incorrect");

    const token = generateToken(user.id);
    return { user, token };

}