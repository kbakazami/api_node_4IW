import { Request, Response, NextFunction } from 'express';
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (req.isAuthenticated()) {
        return next();
    }else{
        res.json({ message: 'You are not authenticated' })
    }
}