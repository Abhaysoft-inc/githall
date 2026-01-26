import { Request, Response } from "express";
import { createRepository, getOtherUserRepo, getRepo } from "./repo.service";
import { AuthRequest } from "../auth/auth.middleware";
import { CreateRepoInput } from "./repo.types";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();


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
export const getMyRepos = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ error: "Unauthorised" });

        const repos = await getRepo(userId);
        if (!repos) return res.status(404).json({
            error: "no repo found"
        });

        res.status(200).json({
            msg: "repos found",
            repos
        })



    } catch (error) {
        res.status(500).send(error)
    }

}

//  get repos of other user (public repo only);

export const getRepos = async (req: AuthRequest, res: Response) => {
    const username = req.params.username;

    try {
        const repos = await getOtherUserRepo(username);

        if (!repos) return res.status(404).json({ error: "no repo found" });
        return res.status(200).json({
            repos
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

// view repo

export const viewRepo = async (req: Request, res: Response) => {
    try {
        const { username, repoName } = req.params;

        const repo = await prisma.repository.findFirst({
            where: {
                owner: {
                    username: username,
                },
                reponame: repoName,
                visibility: "public"

            }
        });

        return res.status(200).json({
            repo
        })

        // if (!repo) return res.status(404).json({
        //     error: "repo not found",
        // });

        // return res.status(200).json({
        //     repo
        // })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "something went wrong"
        });

    }

}


// view files and folders of a repo

// export const getRepoFiles = async (req, res) => {
//     const { username, repoName, folderPath = "" } = req.params;
//     // need to call git ls-tree HEAD in the git-server to show alls the files here in response



// }

