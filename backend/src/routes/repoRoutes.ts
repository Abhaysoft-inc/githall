import { Router } from "express";
import { createRepo, getMyRepos, getRepos } from "../controllers/repoController";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.post('/create', protect, createRepo);  // create repo
router.get('/myrepos', protect, getMyRepos);  // get own repo
router.get('/:username/repos', getRepos); // get other users repo

export default router;