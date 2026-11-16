
import { Router } from "express";
import { submitMission } from "../controllers/mission.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/:chapterId/submit", authMiddleware, submitMission);

export default router;