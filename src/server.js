import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import connectDB from './config/connectDb';
import cors from 'cors';
require('dotenv').config();

let app = express();
app.use(cors({
    origin: true
    // origin: 'http://localhost:3000',
    // credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("BackEnd Nodejs is running on the port : " + port)
});