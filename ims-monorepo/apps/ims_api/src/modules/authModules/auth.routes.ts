import { Router } from "express";
import { register, login, getMe } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authLimiter, apiLimiter } from "../../middlewares/rateLimiter.middleware.js"
import { registerSchema, loginSchema } from "../../validators/auth.validators.js";


const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", apiLimiter, authenticate, getMe);

export default router;