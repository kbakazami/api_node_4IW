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
    validate,
    valueToValidate,
} from '../controllers/groups.controller';

router.get('/', groupList);
router.get('/:groupName', groupGet);
router.post('/', valueToValidate("all"), validate, groupCreate);
router.put('/additional-amount/:groupName', ensureAuthenticated, valueToValidate("amount"), validate, groupAdditionalAmount);
router.put('/reduced-amount/:groupName', ensureAuthenticated, valueToValidate("amount"), groupReducedAmount);

router.delete('/:groupName', groupDelete);

export default router;