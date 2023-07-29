import express, {Application, urlencoded} from 'express';
import dotenv from 'dotenv';
import './database';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

app.listen(process.env.PORT, () => {
    console.log("Server start")
})