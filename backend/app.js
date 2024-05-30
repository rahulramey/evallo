import cookieParser from "cookie-parser";
import express from 'express';
import cors from 'cors';

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

export {app};