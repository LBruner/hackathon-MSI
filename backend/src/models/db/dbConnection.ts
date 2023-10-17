import * as process from "process";

import mysql from 'mysql2';
import * as util from "util";

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

const query = util.promisify(connection.query).bind(connection);

export default query;

