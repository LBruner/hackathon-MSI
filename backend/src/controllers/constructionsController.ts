import query from "../models/db/dbConnection";
import {RequestHandler} from "express";

export interface Employee {
    id: string,
    name: string,
    photo_uri: string,
    position: string,
}

export const getAllConstructions: RequestHandler = async (req, res) => {
    console.log("OIOI")
    const results = await query(`SELECT *
                                 FROM constructions` as any);
    res.send(results).status(200);
}

export const addConstruction: RequestHandler = async (req, res) => {
    const {name, photo_uri, start_date, employees_to_add} = req.body;
    console.log(req.body)
    const results = await query(`INSERT INTO constructions(name, photo_uri, start_date) VALUE ("${name}", "${photo_uri}", "${start_date}")` as any);
    // @ts-ignore
    const insertId = results.insertId;

    for (const employee of employees_to_add) {
        await query(`INSERT INTO functionariesConstructions (functionaryId, constructionId) VALUE ("${employee.id}", "${insertId}")` as any);
    }

    res.send(200);
}