import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import animalTypesRoutes from './routes/animalTypesRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import vaccineRoutes from './routes/vaccineRoutes.js'
import diagnosisRoutes from './routes/diagnosisRoutes.js'
import errorHandling from './middleware/errorHandler.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", userRoutes);
app.use("/api", animalTypesRoutes);
app.use("/api", serviceRoutes);
app.use("/api", vaccineRoutes);
app.use("/api", diagnosisRoutes);


app.get("/", async(req,res) => {
    console.log("it is working")
});


app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});