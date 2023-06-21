"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = __importDefault(require("../config/db"));
const app = (0, express_1.default)();
// @ts-ignore
const server = new server_1.default(process.env.PORT);
// @ts-ignore
const database = new db_1.default(process.env.URI_DB);
database.run();
server.start();
