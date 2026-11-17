import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Crown,
  Flame,
  Lock,
  Medal,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import GameHUD from "../components/game/GameHUD";
import PixelButton from "../components/ui/PixelButton";
import { missions } from "../data/missions";
import { useProgress } from "../hooks/useProgress";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  color: string;
  requirement: string;
  target: number;
  check: (completedIds: string[], xp: number) => boolean;
  current: (completedIds: string[], xp: number) => number;
}

const totalMissionCount = missions.length;

const totalAvailableXp = missions.reduce(
  (total, mission) => total + mission.xp,
  0,
);

const missionGroups = {
  origin: ["origin-01", "origin-02", "origin-03"],
  syntax: ["syntax-01", "syntax-02", "syntax-03"],
  async: ["async-01", "async-02", "async-03"],
  core: ["core-01", "core-02", "core-03"],
};

const missionGroupProgress = (completedIds: string[], groupIds: string[]) =>
  groupIds.filter((id) => completedIds.includes(id)).length;

const achievements: Achievement[] = [
  {
    id: "first-step",
    title: "First Steps",
    description: "Complete your very first mission.",
    category: "BEGINNER",
    icon: Star,
    color: "blue",
    requirement: "Complete 1 mission",
    target: 1,
    check: (ids) => ids.length >= 1,
    current: (ids) => ids.length,
  },
  {
    id: "origin-master",
    title: "Origin Master",
    description: "Complete all missions in The Origin.",
    category: "WORLD EXPLORER",
    icon: BookOpen,
    color: "cyan",
    requirement: "Complete all 3 Origin missions",
    target: missionGroups.origin.length,
    check: (ids) => missionGroups.origin.every((id) => ids.includes(id)),
    current: (ids) => missionGroupProgress(ids, missionGroups.origin),
  },
  {
    id: "logic-wielder",
    title: "Logic Wielder",
    description: "Conquer the Syntax Frontier.",
    category: "WORLD EXPLORER",
    icon: Shield,
    color: "purple",
    requirement: "Complete all 3 Syntax missions",
    target: missionGroups.syntax.length,
    check: (ids) => missionGroups.syntax.every((id) => ids.includes(id)),
    current: (ids) => missionGroupProgress(ids, missionGroups.syntax),
  },
  {
    id: "time-bender",
    title: "Time Bender",
    description: "Master callbacks, promises and async/await.",
    category: "WORLD EXPLORER",
    icon: Flame,
    color: "orange",
    requirement: "Complete all 3 Async missions",
    target: missionGroups.async.length,
    check: (ids) => missionGroups.async.every((id) => ids.includes(id)),
    current: (ids) => missionGroupProgress(ids, missionGroups.async),
  },
  {
    id: "core-conqueror",
    title: "Core Conqueror",
    description: "Complete all missions in The Core.",
    category: "WORLD EXPLORER",
    icon: Crown,
    color: "emerald",
    requirement: "Complete all 3 Core missions",
    target: missionGroups.core.length,
    check: (ids) => missionGroups.core.every((id) => ids.includes(id)),
    current: (ids) => missionGroupProgress(ids, missionGroups.core),
  },
  {
    id: "xp-hunter",
    title: "XP Hunter",
    description: "Earn your first 500 experience points.",
    category: "EXPERIENCE",
    icon: Zap,
    color: "yellow",
    requirement: "Earn 500 XP",
    target: 500,
    check: (_, xp) => xp >= 500,
    current: (_, xp) => xp,
  },
  {
    id: "veteran",
    title: "Seasoned Veteran",
    description: "Your journey is becoming legendary.",
    category: "EXPERIENCE",
    icon: Medal,
    color: "orange",
    requirement: "Earn 1,500 XP",
    target: 1500,
    check: (_, xp) => xp >= 1500,
    current: (_, xp) => xp,
  },
  {
    id: "legend",
    title: "Living Legend",
    description: "Reach the maximum experience available.",
    category: "EXPERIENCE",
    icon: Trophy,
    color: "yellow",
    requirement: `Earn ${totalAvailableXp.toLocaleString()} XP`,
    target: totalAvailableXp,
    check: (_, xp) => xp >= totalAvailableXp,
    current: (_, xp) => xp,
  },
  {
    id: "code-architect",
    title: "Code Architect",
    description: "Complete every mission in The Lost Code.",
    category: "ULTIMATE",
    icon: Award,
    color: "purple",
    requirement: `Complete all ${totalMissionCount} missions`,
    target: totalMissionCount,
    check: (ids) =>
      missions.every((mission) => ids.includes(mission.chapterId)),
    current: (ids) =>
      missions.filter((mission) => ids.includes(mission.chapterId)).length,
  },
];

