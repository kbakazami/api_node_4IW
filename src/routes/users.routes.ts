import { Router } from "express";
import {userCreate, userDelete, userEditGroup, userGet, userList} from "../controllers/users.controller";

const router = Router();

export default router;

router.get('/', userList);
router.get('/:username', userGet);
router.post('/', userCreate);
router.put('/edit/:username', userEditGroup);
router.delete('/:username', userDelete);