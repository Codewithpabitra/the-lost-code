import { ChevronRight, Code2, Map, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GameButton from "../ui/GameButton";
import ProgressBar from "../ui/ProgressBar";
import { worldRegions } from "../../data/world";
import type { ProgressData } from "../../hooks/useProgress";

interface ContinueJourneyProps {
  progress: ProgressData;
  loading: boolean;
}

export default function ContinueJourney({
  progress,
  loading,
}: ContinueJourneyProps) {
  const navigate = useNavigate();

  const chapters = worldRegions.flatMap((region) => region.chapters);

  const activeChapter = chapters.find(
    (chapter) =>
      progress.unlockedChapters.includes(chapter.id) &&
      !progress.completedChapters.includes(chapter.id),
  );

  const completionPercentage =
    progress.totalChapters > 0
      ? Math.round(
          (progress.totalCompletedMissions / progress.totalChapters) * 100,
        )
      : 0;

  const activeRegionIndex = activeChapter
    ? worldRegions.findIndex((region) =>
        region.chapters.some((chapter) => chapter.id === activeChapter.id),
      )
    : -1;

  const handleContinue = () => {
    if (activeChapter) {
      navigate(`/mission/${activeChapter.id}`);
    } else {
      navigate("/world");
    }
  };

  return (
    <section className="grid overflow-hidden border border-blue-500/30 bg-white dark:bg-[#111119] lg:grid-cols-[1.2fr_0.8fr]">
      <div className="p-7 lg:p-9">
        <div className="mb-5 flex items-center gap-2 text-blue-500">
          <Map size={17} />
          <span className="font-pixel text-[9px]">
            {activeChapter
              ? `ACTIVE CHAPTER / ${String(activeChapter.number).padStart(2, "0")}`
              : "CAMPAIGN STATUS"}
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-wide">
          {loading
            ? "Loading your journey..."
            : activeChapter
              ? activeChapter.title
              : "Journey Completed"}
        </h2>

        <p className="mt-3 max-w-lg text-lg text-neutral-600 dark:text-neutral-400">
          {loading
            ? "Synchronizing your progress with the game server."
            : activeChapter
              ? "Your next mission is waiting. Continue exploring the world and recover the fragments of JavaScript."
              : "You've completed every currently available chapter. Explore the world map to revisit your journey."}
        </p>

        <div className="mt-8">
          <div className="mb-3 flex justify-between text-sm font-semibold">
            <span className="text-neutral-500">CAMPAIGN COMPLETION</span>
            <span className="text-blue-500">
              {loading ? "--" : `${completionPercentage}%`}
            </span>
          </div>

          <ProgressBar progress={loading ? 0 : completionPercentage} showGlow />
        </div>

        <div className="mt-8">
          <GameButton
            title={activeChapter ? "RESUME MISSION" : "EXPLORE WORLD"}
            icon={<ChevronRight size={19} />}
            onClick={handleContinue}
          />
        </div>
      </div>

      <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#080d20] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1d4ed8_0%,transparent_65%)] opacity-30" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="flex h-28 w-28 items-center justify-center border border-blue-400/50 bg-blue-500/10 text-blue-300 shadow-[0_0_45px_#2563eb44]">
            <Code2 size={55} />
          </div>

          <div className="flex items-center gap-2 text-blue-300">
            <Radio size={15} />
            <span className="font-pixel text-[8px]">
              {loading
                ? "SYNCING SIGNAL"
                : activeChapter
                  ? "SIGNAL DETECTED"
                  : "SIGNAL RESTORED"}
            </span>
          </div>
        </div>

        <span className="absolute bottom-5 right-5 font-pixel text-[8px] text-blue-200/60">
          {activeRegionIndex >= 0
            ? `REGION ${String(activeRegionIndex + 1).padStart(2, "0")}`
            : "ALL REGIONS"}
        </span>
      </div>
    </section>
  );
}
