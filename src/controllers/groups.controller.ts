import {
    getAllGroups,
    createGroup,
    additionalAmount,
    reducedAmount,
    deleteGroup,
    getGroupPerName
} from "../queries/groups.queries";
import {Request, Response, NextFunction} from "express";
import { logger } from "../index";
import {check, Result, validationResult} from "express-validator";
// import {body, validationResult} from "express-validator";

export const groupList = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await getAllGroups();
        res.json(groups);
    } catch(e) {
        logger.log({
            level: "error",
            message: "Couldn't get all groups",
            error: e
        });
        next(e);
    }
}

export const groupGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupName = String(req.params.groupName);
        const user = await getGroupPerName(groupName);
        res.json(user);
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't get the group",
            error: e
        });
        next(e);
    }
}

export const groupCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        await createGroup(body);
        res.json({ message: "Group created" });
    } catch(e) {
        logger.log({
            level: "error",
            message: "Couldn't create group",
            error: e
        });
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
        logger.log({
            level: "error",
            message: "Couldn't add amount",
            error: e
        });
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
        logger.log({
            level: "error",
            message: "Couldn't substract amount",
            error: e
        });
        next(e);
    }
}

export const groupDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupName = String(req.params.groupName);
        await deleteGroup(groupName);
        res.json({ message: "Group successfully deleted"});
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't delete the group",
            error: e
        });
        next(e);
    }
}

export const validate = (req: Request, res: Response, next: NextFunction) => {

    // @ts-ignore
    const result: Result = validationResult(req).formatWith(({ msg, path }) => ({
        msg,
        path
    }));

    if (!result.isEmpty()) {
        res.status(422).json({ error: result.array() });
        logger.log({
            level: "error",
            message: "Error when validating",
            error: JSON.stringify(result.array())
        });
    } else {
        next();
    }
}

export const valueToValidate = (value: String) => {
    switch (value) {
        case "name" : {
            return [
                check("name")
                    .exists().withMessage("Enter a name please")
                    .trim()
                    .isLength({min : 3}).withMessage("The name must have a minimum length of 3"),
            ] as any;
        }
        case "amount" : {
            return [
                check("amount")
                    .isLength({min : 1}).withMessage("Enter an amount please")
                    .trim()
                    .exists()
                    .toInt(),
            ] as any;
        }
        case "all" : {
            return [
                check("name")
                    .exists().withMessage("Enter a name please")
                    .trim()
                    .isLength({min : 3}).withMessage("The name must have a minimum length of 3"),

                check("amount")
                    .isLength({min : 1}).withMessage("Enter an amount please")
                    .trim()
                    .exists()
                    .toInt(),
            ] as any;
        }
        default: {
            return [] as any;
        }
    }
}