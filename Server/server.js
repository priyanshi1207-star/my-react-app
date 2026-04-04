import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import UserRouter from './Routes/UserRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

/** Database Connection */
import connectDB from './configs/db';
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Server is Live..."));

/** Routes */
app.use('/api/users', UserRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
