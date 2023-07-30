import { Router } from "express";

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
router.put('/additional-amount/:groupName', groupAdditionalAmount);
router.put('/reduced-amount/:groupName', groupReducedAmount);
router.delete('/:groupName', groupDelete);

export default router;