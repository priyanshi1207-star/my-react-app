import express from 'express';
// Change getPublicResumeById to getResumeByIdPublic
import { createResume, deleteResume, getResumeById, getResumeByIdPublic, updateResume } from '../Controllers/ResumeController.js';
import protect from '../middlewares/AuthMiddleware.js';
import upload from '../configs/Multer.js';

const ResumeRouter = express.Router();

ResumeRouter.post('/create', protect, createResume); // Added protect here too
ResumeRouter.delete('/delete/:id', protect, deleteResume);
ResumeRouter.get('/get/:id', getResumeById);
// Update the function name here
ResumeRouter.get('/public/:id', getResumeByIdPublic);
ResumeRouter.put('/update/:id', upload.single('image'), protect, updateResume);

export default ResumeRouter;