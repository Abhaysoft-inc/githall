import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './modules/user/user.routes'
import repoRoutes from './modules/repos/repos.route'
import authRoutes from './modules/auth/auth.routes'


const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/repo', repoRoutes);

export default app;
