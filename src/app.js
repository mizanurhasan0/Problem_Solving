import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./module/auth/auth.route.js";
import "./config/passport.js"
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/', router);
export default app;

