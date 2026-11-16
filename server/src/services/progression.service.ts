import { Types } from "mongoose";
import { Progress } from "../models/Progress";

// Keep this order synchronized with client/src/data/world.ts.
export const CHAPTER_ORDER = [
  "origin-01",
  "origin-02",
  "origin-03",
  "syntax-01",
  "syntax-02",
  "syntax-03",
  "async-01",
  "async-02",
  "async-03",
  "core-01",
  "core-02",
  "core-03",
];

// Create a progress document if the player does not have one.
export const ensureProgress = async (userId: string) => {
  return Progress.findOneAndUpdate(
    { user: new Types.ObjectId(userId) },
    {
      $setOnInsert: {
        xp: 0,
        completedMissions: [],
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
};

// Return all chapters currently unlocked for the player.
export const getUnlockedChapters = (completedChapterIds: string[]) => {
  const completed = new Set(completedChapterIds);

  return CHAPTER_ORDER.filter((chapterId, index) => {
    if (index === 0) return true;

    const previousChapter = CHAPTER_ORDER[index - 1];

    return completed.has(previousChapter);
  });
};

// Check whether a particular chapter is unlocked.
export const isChapterUnlocked = (
  chapterId: string,
  completedChapterIds: string[],
): boolean => {
  const index = CHAPTER_ORDER.indexOf(chapterId);

  // Unknown chapters are always locked.
  if (index === -1) return false;

  // First chapter is unlocked by default.
  if (index === 0) return true;

  // A chapter unlocks only after completing the previous chapter.
  const previousChapter = CHAPTER_ORDER[index - 1];

  return completedChapterIds.includes(previousChapter);
};

// Complete a mission and award XP exactly once.
export const completeMission = async (
  userId: string,
  chapterId: string,
  xpReward: number,
) => {
  // Validate XP reward.
  if (!Number.isInteger(xpReward) || xpReward < 0) {
    throw new Error("Invalid XP reward");
  }

  // Validate chapter ID.
  if (!CHAPTER_ORDER.includes(chapterId)) {
    throw new Error("Unknown chapter");
  }

  // Get or create the player's progress.
  const initialProgress = await ensureProgress(userId);

  // Get the player's completed chapters.
  const completedChapterIds = initialProgress.completedMissions.map(
    (mission) => mission.chapterId,
  );

  // Prevent players from completing locked chapters.
  if (!isChapterUnlocked(chapterId, completedChapterIds)) {
    throw new Error("This chapter is locked");
  }

  // Atomically complete the mission and award XP.
  // The $ne condition prevents duplicate completion and XP rewards.
  const updatedProgress = await Progress.findOneAndUpdate(
    {
      user: new Types.ObjectId(userId),
      "completedMissions.chapterId": { $ne: chapterId },
    },
    {
      $push: {
        completedMissions: {
          chapterId,
          completedAt: new Date(),
          xpAwarded: xpReward,
        },
      },
      $inc: {
        xp: xpReward,
      },
    },
    { new: true },
  );

  // Mission successfully completed for the first time.
  if (updatedProgress) {
    return {
      progress: updatedProgress,
      alreadyCompleted: false,
      xpAwarded: xpReward,
    };
  }

  // Mission was already completed.
  const existingProgress = await Progress.findOne({
    user: new Types.ObjectId(userId),
  });

  if (!existingProgress) {
    throw new Error("Player progress could not be found");
  }

  return {
    progress: existingProgress,
    alreadyCompleted: true,
    xpAwarded: 0,
  };
};
