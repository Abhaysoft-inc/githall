import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

// creating repo

export const createRepository = async (reponame: string, description: string, visibility: string, license: string, userId: string) => {

    // check if user has the same repo name

    const checkExistingRepo = await prisma.repository.findFirst({
        where: {
            reponame: reponame,
            ownerId: userId,
        }
    });

    if (checkExistingRepo) throw new Error(`repo ${reponame} already exists!`);

    // Get user information to send to git server
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw new Error("User not found");

    // Send request to the git server to create repo

    const gitServerResponse = await fetch('http://localhost:8080/repos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user.username,
            repo: reponame
        })
    });

    if (!gitServerResponse.ok) {
        const error = await gitServerResponse.json();
        throw new Error(`Failed to create git repository: ${error.error || 'Unknown error'}`);
    }

    const repo = await prisma.repository.create({
        data: {
            reponame,
            description,
            visibility,
            license,
            ownerId: userId
        }
    });

    return repo;





}




export const getRepo = async (userId: string) => {

    const repos = await prisma.repository.findMany({
        where: {
            ownerId: userId
        }
    });


    if (!repos) throw new Error("No Repos found");

    return repos;

}

export const getOtherUserRepo = async (username: string) => {
    const repos = await prisma.repository.findMany({
        where: {
            owner: {
                username: username,

            },
            visibility: "public",
        },

    });

    if (!repos) throw Error("no repos found");
    return repos;
}