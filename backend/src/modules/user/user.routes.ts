import { Router } from "express";
import { authenticate } from '../auth/auth.middleware';
import { myProfile } from './user.controller'
const router = Router();


router.get("/my-profile", authenticate, myProfile);

export default router;