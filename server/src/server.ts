import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import express, {Request, Response} from "express";

import mongoose from "mongoose";
import  userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
import commentRoutes from './routes/commentRoutes'

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5050;
const MONGOURL = process.env.MONGODB_URL;



mongoose.connect(MONGOURL!).then(() => 
{
    console.log('Database Is Working');
}).catch(err => {
console.log(`Mongodb connection error ${err}`)
});




app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

app.use('/api/users', userRoutes );
app.use('/api/auth', authRoutes);
app.use('api/post', postRoutes);
app.use('api/comment', commentRoutes )



app.listen (port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;