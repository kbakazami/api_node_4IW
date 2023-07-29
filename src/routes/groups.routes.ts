import { Router } from "express";

const router = Router();

import {
    groupList,
    groupCreate,
    groupAdditionalAmount,
    groupReducedAmount,
    groupDelete,
} from '../controllers/groups.controller';

router.get('/', groupList);
router.post('/', groupCreate);
router.post('/additional-amount', groupAdditionalAmount);
router.post('/reduced-amount', groupReducedAmount);
router.delete('/', groupDelete);

export default router;