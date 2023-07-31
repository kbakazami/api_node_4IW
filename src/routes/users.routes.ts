import { Router } from "express";
import {
    userCreate,
    userDelete,
    userEditGroup,
    userGet,
    userList,
    validate,
    valueToValidate
} from "../controllers/users.controller";

const router = Router();

export default router;

router.get('/', userList);
router.get('/:username', userGet);
router.post('/', valueToValidate("all"), validate, userCreate);
router.put('/edit/:username',valueToValidate("group"), validate, userEditGroup);
router.delete('/:username', userDelete);