import express from 'express';
// Ensure these match the physical file names exactly
import { registerUser, loginUser, getUserProfile } from '../Controllers/UserController';
import protect from '../middlewares/AuthMiddleware';
import { getUserResumes } from '../Controllers/UserController';

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/data', protect, getUserProfile);
UserRouter.get('/resumes', protect, getUserResumes);

export default UserRouter;