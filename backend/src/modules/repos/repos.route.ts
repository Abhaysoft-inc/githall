import { Router } from "express";
import { createRepo, getMyRepos, getRepos } from "./repos.controller";
import { authenticate } from "../auth/auth.middleware";


const router = Router();

router.post('/create', authenticate, createRepo);  // create repo
router.get('/myrepos', authenticate, getMyRepos);  // get own repo
router.get('/:username/repos', getRepos); // get other users repo

export default router;