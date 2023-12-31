import * as http from "http";
import app from "./App";
import {setDB} from "./models/db/dbCreate";

const PORT = 8080;

const server = http.createServer(app);
const startServer = async () => {
    await setDB();
    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}...`);
    })
}

startServer()