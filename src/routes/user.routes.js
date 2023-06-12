import { Router as router } from "express";
import { validateBody } from "../middleware/validator.middle";
import { loginSchema, userSchema } from "../utils/schemas";
import { createUserHandler, loginUser } from "../controllers/users/user.controller";

router.post("/register", validateBody(userSchema), createUserHandler);
router.post("/login", validateBody(loginSchema), loginUser);

