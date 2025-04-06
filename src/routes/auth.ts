import { Router } from "express";
const router = Router();
import { register } from "../controllers/authController";

// router.post("/login", login)
// @ts-ignore
router.post("/register", register)

export default router;