import { getAllGroups, createGroup } from "../queries/groups.queries";
import { Request, Response, NextFunction } from "express";

export const groupList = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch(e) {
        next(e);
    }
}

export const groupCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        await createGroup(body);
        res.json({ message: "Group created" });
    } catch(e) {
        next(e);
    }
}