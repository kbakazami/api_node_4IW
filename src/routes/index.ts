import { Router } from "express";

import users from './users.routes';
import groups from './groups.routes';
import auth from './auth.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/groups', groups);
routes.use('/auth', auth);

export default routes;