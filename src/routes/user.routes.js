import express from "express";

import { validateBody } from "../middleware/validator.middleware.js";
import { loginSchema, userSchema } from "../utils/schemas.js";
import { createUserHandler, getUserDetails, loginUser } from "../controllers/user.controller.js";
import checker from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", validateBody(userSchema), createUserHandler);
router.post("/login", validateBody(loginSchema), loginUser);
router.get("/account", checker, getUserDetails);

export default router;
