import path from "path";
import * as dotenv from "dotenv";

const envPath = path.join(__filename, '..', '..', '..', '.env');
dotenv.config({path: envPath});
// import autoCompleteRouter from "./routes/autocomplete/autoCompleteRouter.js";
import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

console.log("Oi")
// app.use('/weather', weatherRouter);
// app.use('/autocomplete', autoCompleteRouter);

export default app;