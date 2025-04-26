import { Router } from "express";
const router = Router();
import { login, register } from "../controllers/auth.controller";

// @ts-ignore
router.post("/login", login)
// @ts-ignore
router.post("/register", register)

export default router;