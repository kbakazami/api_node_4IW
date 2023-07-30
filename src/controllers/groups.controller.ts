import {
    getAllGroups,
    createGroup,
    additionalAmount,
    reducedAmount,
    deleteGroup,
    getGroupPerName
} from "../queries/groups.queries";
import { Request, Response, NextFunction } from "express";

export const groupList = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch(e) {
        next(e);
    }
}

export const groupGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupName = String(req.params.groupName);
        const user = await getGroupPerName(groupName);
        res.json(user);
    } catch (e) {
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

export const groupAdditionalAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const groupName = String(req.params.groupName);
        await additionalAmount(groupName, body.amount);
        res.json({ message: "Added additionnal amount" });
    } catch (e) {
        next(e);
    }
}

export const groupReducedAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const groupName = String(req.params.groupName);
        await reducedAmount(groupName, body.amount);
        res.json({ message: "Reduced amount" });
    } catch (e) {
        next(e);
    }
}

export const groupDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupName = String(req.params.groupName);
        await deleteGroup(groupName);
        res.json({ message: "Group successfully deleted"});
    } catch (e) {
        next(e);
    }
}
