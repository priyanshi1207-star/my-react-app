import express from 'express';
// Ensure these match the physical file names exactly
import { registerUser, loginUser, getUserProfile } from '../Controllers/UserController';
import protect from '../middlewares/AuthMiddleware';

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);

// Use 'protect' to ensure the user is logged in before fetching profile
UserRouter.get('/data', protect, getUserProfile);

export default UserRouter;