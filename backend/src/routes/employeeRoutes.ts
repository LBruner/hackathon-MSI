import * as express from "express";
import {
    addEmployee,
    getAllEmployees,
    getEmployeesByConstruction, getEmployeesByPeriod,
    registerEmployeeCall
} from "../controllers/employeeController";

const router = express.Router();

router
    .get('/', getAllEmployees)
    .get('/:id', getEmployeesByConstruction)
    .get('/:id/:period', getEmployeesByPeriod)
    .post('/', addEmployee)
    .post('/register', registerEmployeeCall)
export default router;