import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
