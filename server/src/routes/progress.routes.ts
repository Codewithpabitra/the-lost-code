
import { Router } from "express";
import { getMyProgress } from "../controllers/progress.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMyProgress);

export default router;