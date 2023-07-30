import express, {Application, urlencoded} from 'express';
import dotenv from 'dotenv';
import index from './routes';
import './database';
import winston, {createLogger, Logger, transports} from "winston";

dotenv.config();

const app: Application = express();

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

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(index);

app.listen(process.env.PORT, () => {
    console.log("Server start")
})