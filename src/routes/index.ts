import { Router } from "express";

import users from './users.routes';
import groups from './groups.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/groups', groups);

export default routes;