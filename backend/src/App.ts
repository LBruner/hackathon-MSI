import path from "path";
import * as dotenv from "dotenv";

const envPath = path.join(__filename, '..', '..', '..', '.env');
dotenv.config({path: envPath});
import cors from 'cors';
import express from 'express';
import employeeRoutes from "./routes/employeeRoutes";
import constructionsRoutes from "./routes/constructionsRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/constructions', constructionsRoutes);
app.use('/employees', employeeRoutes);

export default app;