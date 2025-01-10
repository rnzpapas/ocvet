import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from "./config/db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async(req,res) => {
    // res.send("HELLO WORLD!")
    const result = await pool.query("SELECT current_database()");
    res.send(`Database name is ${result}`);
});



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});