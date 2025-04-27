import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import authRoutes from './routes/auth.route.js';
import { connectDB } from "./lib/db.js";
import postRoutes from "./routes/post.route.js";
import messageRoutes from "./routes/message.route.js";  
//app aur server ko import kia tha but ab hata dia h
import {initializeSocket} from './lib/socket.js';

dotenv.config();
const PORT=process.env.PORT;

const app = express(); //1
const server = http.createServer(app);  //2
initializeSocket(server); // 4

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],  
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Server is running");
})
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/messages",messageRoutes);




server.listen(PORT, () => {    
    console.log('Server is running on PORT:' + PORT);
    initializeSocket(server); // 4
    connectDB();
});


