import { Router } from "express";
import { createRepo } from "../controllers/repoController";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.post('/create', protect, createRepo);


export default router;