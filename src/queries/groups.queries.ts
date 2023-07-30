import { IGroup } from "../interfaces";
import { Group } from "../database/models/group.model";

export const getAllGroups = (): Promise<IGroup[]> => {
    return Group.find();
}

export const getGroupPerName = (name: String) => {
    const filter = { name: name };
    return Group.findOne(filter);
}

export const createGroup = (group: IGroup) => {
    const newGroup = new Group(group);
    return newGroup.save();
}

export const additionalAmount = (name: String, amount: Number) => {
    const filter = { name: name};

    const pipeline = [{
        $set: {
            amount: { $sum: ["$amount", amount] }
        }
    }];

    return Group.updateOne(filter, pipeline);
}

export const reducedAmount = (name: String, amount: Number) => {
    const filter = { name: name };

    const pipeline = {
        $inc: { amount: - amount }
    }

    return Group.updateOne(filter, pipeline);
}

export const deleteGroup = (name: String) => {
    const filter = { name: name };

    return Group.deleteOne(filter);
}