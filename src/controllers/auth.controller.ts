import {NextFunction, Request, Response} from 'express';
import {findUserPerUsername} from "../queries/users.queries";

export const signing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await findUserPerUsername(username);
        if (user) {

            // @ts-ignore
            const match = await user.comparePassword(password, user.local.password);

            if(match){
                // @ts-ignore
                req.login(user);
                res.json({message: "User logged in successfully" })
            }else{
                throw new Error('Wrong password');
            }
        }else{
            throw new Error('User not found');
        }
    }catch (e) {
        next(e);
    }


}

export const signout = (req: Request, _: Response) => {
    // @ts-ignore
    req.logout();
}