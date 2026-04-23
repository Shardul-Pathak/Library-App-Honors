import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { limiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/register", limiter, register);
router.post("/login", limiter, login);
router.post("/logout", logout);

export default router;