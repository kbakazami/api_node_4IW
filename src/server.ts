import {Request, Response} from "express";

const express = require('express');
export default class Server {
    readonly port

    constructor(port: number) {
        this.port = port;
    }

    start () {
        const app = express()
        app.get('/', (req: Request, res: Response) => {
            res.send("Bonjour test");
        })

        app.listen(this.port, () => {
            console.log('Serveur Start');
        })
    }
}