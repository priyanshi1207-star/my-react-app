import express from "express";
import protect from "../middlewares/AuthMiddleware.js";
import { enhanceProfessionalSummary, enhanceJobDescriptions, uploadResume } from "../Controllers/AiController.js";


const AiRouter = express.Router();
AiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
AiRouter.post('/enhance-job-desc', protect, enhanceJobDescriptions);
AiRouter.post('/upload-resume', protect, uploadResume);

export default AiRouter;
