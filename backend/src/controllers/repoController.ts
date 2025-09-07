import { Request, Response } from "express";
import { createRepository, getOtherUserRepo, getRepo } from "../services/repoService";
import { AuthRequest } from "../middleware/authMiddleware";
import { CreateRepoInput } from "../types/repo";


// create repo
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


// get repos of logged in user
export const getMyRepos = async(req:AuthRequest, res:Response)=>{
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ error: "Unauthorised" });

        const repos = await getRepo(userId);
        if(!repos) return res.status(404).json({
            error:"no repo found"
        });

        res.status(200).json({
            msg:"repos found",
            repos
        })
        
        

    } catch (error) {
        res.status(500).send(error)
    }

}
  
//  get repos of other user (public repo only);

export const getRepos = async(req:AuthRequest, res:Response) =>{
    const username = req.params.username;

    try {
        const repos = await getOtherUserRepo(username);

        if(!repos) return res.status(404).json({error:"no repo found"});
        return res.status(200).json({
            repos
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

