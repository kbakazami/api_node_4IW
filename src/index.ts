import Server from "./server";
import express, {Router} from "express";
import "dotenv/config"
import db from "../config/db";

const app = express();

// @ts-ignore
const server = new Server(process.env.PORT);
// @ts-ignore
const database = new db(process.env.URI_DB);

database.run();
server.start();