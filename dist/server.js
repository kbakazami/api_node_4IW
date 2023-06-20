"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express();
        app.get('/', (req, res) => {
            res.send("Bonjour test");
        });
        app.listen(this.port, () => {
            console.log('Serveur Start');
        });
    }
}
exports.default = Server;