const colors: Record<
  string,
  {
    text: string;
    border: string;
    bg: string;
    glow: string;
    progress: string;
  }
> = {
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    glow: "shadow-blue-500/10",
    progress: "bg-blue-500",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    glow: "shadow-cyan-500/10",
    progress: "bg-cyan-500",
  },
  purple: {
    text: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    glow: "shadow-purple-500/10",
    progress: "bg-purple-500",
  },
  orange: {
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    glow: "shadow-orange-500/10",
    progress: "bg-orange-500",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    glow: "shadow-emerald-500/10",
    progress: "bg-emerald-500",
  },
  yellow: {
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    glow: "shadow-yellow-500/10",
    progress: "bg-yellow-500",
  },
};

export default function Achievements() {
  const navigate = useNavigate();

  const { progress, loading, error } = useProgress();

  const completedIds = progress.completedChapters;

  const unlockedAchievements = achievements.filter((achievement) =>
    achievement.check(completedIds, progress.xp),
  );

  const lockedAchievements = achievements.filter(
    (achievement) => !achievement.check(completedIds, progress.xp),
  );

  const unlockedCount = unlockedAchievements.length;
  const totalAchievements = achievements.length;

  const collectionPercentage = Math.round(
    (unlockedCount / totalAchievements) * 100,
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/90">
        <GameHUD title="HALL OF LEGENDS" xp={progress.xp} />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-7 lg:py-12">
        <PixelButton
          variant="secondary"
          size="sm"
          icon={<ArrowLeft size={14} />}
          iconPosition="left"
          className="mb-8"
          onClick={() => navigate("/dashboard")}
        >
          BACK TO DASHBOARD
        </PixelButton>

        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#11141d] sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-5 flex items-center gap-2">
              <span className="rounded-md border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 font-pixel text-[9px] text-yellow-400">
                LEGENDARY COLLECTION
              </span>
              <Sparkles size={15} className="text-orange-400" />
            </div>

            <h1 className="font-pixel text-xl leading-relaxed sm:text-2xl lg:text-3xl">
              HALL OF
              <span className="block text-yellow-400">LEGENDS</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-white/50">
              Every achievement tells a story. Complete missions, master new
              skills, and earn your place among the legends.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
                <Trophy size={18} className="mb-3 text-yellow-400" />
                <p className="font-pixel text-xl">
                  {loading ? "--" : unlockedCount}
                </p>
                <p className="mt-2 text-[9px] font-bold tracking-wider text-slate-400">
                  UNLOCKED
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20">
                <Lock size={18} className="mb-3 text-slate-400" />
                <p className="font-pixel text-xl">
                  {loading ? "--" : totalAchievements - unlockedCount}
                </p>
                <p className="mt-2 text-[9px] font-bold tracking-wider text-slate-400">
                  REMAINING
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-black/20 sm:col-span-1">
                <Star size={18} className="mb-3 text-orange-400" />
                <p className="font-pixel text-xl">
                  {loading ? "--" : `${collectionPercentage}%`}
                </p>
                <p className="mt-2 text-[9px] font-bold tracking-wider text-slate-400">
                  COLLECTION
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collection progress */}
        {!loading && !error && (
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#11141d] sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-yellow-400" />
                <p className="font-pixel text-[9px]">COLLECTION PROGRESS</p>
              </div>
              <p className="font-pixel text-[10px] text-yellow-400">
                {unlockedCount}/{totalAchievements}
              </p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-yellow-500 to-orange-400 transition-all duration-700"
                style={{ width: `${collectionPercentage}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-white/40">
              {unlockedCount === totalAchievements
                ? "You've collected every achievement. You're a true legend!"
                : `${totalAchievements - unlockedCount} achievements are still waiting to be discovered.`}
            </p>
          </section>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-48 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-slate-300 border-t-yellow-500 dark:border-white/10 dark:border-t-yellow-400" />
              <p className="font-pixel text-[9px] text-yellow-400">
                SEARCHING THE ARCHIVES...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="font-pixel text-xs text-red-400">
              ARCHIVE UNAVAILABLE
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-white/50">
              {error}
            </p>
          </div>
        )}

        {/* Achievements */}
        {!loading && !error && (
          <>
            {/* Unlocked */}
            <section className="mb-12">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-yellow-400" />
                  <div>
                    <h2 className="font-pixel text-[11px]">
                      UNLOCKED TROPHIES
                    </h2>
                    <p className="mt-2 text-[10px] text-slate-400">
                      Rewards earned through your journey
                    </p>
                  </div>
                </div>

                <span className="font-pixel text-[9px] text-yellow-400">
                  {unlockedCount} EARNED
                </span>
              </div>

              {unlockedCount === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/10 dark:bg-[#11141d]">
                  <Trophy size={32} className="mx-auto text-slate-400" />
                  <p className="mt-4 font-pixel text-[10px]">
                    YOUR FIRST TROPHY AWAITS
                  </p>
                  <p className="mt-3 text-xs text-slate-500 dark:text-white/40">
                    Complete a mission to unlock your first achievement.
                  </p>

                  <PixelButton
                    className="mt-6"
                    icon={<ArrowRight size={14} />}
                    onClick={() => navigate("/missions")}
                  >
                    VIEW MISSIONS
                  </PixelButton>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {unlockedAchievements.map((achievement) => {
                    const Icon = achievement.icon;
                    const style = colors[achievement.color];

                    return (
                      <article
                        key={achievement.id}
                        className={`relative overflow-hidden rounded-2xl border ${style.border} bg-white p-5 shadow-lg ${style.glow} dark:bg-[#11141d]`}
                      >
                        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/5 blur-2xl" />

                        <div className="relative flex items-start justify-between">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-xl border ${style.border} ${style.bg}`}
                          >
                            <Icon size={27} className={style.text} />
                          </div>

                          <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[9px] font-bold tracking-wider text-emerald-400">
                            <Check size={11} />
                            UNLOCKED
                          </span>
                        </div>

                        <p
                          className={`mt-5 text-[9px] font-bold tracking-widest ${style.text}`}
                        >
                          {achievement.category}
                        </p>
                        <h3 className="mt-2 font-pixel text-[11px] leading-6">
                          {achievement.title}
                        </h3>
                        <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500 dark:text-white/45">
                          {achievement.description}
                        </p>

                        <div className="mt-5 border-t border-slate-200 pt-4 dark:border-white/10">
                          <p className="text-[9px] font-bold tracking-wider text-emerald-400">
                            <Check size={11} className="mr-1 inline" />
                            {achievement.requirement}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Locked */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-slate-400" />
                <div>
                  <h2 className="font-pixel text-[11px]">HIDDEN LEGENDS</h2>
                  <p className="mt-2 text-[10px] text-slate-400">
                    Achievements yet to be discovered
                  </p>
                </div>
              </div>

              {lockedAchievements.length === 0 ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                  <Trophy size={30} className="mx-auto text-yellow-400" />
                  <p className="mt-4 font-pixel text-[10px] text-emerald-400">
                    ALL LEGENDS UNLOCKED
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                    You have conquered every achievement.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lockedAchievements.map((achievement) => {
                    const Icon = achievement.icon;
                    const style = colors[achievement.color];

                    const current = achievement.current(
                      completedIds,
                      progress.xp,
                    );

                    const percentage = Math.min(
                      100,
                      (current / achievement.target) * 100,
                    );

                    return (
                      <article
                        key={achievement.id}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 dark:border-white/10 dark:bg-[#11141d] dark:hover:border-white/20"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-black/20">
                            <Icon
                              size={26}
                              className="text-slate-400 transition-colors group-hover:text-slate-500 dark:text-white/25 dark:group-hover:text-white/50"
                            />
                          </div>

                          <Lock
                            size={16}
                            className="text-slate-400 dark:text-white/25"
                          />
                        </div>

                        <p className="mt-5 text-[9px] font-bold tracking-widest text-slate-400">
                          {achievement.category}
                        </p>
                        <h3 className="mt-2 font-pixel text-[11px] leading-6 text-slate-600 dark:text-white/65">
                          {achievement.title}
                        </h3>
                        <p className="mt-2 min-h-10 text-xs leading-5 text-slate-400 dark:text-white/35">
                          {achievement.description}
                        </p>

                        <div className="mt-5">
                          <div className="mb-2 flex justify-between text-[9px] font-bold tracking-wider text-slate-400">
                            <span>PROGRESS</span>
                            <span>
                              {Math.min(current, achievement.target)}/
                              {achievement.target}
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                            <div
                              className={`h-full rounded-full ${style.progress} transition-all duration-700`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-[9px] font-bold tracking-wider text-slate-400">
                          <Lock size={11} />
                          {achievement.requirement}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {/* Footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-slate-200 py-8 dark:border-white/10 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-pixel text-[9px] text-slate-400">
              LEGENDS ARE NOT BORN
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
              They are built one challenge at a time.
            </p>
          </div>

          <PixelButton
            variant="orange"
            icon={<ArrowRight size={14} />}
            onClick={() => navigate("/missions")}
          >
            CONTINUE YOUR JOURNEY
          </PixelButton>
        </div>
      </div>
    </main>
  );
}
