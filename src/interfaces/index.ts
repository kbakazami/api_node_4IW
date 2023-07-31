import {IUser} from "./user.interface";

export * from './user.interface';
export * from './group.interface';

declare global {
    namespace Express {
        interface Request {
            user?: import("./user.interface").IUser;
            isAuthenticated?: () => boolean;
            logout?: () => void;
            login?: (user: import("./user.interface").IUser) => void;
        }

        interface User extends IUser {}
    }
}
