import cookieParser from "cookie-parser";
import express from 'express';
import cors from 'cors';
import eventRouter from './routes/eventRouter.js'

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CORS
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

//routes
app.use("/api/v1/events", eventRouter)

export {app};