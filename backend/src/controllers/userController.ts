import { Request, Response } from 'express';
import { LoginInput, RegisterInput } from '../types/auth';
import { loginUser, registerUser } from '../services/userService'


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as RegisterInput;

        const user = await registerUser(username, email, password);

        res.status(201).json({ user });


    } catch (error) {
        res.status(400).json({ error: (error as Error).message });

    };
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as LoginInput;
        const user = await loginUser(username, password);
        res.status(201).json({ user });

    } catch (error) {

        res.status(401).json({ error: (error as Error).message });

    }
}