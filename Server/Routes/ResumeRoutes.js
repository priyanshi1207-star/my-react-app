import express from 'express';
import { createResume, deleteResume, getResumeById, getPublicResumeById, updateResume } from '../Controllers/ResumeController.js';
import protect from '../middlewares/AuthMiddleware.js';
import upload from '../configs/Multer.js';
const ResumeRouter = express.Router();


ResumeRouter.post('/create', createResume);
ResumeRouter.delete('/delete/:id', protect, deleteResume);
ResumeRouter.get('/get/:id', getResumeById);
ResumeRouter.get('/public/:id', getPublicResumeById);
ResumeRouter.put('/update/:id', upload.single('image'), protect, updateResume);

export default ResumeRouter;