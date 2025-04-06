import { Router } from "express";
const router = Router();
import { login, register } from "../controllers/authController";

// @ts-ignore
router.post("/login", login)
// @ts-ignore
router.post("/register", register)

export default router;