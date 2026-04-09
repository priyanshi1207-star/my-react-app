import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import UserRouter from './Routes/UserRoutes.js';
import connectDB from './configs/db.js';
import ResumeRouter from './Routes/ResumeRoutes.js';
import OpenAIRoutes from './Routes/AiRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Debug environment variables
console.log('Environment check:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('LOCAL_MONGODB_URI exists:', !!process.env.LOCAL_MONGODB_URI);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('Working directory:', process.cwd());
console.log('Env file path:', path.join(__dirname, '.env'));

const startServer = async () => {
    try {
        await connectDB();

        // Middleware
        app.use(cors());
        app.use(express.json());

        // Routes
        app.get('/', (req, res) => res.send("Server is Live..."));
        app.use('/api/users', UserRouter);
        app.use('/api/resumes', ResumeRouter);
        app.use('/api/openai', OpenAIRoutes);

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();