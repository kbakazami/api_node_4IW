import {IUser} from "../interfaces";
import {User} from "../database/models/user.model";

export const getAllUsers = (): Promise<IUser[]> => {
    return User.find();
};

export const findUserPerUsername = (username: string) => {
    return User.findOne({username}).exec();
}

