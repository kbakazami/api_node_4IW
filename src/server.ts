import {Request, Response} from "express";
const express = require('express');
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger";
import "dotenv/config"

export default class Server {
    readonly port

    constructor(port: number) {
        this.port = port;
    }

    start () {

        const app = express();
        console.log(process.env.PORT);

        // Middleware
        app.use(express.json());
        app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

        app.get('/', (req: Request, res: Response) => {
            res.send("Bonjour test");
        })

        app.listen(this.port, () => {
            console.log('Serveur Start on localhost:' + this.port);
        })
    }
}