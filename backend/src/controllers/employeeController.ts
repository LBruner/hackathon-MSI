import query from "../models/db/dbConnection";
import {RequestHandler} from "express";

export const getAllEmployees: RequestHandler = async (req, res
) => {
    const employees = await query(`SELECT *
                                   from functionaries` as any);
    res.send(employees);
}

export const getEmployeesByConstruction: RequestHandler = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    const results = await query(`SELECT DISTINCT functionaries.id,
                                                 functionaries.name,
                                                 functionaries.position,
                                                 functionaries.photo_uri
                                 from functionaries
                                          join construtora.functionariesConstructions
                                               on functionaries.id = functionariesConstructions.functionaryId
                                          join construtora.constructions c
                                               on functionariesConstructions.constructionId = c.id
                                 where constructionId = "${id}"constructions
    ` as any);
    console.log(results)
    res.send(results)
}

export const getEmployeesByPeriod: RequestHandler = async (req, res) => {
    const {id: constructionId, period} = req.params;

    // @ts-ignore
    const markedEmployees: Employees[] = await query(
        `SELECT functionaries.id,
                functionaries.name,
                functionaries.position,
                functionaries.photo_uri
         FROM functionaries
                  INNER JOIN construtora.functionariesConstructions
                             ON functionaries.id = functionariesConstructions.functionaryId
                  INNER JOIN construtora.calls AS c
                             ON functionaries.id = c.employeeId
                  INNER JOIN construtora.constructions c2
                             ON functionariesConstructions.constructionId = c2.id
         WHERE c.periodo = '${period}'
           AND c2.id = ${constructionId}
        ` as any);

    const unmarkedEmployees = await query(`SELECT functionaries.id,
                                                  functionaries.name,
                                                  functionaries.position,
                                                  functionaries.photo_uri
                                           FROM functionaries
                                                    JOIN construtora.functionariesConstructions
                                                         ON functionaries.id = functionariesConstructions.functionaryId
                                                    JOIN construtora.constructions c2
                                                         ON functionariesConstructions.constructionId = c2.id
                                                    LEFT JOIN construtora.calls AS c
                                                              ON functionaries.id = c.employeeId
                                                                  AND c.periodo = "${period}"
                                           WHERE c2.id = ${constructionId}
                                             AND c.employeeId IS NULL;` as any);

    res.send({
        log: {
            markedEmployees,
            unmarkedEmployees
        }
    });
}

export const addEmployee: RequestHandler = async (req, res) => {
    const {name, functionName, zipCode, birthDate, photoURI} = req.body;
    console.log(req.body)
    await query(`INSERT INTO functionaries(name, position, zip_code, birth_date, photo_uri) VALUE ("${name}",
                                                                                                   "${functionName}",
                                                                                                   "${zipCode}",
                                                                                                   "${birthDate}",
                                                                                                   "${photoURI}")` as any);

    res.send(200);
}

export const registerEmployeeCall: RequestHandler = async (req, res) => {
    const {markedEmployees, date, constructionId, period} = req.body;

    console.log(req.body)
    for (const user of markedEmployees) {
        await query(`insert into calls (date, constructionId, employeeId, periodo) value ("${date}", "${constructionId}", "${user.id}", "${period}")` as any)
    }
}