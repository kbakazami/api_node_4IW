import {IUser} from '../interfaces';
import {findUserPerId} from '../queries/users.queries';
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {app} from "../index";

const secret = '7be99513-47db-4f0b-945f-adc5c5e610df';

const createToken = ({user = null, id = null}) => {
    const jwtToken = jwt.sign({
            // @ts-ignore user is possibly null
            sub: id || user._id.toString(),
        },
        secret,
        {expiresIn: 5}
    );
    return jwtToken;
}

export default createToken;

const checkExpirationToken = (token: any, res: Response) => {
    const tokenExp = token.exp;
    const timeInSecond = Math.floor(Date.now() / 1000);

    if (timeInSecond <= tokenExp) {
        return token;
    } else if (timeInSecond > tokenExp && ((timeInSecond - tokenExp) < 60 * 60 * 24)) {
        const refreshToken = createToken({id: token.sub});
        res.cookie('jwt', refreshToken);
        return jwt.verify(refreshToken, secret);
    } else {
        throw new Error('Token expired');
    }
}
    const extractToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;
        if (token) {
            try {
                let decodedToken = jwt.verify(token, secret, {ignoreExpiration: true});
                decodedToken = checkExpirationToken(decodedToken, res);
                const user = await findUserPerId(decodedToken.sub as string);
                if (user) {
                    // @ts-ignore
                    req.user = user;
                    next();
                } else {
                    res.clearCookie('jwt');
                }
            } catch (e) {
                res.clearCookie('jwt');
            }
        } else {
            next();
        }
    }

    const addJwtFeatures = (req: Request, res: Response, next: NextFunction) => {
        req.isAuthenticated = () => !!req.user;
        req.logout = () => res.clearCookie('jwt');
        req.login = (user: IUser) => {
            // @ts-ignore
            const token = createToken({ user });
            res.cookie('jwt', token);
        };
        next();
    }

    app.use(extractToken);
    app.use(addJwtFeatures);