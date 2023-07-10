import {Request, Response} from "express";
import SwaggerUi from "swagger-ui-express";
import options from "../config/swagger";

const express = require('express');

export default class Server {
    readonly port

    constructor(port: number) {
        this.port = port;
    }

    start () {

        const app = express();

        // Middleware
        app.use(express.json());
        app.use('/docs', SwaggerUi.serve);
        app.get('/docs', SwaggerUi.setup(options));

        app.get('/', (req: Request, res: Response) => {
            res.send("Bonjour test");
        })

        app.listen(this.port, () => {
            console.log('Serveur Start on localhost:' + this.port);
        })
    }
}