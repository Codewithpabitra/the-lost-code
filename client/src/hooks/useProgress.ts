
import { useEffect, useState } from "react";
import { worldRegions } from "../data/world";

const STORAGE_KEY = "the-lost-code-progress";

interface ProgressData {
  completedChapters: string[];
  xp: number;
}

const initialProgress: ProgressData = {
  completedChapters: [],
  xp: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProgress;
    } catch {
      return initialProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const allChapters = worldRegions.flatMap((region) => region.chapters);

  const isChapterUnlocked = (chapterId: string) => {
    const index = allChapters.findIndex(
      (chapter) => chapter.id === chapterId,
    );

    if (index === 0) return true;
    if (index < 0) return false;

    const previousChapter = allChapters[index - 1];

    return progress.completedChapters.includes(previousChapter.id);
  };

  const completeChapter = (chapterId: string) => {
    const chapter = allChapters.find((item) => item.id === chapterId);

    if (!chapter || !isChapterUnlocked(chapterId)) return;

    setProgress((previous) => {
      if (previous.completedChapters.includes(chapterId)) {
        return previous;
      }

      return {
        completedChapters: [...previous.completedChapters, chapterId],
        xp: previous.xp + chapter.xp,
      };
    });
  };

  const isChapterCompleted = (chapterId: string) =>
    progress.completedChapters.includes(chapterId);

  return {
    progress,
    isChapterUnlocked,
    isChapterCompleted,
    completeChapter,
  };
}