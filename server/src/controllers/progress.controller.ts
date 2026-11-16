import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  ensureProgress,
  getUnlockedChapters,
} from "../services/progression.service";

export const getMyProgress = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const progress = await ensureProgress(req.userId);

    const completedChapterIds = progress.completedMissions.map(
      (mission) => mission.chapterId,
    );

    const unlockedChapterIds = getUnlockedChapters(completedChapterIds);

    res.status(200).json({
      success: true,
      progress: {
        xp: progress.xp,
        completedMissions: progress.completedMissions,
        completedChapterIds,
        unlockedChapterIds,
        totalCompletedMissions: completedChapterIds.length,
        totalChapters: 12,
      },
    });
  } catch (error) {
    console.error("Get progress error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch player progress",
    });
  }
};
