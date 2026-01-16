import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { AuthRequest } from '../auth/auth.middleware';

const prisma = new PrismaClient();

export const myProfile = async (req: AuthRequest, res: Response) => {

    const userId = req.userId;

    // check if this is 

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    return res.status(200).json({
        user
    });

}