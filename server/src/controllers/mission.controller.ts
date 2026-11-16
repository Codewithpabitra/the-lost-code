import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { evaluateMission, getMission } from "../services/evaluation.service";
import {
  completeMission,
  ensureProgress,
  getUnlockedChapters,
  isChapterUnlocked,
} from "../services/progression.service";

export const submitMission = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.userId;
    const chapterId = req.params.chapterId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Express 5 parameter type validation.
    if (typeof chapterId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid chapter ID",
      });
      return;
    }

    const { code } = req.body ?? {};

    const mission = getMission(chapterId);

    if (!mission) {
      res.status(404).json({
        success: false,
        message: "Mission not found",
      });
      return;
    }

    if (typeof code !== "string" || !code.trim()) {
      res.status(400).json({
        success: false,
        message: "Please provide your JavaScript code",
      });
      return;
    }

    const progress = await ensureProgress(userId);

    const completedChapterIds = progress.completedMissions.map(
      (completedMission) => completedMission.chapterId,
    );

    if (!isChapterUnlocked(chapterId, completedChapterIds)) {
      res.status(403).json({
        success: false,
        message: "This mission is locked",
      });
      return;
    }

    const evaluation = await evaluateMission(chapterId, code);

    if (!evaluation.success) {
      res.status(200).json({
        success: true,
        completed: false,
        message: "Some tests failed. Keep trying!",
        evaluation: {
          output: evaluation.output,
          error: evaluation.error,
          testResults: evaluation.testResults,
          passedTests: evaluation.passedTests,
          totalTests: evaluation.totalTests,
        },
      });
      return;
    }

    const completion = await completeMission(userId, chapterId, mission.xp);

    const updatedCompletedIds = completion.progress.completedMissions.map(
      (completedMission) => completedMission.chapterId,
    );

    const unlockedChapterIds = getUnlockedChapters(updatedCompletedIds);

    res.status(200).json({
      success: true,
      completed: true,
      alreadyCompleted: completion.alreadyCompleted,
      message: completion.alreadyCompleted
        ? "Mission already completed!"
        : "Mission completed successfully!",
      evaluation: {
        output: evaluation.output,
        error: null,
        testResults: evaluation.testResults,
        passedTests: evaluation.passedTests,
        totalTests: evaluation.totalTests,
      },
      reward: {
        xpAwarded: completion.xpAwarded,
        totalXP: completion.progress.xp,
      },
      progress: {
        completedChapterIds: updatedCompletedIds,
        unlockedChapterIds,
      },
    });
  } catch (error) {
    console.error("Mission submission error:", error);

    res.status(503).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Mission evaluation failed",
    });
  }
};
