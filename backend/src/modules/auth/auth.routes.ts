import { Router } from "express";
import { register, login } from "./auth.controller";
const router = Router();

// Register

router.post('/register', register);

// login
router.post('/login', login);