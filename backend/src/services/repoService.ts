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

export const getRepo = async(userId:string)=>{

    const repos = await prisma.repository.findMany({
        where:{
            ownerId:userId
        }
    });


    if(!repos) throw new Error("No Repos found");

    return repos;

}

export const getOtherUserRepo = async(username:string)=>{
    const repos = await prisma.repository.findMany({
        where:{
            owner:{
                username:username,
            
            },
            visibility:"public",
        },

    });

    if(!repos) throw Error("no repos found");
    return repos;
}