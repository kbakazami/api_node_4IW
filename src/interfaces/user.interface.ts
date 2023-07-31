import { Document } from 'mongoose';

export interface IUserLocal {
    username: string;
    password: string;
}

export interface IUser extends Document {
    local: IUserLocal;
    group?: string[];
    comparePassword: (
        password: string,
        hashedPassword: string
    ) => Promise<boolean>;
}

export interface UserForm {
    username: string;
    password: string;
}
