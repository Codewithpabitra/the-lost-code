
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "The Lost Code API is running!",
    timestamp: new Date().toISOString(),
  });
});

export default router;