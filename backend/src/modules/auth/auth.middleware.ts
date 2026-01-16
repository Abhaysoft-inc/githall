import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;


export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Not authorised"
            });
        }

        const token = authHeader.split(' ')[1];


        const decoded = await jwt.verify(token, JWT_SECRET) as { userId: string };
        console.log("decoded", decoded);
        req.userId = decoded.userId;
        console.log(req.userId);
        next();
    } catch (err) {
        console.log("err", err);
        return res.status(401).json({
            message: 'Not authorised',
        });
    }
}