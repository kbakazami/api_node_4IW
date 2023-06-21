"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../config/swagger"));
require("dotenv/config");
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express();
        console.log(process.env.PORT);
        // Middleware
        app.use(express.json());
        app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        app.get('/', (req, res) => {
            res.send("Bonjour test");
        });
        app.listen(this.port, () => {
            console.log('Serveur Start on localhost:' + this.port);
        });
    }
}
exports.default = Server;
