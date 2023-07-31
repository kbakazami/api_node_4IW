import { signing,  signout } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post('/signin', signing);
router.get('/signout', signout);

export default router;
