import express from 'express';
import {
    createResume,
    deleteResume,
    getResumeById,
    getResumeByIdPublic,
    updateResume
} from '../Controllers/ResumeController.js';
import { uploadResume } from '../Controllers/AiController.js';
import protect from '../middlewares/AuthMiddleware.js';
import upload from '../configs/Multer.js';

const ResumeRouter = express.Router();

// Protected Routes (Require Auth)
ResumeRouter.post('/create', protect, createResume);
ResumeRouter.post('/upload', protect, uploadResume);
ResumeRouter.delete('/delete/:id', protect, deleteResume);
ResumeRouter.put('/update/:id', upload.single('image'), protect, updateResume);

// Public or ID-based Routes
ResumeRouter.get('/get/:id', getResumeById);
ResumeRouter.get('/public/:id', getResumeByIdPublic);

export default ResumeRouter;