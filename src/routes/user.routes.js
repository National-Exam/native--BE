import express from "express";

import { validateBody } from "../middleware/validator.middleware.js";
import { loginSchema, userSchema } from "../utils/schemas.js";
import { createUserHandler, loginUser } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/register", validateBody(userSchema), createUserHandler);
router.post("/login", validateBody(loginSchema), loginUser);

export default router;
