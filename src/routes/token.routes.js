import express from "express";

import { validateBody } from "../middleware/validator.middleware.js";
import {  tokenSchema } from "../utils/schemas.js";
import { createToken, getAllTokens, validateToken } from "../controllers/token.controller.js";

const router = express.Router();

router.get("/", getAllTokens);


router.post("/", validateBody(tokenSchema), createToken);
router.post("/validate", validateToken);


export default router;
