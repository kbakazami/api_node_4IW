import { Document } from 'mongoose';

export interface IUserLocal {
    email: string;
    password: string;
}

export interface IUser extends Document {
    username: string;
    local: IUserLocal;
    group?: string[];
    comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<boolean>;
}
