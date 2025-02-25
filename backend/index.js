import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import animalTypesRoutes from './routes/animalTypesRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import mailGroupsRoutes from './routes/mailGroupsRoutes.js';
import petsRoutes from './routes/petsRoutes.js';
import appointmentScheduleRoutes from './routes/appointmentScheduleRoutes.js';
import animalGroupRoutes from './routes/animalGroupRoutes.js';
import vaccinationsRoutes from './routes/vaccinationsRoutes.js';
import announcementsRouter from './routes/announcementsRouter.js';
import errorHandling from './middleware/errorHandler.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    exposedHeaders: ['Content-Disposition']
  }));


app.use("/api", userRoutes);
app.use("/api", animalTypesRoutes);
app.use("/api", serviceRoutes);
app.use("/api", vaccineRoutes);
app.use("/api", diagnosisRoutes);
app.use("/api", mailGroupsRoutes);
app.use("/api", petsRoutes);
app.use("/api", appointmentScheduleRoutes);
app.use("/api", animalGroupRoutes);
app.use("/api", vaccinationsRoutes);
app.use("/api", announcementsRouter);

app.get("/", async(req,res) => {
    console.log("it is working")
    res.send("Backend is working!");
});

app.use(errorHandling);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port: ${PORT}`);
});