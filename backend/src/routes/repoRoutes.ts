import { Router } from "express";
import { createRepo, getMyRepos, getRepos } from "../controllers/repoController";
import { authenticate } from "../modules/auth/auth.middleware";


const router = Router();

router.post('/create', authenticate, createRepo);  // create repo
router.get('/myrepos', authenticate, getMyRepos);  // get own repo
router.get('/:username/repos', getRepos); // get other users repo

export default router;