import { Document } from "mongoose";

export interface IGroup extends Document {
    name: string;
    amount: number;
}