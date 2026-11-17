import { Globe2, Trophy, Zap, BookOpen } from "lucide-react";
import StatCard from "./StatCard";
import type { ProgressData } from "../../hooks/useProgress";
import { worldRegions } from "../../data/world";

interface StatsGridProps {
  progress: ProgressData;
  loading: boolean;
}

export default function StatsGrid({ progress, loading }: StatsGridProps) {
  const unlockedRegions = worldRegions.filter((region) =>
    region.chapters.some((chapter) =>
      progress.unlockedChapters.includes(chapter.id),
    ),
  ).length;

  const stats = [
    {
      label: "TOTAL XP",
      value: loading ? "--" : String(progress.xp),
      detail: "XP earned",
      icon: Zap,
    },
    {
      label: "MISSIONS CLEARED",
      value: loading ? "--" : String(progress.totalCompletedMissions),
      detail: "Successfully completed",
      icon: Trophy,
    },
    {
      label: "CHAPTERS LEFT",
      value: loading
        ? "--"
        : String(
            Math.max(
              progress.totalChapters - progress.totalCompletedMissions,
              0,
            ),
          ),
      detail: "Waiting to be explored",
      icon: BookOpen,
    },
    {
      label: "REGIONS UNLOCKED",
      value: loading ? "--" : String(unlockedRegions),
      detail: "Available to explore",
      icon: Globe2,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
