import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  //   Sword,
  Trophy,
  Zap,
} from "lucide-react";

import GameHUD from "../components/game/GameHUD";
import { missions } from "../data/missions";
import { useProgress } from "../hooks/useProgress";

const worlds = [
  {
    id: "origin",
    name: "THE ORIGIN",
    subtitle: "Where every legend begins",
    description: "Learn the fundamentals of JavaScript.",
    color: "blue",
    icon: "01",
  },
  {
    id: "syntax",
    name: "SYNTAX FRONTIER",
    subtitle: "Master the language",
    description: "Explore conditions, loops and functions.",
    color: "purple",
    icon: "02",
  },
  {
    id: "async",
    name: "THE ASYNC REALM",
    subtitle: "Control time and execution",
    description: "Discover callbacks, promises and async code.",
    color: "orange",
    icon: "03",
  },
  {
    id: "core",
    name: "THE CORE",
    subtitle: "The final trials",
    description: "Conquer data structures and algorithms.",
    color: "emerald",
    icon: "04",
  },
];

const colorStyles: Record<
  string,
  {
    border: string;
    text: string;
    bg: string;
    glow: string;
    badge: string;
  }
> = {
  blue: {
    border: "border-blue-500/30",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "group-hover:shadow-blue-500/10",
    badge: "bg-blue-500/15 text-blue-400",
  },
  purple: {
    border: "border-purple-500/30",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    glow: "group-hover:shadow-purple-500/10",
    badge: "bg-purple-500/15 text-purple-400",
  },
  orange: {
    border: "border-orange-500/30",
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    glow: "group-hover:shadow-orange-500/10",
    badge: "bg-orange-500/15 text-orange-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "group-hover:shadow-emerald-500/10",
    badge: "bg-emerald-500/15 text-emerald-400",
  },
};

