import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, {Request, Response} from "express";
import http from "http"; 
import { Server as SocketIOServer } from "socket.io";
import { onlineUsers } from './socket';

import mongoose from "mongoose";
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import notificationRoutes from './routes/notificationRoutes';
import messagesRoutes from './routes/messagesRoutes';

const app = express();
const server = http.createServer(app); 

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5050;
const MONGOURL = process.env.MONGODB_URL;

mongoose.connect(MONGOURL!).then(() => {
    console.log('Database Is Working');
}).catch(err => {
    console.log(`Mongodb connection error ${err}`)
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messagesRoutes);

const io = new SocketIOServer(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("joinRoom", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} joined room ${conversationId}`);
    });

    socket.on("typing", ({ conversationId, senderId, receiverId }) => {
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("typing", { conversationId, senderId });
        }
      });

      
    
    socket.on("sendMessage", (data) => {
        io.to(data.conversationId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
    });
});


server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export { io };
export default app;
