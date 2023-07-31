import express, {Application, urlencoded} from 'express';
import dotenv from 'dotenv';
import index from './routes';
import './database';
import winston, {createLogger, Logger, transports} from "winston";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

dotenv.config();

export const app: Application = express();

app.use(cookieParser());
import './config/jwt.config';



const { combine, timestamp, json, printf } = winston.format;
export const logger: Logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
        printf((info) => `[${info.timestamp}] - [${info.level}] - Message : ${info.message} - Error : ${info.error}`)),
    transports: [
        new transports.File({
            dirname: "logs",
            filename: 'error.log',
            level: 'error',
        }),
    ],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(index);

app.listen(process.env.PORT, () => {
    console.log("Server start")
})