import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import UserRouter from './Routes/UserRoutes.js';
import connectDB from './configs/db.js';
import ResumeRouter from './Routes/ResumeRoutes.js';
import OpenAIRoutes from './Routes/AiRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("Server is Live..."));
app.use('/api/users', UserRouter);
app.use('/api/resumes', ResumeRouter);
app.use('/api/openai', OpenAIRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));