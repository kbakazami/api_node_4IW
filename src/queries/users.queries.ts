import { IUser, UserForm } from "../interfaces";
import { User } from "../database/models/user.model";

export const getAllUsers = (): Promise<IUser[]> => {
    return User.find();
};

export const findUserPerUsername = (username: string) => {
    return User.findOne({'local.username': username}).exec();
}

export const findUserPerId = (id: string) => {
    return User.findById({_id: id}).exec();
}

export const createUser = async (user: UserForm) => {
    try {
        // @ts-ignore
        const hashedPassword = await User.hashPassword(user.password);
        const newUser= new User({
            local: {
                username: user.username,
                password: hashedPassword
            }
        });
        return newUser.save();
    }catch (e){
        throw new Error('Error creating user');
    }
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