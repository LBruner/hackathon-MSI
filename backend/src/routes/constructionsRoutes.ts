import * as express from "express";
import {addConstruction, getAllBuldings} from "../controllers/constructionsController";

const router = express.Router();

router
    .get('/', getAllBuldings)
    .post('/', addConstruction)
export default router;