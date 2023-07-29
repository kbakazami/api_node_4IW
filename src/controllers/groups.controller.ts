import {getAllGroups, createGroup, additionalAmount, reducedAmount, deleteGroup} from "../queries/groups.queries";
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

export const groupAdditionalAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        await additionalAmount(body.name, body.amount);
        res.json({ message: "Added additionnal amount" });
    } catch (e) {
        next(e);
    }
}

export const groupReducedAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        await reducedAmount(body.name, body.amount);
        res.json({ message: "Reduced amount" });
    } catch (e) {
        next(e);
    }
}

export const groupDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        await deleteGroup(body.name);
        res.json({ message: "Group successfully deleted"});
    } catch (e) {
        next(e);
    }
}
