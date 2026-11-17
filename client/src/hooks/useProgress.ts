import { useCallback, useEffect, useState } from "react";
import { worldRegions } from "../data/world";
import { getDashboardProgress } from "../data/dashboard";
import { useAuth } from "../context/AuthContext";

export interface ProgressData {
  completedChapters: string[];
  unlockedChapters: string[];
  xp: number;
  totalCompletedMissions: number;
  totalChapters: number;
}

const initialProgress: ProgressData = {
  completedChapters: [],
  unlockedChapters: [],
  xp: 0,
  totalCompletedMissions: 0,
  totalChapters: 12,
};

const allChapters = worldRegions.flatMap((region) => region.chapters);

export function useProgress() {
  const { user, loading: authLoading } = useAuth();

  const [progress, setProgress] = useState<ProgressData>(initialProgress);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setProgress(initialProgress);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getDashboardProgress();

      setProgress({
        xp: response.xp,
        completedChapters: response.completedChapterIds,
        unlockedChapters: response.unlockedChapterIds,
        totalCompletedMissions: response.totalCompletedMissions,
        totalChapters: response.totalChapters,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load player progress",
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void refreshProgress();
  }, [authLoading, refreshProgress]);

  const isChapterUnlocked = useCallback(
    (chapterId: string) => progress.unlockedChapters.includes(chapterId),
    [progress.unlockedChapters],
  );

  const isChapterCompleted = useCallback(
    (chapterId: string) => progress.completedChapters.includes(chapterId),
    [progress.completedChapters],
  );

  // The backend awards XP. This function only refreshes server progress.
  const completeChapter = useCallback(
    async (chapterId: string) => {
      const chapterExists = allChapters.some(
        (chapter) => chapter.id === chapterId,
      );

      if (!chapterExists) return;

      await refreshProgress();
    },
    [refreshProgress],
  );

  return {
    progress,
    loading: authLoading || loading,
    error,
    isChapterUnlocked,
    isChapterCompleted,
    completeChapter,
    refreshProgress,
  };
}
