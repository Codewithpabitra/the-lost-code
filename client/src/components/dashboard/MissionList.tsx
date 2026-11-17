import { missions } from "../../data/missions";
import { worldRegions } from "../../data/world";
import type { ProgressData } from "../../hooks/useProgress";
import MissionCard from "./MissionCard";

interface MissionListProps {
  progress: ProgressData;
  loading: boolean;
  error: string | null;
  refreshProgress: () => Promise<void>;
}

export default function MissionList({
  progress,
  loading,
  error,
  refreshProgress,
}: MissionListProps) {
  const missionDetails = new Map(
    missions.map((mission) => [mission.chapterId, mission]),
  );

  const chapters = worldRegions.flatMap((region) =>
    region.chapters.map((chapter) => {
      const details = missionDetails.get(chapter.id);

      const completed = progress.completedChapters.includes(chapter.id);
      const unlocked = progress.unlockedChapters.includes(chapter.id);

      const status = completed
        ? "Completed"
        : unlocked
          ? "In Progress"
          : "Locked";

      return {
        chapterId: chapter.id,
        title: chapter.title,
        description: details?.subtitle || region.description,
        xp: chapter.xp,
        progress: completed ? 100 : 0,
        status: status as "Completed" | "In Progress" | "Locked",
      };
    }),
  );

  return (
    <section>
      <div className="mb-6">
        <p className="font-pixel text-[9px] text-blue-500">QUEST LOG</p>

        <h2 className="mt-3 text-2xl font-bold">Your Missions</h2>

        <p className="text-neutral-500 dark:text-neutral-400">
          Complete missions to earn XP and unlock new regions.
        </p>
      </div>

      {loading ? (
        <div className="border border-neutral-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#111119]">
          <p className="animate-pulse font-pixel text-[9px] text-blue-500">
            SYNCHRONIZING QUEST LOG...
          </p>
        </div>
      ) : error ? (
        <div className="border border-red-500/20 bg-red-500/5 p-6">
          <p className="text-sm text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => void refreshProgress()}
            className="mt-3 text-sm font-bold text-blue-500 hover:text-blue-400"
          >
            Retry loading missions
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <MissionCard key={chapter.chapterId} {...chapter} />
          ))}
        </div>
      )}
    </section>
  );
}
