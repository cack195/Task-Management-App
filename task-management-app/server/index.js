import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('MongoDB database connection has been established successfully!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

import userRoutes from './routes/users.js'
import TasksRoutes from './routes/Tasks.js'

app.use('/users', userRoutes)
app.use('/Tasks', TasksRoutes)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
