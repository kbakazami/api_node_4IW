import {Request, Response, NextFunction} from "express";
import {
    createUser,
    deleteUser,
    editUserGroup,
    findUserPerUsername,
    getAllUsers
} from "../queries/users.queries";
import { logger } from "../index";
import {check, Result, validationResult} from "express-validator";

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
        const user= await createUser(body);
        // @ts-ignore
        req.login(user);
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
        case "group" : {
            return [
                check("group")
                    .exists().withMessage("Enter a group id please")
                    .trim()
                    .isMongoId().withMessage("Enter a valid id please (example : 64c549054f6ea8d6dcaf02d3"),
            ] as any;
        }
        case "all" : {
            return [
                check("username")
                    .exists().withMessage("Enter a username please")
                    .trim()
                    .isLength({min : 3}).withMessage("The username must have a minimum length of 3"),

                check("local.email")
                    .exists().withMessage("Enter an email please")
                    .trim()
                    .isEmail().withMessage("A valid email would be like : john.doe@gmail.com"),

                check("local.password")
                    .exists().withMessage("Enter a password please")
                    .trim()
                    .isStrongPassword({minLength : 6, minUppercase: 1, minSymbols: 1, minNumbers: 1}).withMessage("The password must have a minimum length of 6 with one uppercase, one symbol and one number"),

                check("group")
                    .exists().withMessage("Enter a group id please")
                    .trim()
                    .isMongoId().withMessage("Enter a valid id please (example : 64c549054f6ea8d6dcaf02d3"),
            ] as any;
        }
        default: {
            return [] as any;
        }
    }
}