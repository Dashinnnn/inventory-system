import { Router } from "express";
import { register, login, getMe } from "./auth.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authLimiter, apiLimiter } from "../../middlewares/rateLimiter.middleware.js"

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", apiLimiter, authenticate, getMe);

export default router;