
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  MapPin,
  Star,
  Trophy,
} from "lucide-react";
import type { Chapter, WorldRegion as WorldRegionType } from "../../data/world";
import GameButton from "../ui/GameButton";
import { useNavigate } from "react-router-dom";

interface RegionInfoProps {
  region: WorldRegionType;
  chapter: Chapter | null;
}

export default function RegionInfo({ region, chapter }: RegionInfoProps) {
  const isRegionLocked = region.status === "locked";
  const isChapterLocked = chapter?.status === "locked";
  const completedCount = region.chapters.filter(
    (item) => item.status === "completed",
  ).length;

  const navigate = useNavigate();

  const actionTitle = isRegionLocked
    ? "REGION LOCKED"
    : isChapterLocked
      ? "CHAPTER LOCKED"
      : chapter?.status === "completed"
        ? "REPLAY CHAPTER"
        : "ENTER CHAPTER";

  return (
    <aside className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#10131d]">
      <div
        className="relative overflow-hidden p-6 text-white"
        style={{
          background: `linear-gradient(120deg, ${region.accent}35, transparent), #101827`,
        }}
      >
        <div
          className="absolute -right-12 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: region.accent, opacity: 0.2 }}
        />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] text-white/60">
              <MapPin size={12} />
              REGION INTEL
            </span>

            {isRegionLocked ? (
              <Lock size={16} className="text-white/60" />
            ) : (
              <CheckCircle2 size={17} className="text-emerald-300" />
            )}
          </div>

          <h2 className="mt-5 font-pixel text-sm leading-7">{region.name}</h2>

          <p className="mt-2 text-sm text-white/60">{region.subtitle}</p>

          <p className="mt-5 text-sm leading-6 text-white/75">
            {region.description}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold tracking-widest text-neutral-500 dark:text-neutral-400">
              WORLD RESTORATION
            </span>
            <span className="font-bold" style={{ color: region.accent }}>
              {region.progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${region.progress}%`,
                backgroundColor: region.accent,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Trophy size={14} />
              <span className="text-[9px] font-bold tracking-wider">
                CHAPTERS
              </span>
            </div>

            <p className="mt-2 text-xl font-bold text-neutral-900 dark:text-white">
              {completedCount}
              <span className="text-sm text-neutral-400">
                /{region.chapters.length}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Star size={14} />
              <span className="text-[9px] font-bold tracking-wider">XP</span>
            </div>

            <p className="mt-2 text-xl font-bold text-neutral-900 dark:text-white">
              {region.chapters
                .filter((item) => item.status === "completed")
                .reduce((total, item) => total + item.xp, 0)}
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-5 dark:border-white/10">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              SELECTED CHAPTER
            </span>

            {chapter && (
              <span className="text-[10px] font-bold text-neutral-400">
                CH. {chapter.number}
              </span>
            )}
          </div>

          {chapter ? (
            <>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {chapter.title}
              </h3>

              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {chapter.status === "completed"
                  ? "You've restored this part of the world."
                  : chapter.status === "current"
                    ? "Your next adventure awaits."
                    : "Complete earlier chapters to unlock this checkpoint."}
              </p>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-neutral-100 p-3 dark:bg-white/[0.04]">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  Chapter reward
                </span>

                <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <Star size={14} fill="currentColor" />
                  {chapter.xp} XP
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Select a chapter checkpoint on the map to inspect it.
            </p>
          )}

          <div className="mt-5">
            <GameButton
              title={actionTitle}
              onClick={() => {
                if (chapter && !isChapterLocked && !isRegionLocked) {
                  navigate(`/mission/${chapter.id}`);
                }
              }}
              icon={
                isRegionLocked || isChapterLocked ? (
                  <Lock size={16} />
                ) : (
                  <ArrowRight size={17} />
                )
              }
              variant="primary"
              size="lg"
              disabled={isRegionLocked || isChapterLocked || !chapter}
              className="w-full justify-center"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}