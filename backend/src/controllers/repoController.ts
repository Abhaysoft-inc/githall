import { Request, Response } from "express";
import { createRepository } from "../services/repoService";
import { AuthRequest } from "../middleware/authMiddleware";
import { CreateRepoInput } from "../types/repo";

export const createRepo = async (req: AuthRequest, res: Response) => {
    try {
        const { reponame, description, visibility, license } = req.body as CreateRepoInput;
        const userId = req.userId;

        if (!userId) return res.status(401).json({ error: "Unauthorised" });

        const repo = await createRepository(reponame, description, visibility, license, userId);

        res.status(201).json(repo);


    } catch (error) {
        res.status(400).json({
            error: (error as Error).message
        });

    }
}