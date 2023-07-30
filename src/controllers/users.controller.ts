import {Request, Response, NextFunction} from "express";
import {
    createUser,
    deleteUser,
    editUserGroup,
    findUserPerUsername,
    getAllUsers
} from "../queries/users.queries";
import { logger } from "../index";

export const userList = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't get all users",
            error: e
        });
        next(e);
    }
}

export const userGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = String(req.params.username);
        const user = await findUserPerUsername(username);
        res.json(user);
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't get the user",
            error: e
        });
        next(e);
    }
}

export const userCreate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        await createUser(body);
        res.json({ message: "User created successfully" });
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't create the user",
            error: e
        });
        next(e);
    }
}

export const userEditGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const username = String(req.params.username);
        await editUserGroup(username, body.group);
        res.json({ message: "User modified successfully" });
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't edit the user",
            error: e
        });
        next(e);
    }
}

export const userDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = String(req.params.username);
        await deleteUser(username);
        res.json({ message: "User deleted successfully" });
    } catch (e) {
        logger.log({
            level: "error",
            message: "Couldn't delete the user",
            error: e
        });
        next(e);
    }
}