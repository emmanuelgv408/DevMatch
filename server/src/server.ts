import dotenv from 'dotenv';
dotenv.config();


import express, {Request, Response} from "express";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 5000;
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


app.listen (port, () => {
    console.log(`Server is running on port: ${port}`);
});