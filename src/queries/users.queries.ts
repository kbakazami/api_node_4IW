import {IUser} from "../interfaces";
import {User} from "../database/models/user.model";

export const getAllUsers = (): Promise<IUser[]> => {
    return User.find();
};

export const findUserPerUsername = (username: string) => {
    return User.findOne({username}).exec();
}

export const createUser = (user: IUser) => {
    const newUser = new User(user);
    return newUser.save();
}

export const editUserGroup = (username: String, group: String) => {
    const filter = { username: username };

    const update = { group: group };

    return User.updateOne(filter, update);
}

export const deleteUser = (username: String) => {
    const filter = { username: username };

    return User.deleteOne(filter);
}