import { IGroup } from "../interfaces";
import { Group } from "../database/models/group.model";

export const getAllGroups = (): Promise<IGroup[]> => {
    return Group.find();
}

export const createGroup = (group: IGroup) => {
    const newGroup = new Group(group);
    return newGroup.save();
}