export default function Missions() {
  const navigate = useNavigate();

  const { progress, loading, error, isChapterUnlocked, isChapterCompleted } =
    useProgress();

  const completedCount = progress.completedChapters.length;
  const totalCount = missions.length;
  const completionPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-emerald-400 border-emerald-400/20 bg-emerald-400/10";
      case "Easy":
        return "text-blue-400 border-blue-400/20 bg-blue-400/10";
      case "Intermediate":
        return "text-orange-400 border-orange-400/20 bg-orange-400/10";
      case "Advanced":
        return "text-red-400 border-red-400/20 bg-red-400/10";
      default:
        return "text-slate-400 border-slate-400/20 bg-slate-400/10";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-white">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/90">
        <GameHUD title="MISSION JOURNAL" xp={progress.xp} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-7 lg:py-12">
        {/* Back navigation */}
        <button
          onClick={() => navigate("/world")}
          className="mb-8 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 transition hover:text-blue-400 dark:text-white/40"
        >
          <ArrowLeft size={15} />
          BACK TO WORLD MAP
        </button>

        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#11141d] sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-2">
              <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 font-pixel text-[9px] text-blue-400">
                PLAYER QUEST LOG
              </span>
              <Sparkles size={15} className="text-orange-400" />
            </div>

            <h1 className="font-pixel text-xl leading-relaxed sm:text-2xl lg:text-3xl">
              THE MISSION
              <span className="block text-blue-400">ARCHIVE</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-white/50">
              Every great developer starts somewhere. Choose your mission,
              sharpen your skills, and uncover the secrets of The Lost Code.
            </p>

            {/* Progress */}
            <div className="mt-8 max-w-2xl">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-bold tracking-wider text-slate-500 dark:text-white/50">
                  OVERALL COMPLETION
                </span>
                <span className="font-pixel text-[10px] text-blue-400">
                  {completedCount}/{totalCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
                <BookOpen size={17} className="mb-3 text-blue-400" />
                <p className="font-pixel text-lg">{totalCount}</p>
                <p className="mt-2 text-[10px] font-bold tracking-wider text-slate-400">
                  TOTAL MISSIONS
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
                <CheckCircle2 size={17} className="mb-3 text-emerald-400" />
                <p className="font-pixel text-lg">{completedCount}</p>
                <p className="mt-2 text-[10px] font-bold tracking-wider text-slate-400">
                  COMPLETED
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20 sm:col-span-1">
                <Zap size={17} className="mb-3 text-orange-400" />
                <p className="font-pixel text-lg">{progress.xp}</p>
                <p className="mt-2 text-[10px] font-bold tracking-wider text-slate-400">
                  TOTAL XP
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-48 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500 dark:border-white/10 dark:border-t-blue-400" />
              <p className="font-pixel text-[9px] text-blue-400">
                LOADING QUEST ARCHIVE...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="font-pixel text-xs text-red-400">CONNECTION FAILED</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-white/50">
              {error}
            </p>
          </div>
        )}

        {/* World groups */}
        {!loading && !error && (
          <div className="space-y-12">
            {worlds.map((world) => {
              const worldMissions = missions.filter((mission) =>
                mission.chapterId.startsWith(`${world.id}-`),
              );

              const completed = worldMissions.filter((mission) =>
                isChapterCompleted(mission.chapterId),
              ).length;

              const styles = colorStyles[world.color];

              return (
                <section key={world.id}>
                  {/* World heading */}
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border font-pixel text-xs ${styles.border} ${styles.bg} ${styles.text}`}
                      >
                        {world.icon}
                      </div>

                      <div>
                        <p className="font-pixel text-[11px] tracking-wide sm:text-xs">
                          {world.name}
                        </p>
                        <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                          {world.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`font-pixel text-[10px] ${styles.text}`}>
                        {completed}/{worldMissions.length}
                      </p>
                      <p className="mt-1 text-[9px] font-bold tracking-wider text-slate-400">
                        QUESTS CLEARED
                      </p>
                    </div>
                  </div>

                  <p className="mb-5 text-xs text-slate-500 dark:text-white/40">
                    {world.description}
                  </p>

                  {/* Mission cards */}
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {worldMissions.map((mission, index) => {
                      const isCompleted = isChapterCompleted(mission.chapterId);
                      const isUnlocked = isChapterUnlocked(mission.chapterId);
                      const isLocked = !isCompleted && !isUnlocked;

                      return (
                        <article
                          key={mission.chapterId}
                          className={`group relative overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 dark:bg-[#11141d] ${
                            isCompleted
                              ? "border-emerald-500/30"
                              : isUnlocked
                                ? `${styles.border} hover:-translate-y-1 hover:shadow-xl ${styles.glow}`
                                : "border-slate-200 opacity-70 dark:border-white/10"
                          }`}
                        >
                          {/* Top row */}
                          <div className="mb-5 flex items-center justify-between">
                            <span className="font-pixel text-[9px] text-slate-400">
                              QUEST {String(index + 1).padStart(2, "0")}
                            </span>

                            {isCompleted ? (
                              <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-[9px] font-bold tracking-wider text-emerald-400">
                                <CheckCircle2 size={12} />
                                CLEARED
                              </span>
                            ) : isLocked ? (
                              <span className="flex items-center gap-1.5 rounded-md bg-slate-500/10 px-2.5 py-1.5 text-[9px] font-bold tracking-wider text-slate-400">
                                <Lock size={11} />
                                LOCKED
                              </span>
                            ) : (
                              <span
                                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[9px] font-bold tracking-wider ${styles.badge}`}
                              >
                                <Play size={10} fill="currentColor" />
                                AVAILABLE
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-pixel text-[11px] leading-6 sm:text-xs">
                            {mission.title}
                          </h3>

                          <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500 dark:text-white/45">
                            {mission.subtitle}
                          </p>

                          {/* Concept */}
                          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/5 dark:bg-black/20">
                            <p className="text-[9px] font-bold tracking-wider text-slate-400">
                              SKILL TO MASTER
                            </p>
                            <p className="mt-1 text-xs text-slate-700 dark:text-white/70">
                              {mission.concept}
                            </p>
                          </div>

                          {/* Metadata */}
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-md border px-2 py-1 text-[9px] font-bold ${getDifficultyStyle(mission.difficulty)}`}
                            >
                              {mission.difficulty.toUpperCase()}
                            </span>

                            <span className="flex items-center gap-1 rounded-md bg-orange-500/10 px-2 py-1 text-[9px] font-bold text-orange-400">
                              <Zap size={11} />
                              {mission.xp} XP
                            </span>

                            <span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-bold text-slate-400 dark:border-white/10">
                              {mission.language.toUpperCase()}
                            </span>
                          </div>

                          {/* Action */}
                          <button
                            disabled={isLocked}
                            onClick={() =>
                              navigate(`/mission/${mission.chapterId}`)
                            }
                            className={`mt-5 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-[10px] font-bold tracking-wider transition-all ${
                              isCompleted
                                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10"
                                : isUnlocked
                                  ? `border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-400 hover:bg-blue-500/20`
                                  : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-white/5 dark:bg-white/2 dark:text-white/20"
                            }`}
                          >
                            <span>
                              {isCompleted
                                ? "REVISIT MISSION"
                                : isLocked
                                  ? "COMPLETE PREVIOUS QUEST"
                                  : "ENTER MISSION"}
                            </span>

                            {isLocked ? (
                              <Lock size={14} />
                            ) : (
                              <ArrowRight size={15} />
                            )}
                          </button>

                          {/* Completed accent */}
                          {isCompleted && (
                            <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 overflow-hidden">
                              <div className="absolute -right-8 top-3 w-24 rotate-45 bg-emerald-500/10 py-1 text-center">
                                <Trophy
                                  size={12}
                                  className="mx-auto text-emerald-400"
                                />
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-7 text-center dark:border-white/10 sm:flex-row sm:text-left">
          <div>
            <p className="font-pixel text-[9px] text-slate-400">
              YOUR JOURNEY IS NOT OVER
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
              Every challenge brings you closer to the truth.
            </p>
          </div>

          <button
            onClick={() => navigate("/world")}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-[10px] font-bold tracking-wider transition hover:border-blue-500/40 hover:text-blue-400 dark:border-white/10"
          >
            EXPLORE WORLD MAP
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </main>
  );
}
