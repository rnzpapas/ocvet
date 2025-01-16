import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import errorHandling from './middleware/errorHandler.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", userRoutes);
app.use(errorHandling);

app.get("/", async(req,res) => {
    console.log("it is working")
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});