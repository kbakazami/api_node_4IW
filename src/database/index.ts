import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.URI_DB as string;

export const clientPromise = mongoose
    .connect(uri)
    .then((m) => m.connection.getClient())
    .catch((err) => console.log(err));