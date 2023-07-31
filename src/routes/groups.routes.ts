import { Router } from "express";
import { ensureAuthenticated } from '../config/guards.config';

const router = Router();

import {
    groupList,
    groupCreate,
    groupAdditionalAmount,
    groupReducedAmount,
    groupDelete,
    groupGet,
} from '../controllers/groups.controller';

router.get('/', groupList);
router.get('/:groupName', groupGet);
router.post('/', groupCreate);
router.put('/additional-amount/:groupName', ensureAuthenticated, groupAdditionalAmount);
router.put('/reduced-amount/:groupName', ensureAuthenticated, groupReducedAmount);
router.delete('/:groupName', groupDelete);

export default router;