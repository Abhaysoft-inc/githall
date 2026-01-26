import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import { RegisterInput, LoginInput } from './auth.types';

// adding validation

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as RegisterInput;

        const user = await registerUser(username, email, password);

        return res.status(201).json({ user });


    } catch (error) {
        console.log({ error: (error as Error).message });

        return res.status(500).json({ error: "something went wrong" });
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