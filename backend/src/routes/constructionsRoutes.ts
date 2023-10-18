import * as express from "express";
import {addConstruction, getAllConstructions} from "../controllers/constructionsController";

const router = express.Router();

router
    .get('/', getAllConstructions)
    .post('/', addConstruction)
export default router;