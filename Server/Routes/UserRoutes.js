import express from 'express';
import { registerUser, loginUser, getUserProfile, getUserResumes } from '../Controllers/UserController.js';
import protect from '../middlewares/AuthMiddleware.js';
import User from '../models/User.js';
const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/data', protect, getUserProfile);
UserRouter.get('/resumes', protect, getUserResumes);

export default UserRouter;