import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import UserRouter from './Routes/UserRoutes.js'; // Ensure .js
import connectDB from './configs/db.js'; // Ensure .js
import ResumeRouter from './Routes/ResumeRoutes.js'; // Ensure .js

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Server is Live..."));
app.use('/api/users', UserRouter);
app.use('/api/resumes', ResumeRouter); ``

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));