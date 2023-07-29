import { Router } from "express";

const router = Router();

import {
    groupList,
    groupCreate,
} from '../controllers/groups.controller';

router.get('/', groupList);
router.post('/', groupCreate);

export default router;