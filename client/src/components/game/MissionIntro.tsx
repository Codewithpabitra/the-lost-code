import { BookOpen, Target, ScrollText, Sparkles } from "lucide-react";
import type { Mission } from "../../data/missions";

interface MissionIntroProps {
  mission: Mission;
}

export default function MissionIntro({ mission }: MissionIntroProps) {
  return (
    <div className="space-y-6">
      {/* Chapter heading */}
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-2 rounded-md border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 font-pixel text-[8px] text-blue-500 dark:text-blue-400">
            <BookOpen size={12} />
            CHAPTER
          </span>

          <span className="rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-[10px] font-bold tracking-wider text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            {mission.difficulty.toUpperCase()}
          </span>

          <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-amber-500 dark:text-amber-400">
            <Sparkles size={14} />
            {mission.xp} XP
          </span>
        </div>

        <h1 className="font-pixel text-lg leading-[1.9] text-neutral-900 dark:text-white sm:text-xl">
          {mission.title}
        </h1>

        <p className="mt-2 text-sm text-blue-500/80 dark:text-blue-400/80">
          {mission.subtitle}
        </p>
      </div>

      {/* Story overview */}
      <section className="overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.09] to-transparent">
        <div className="flex items-center gap-2 border-b border-neutral-200 px-5 py-4 dark:border-white/10">
          <ScrollText size={16} className="text-blue-500 dark:text-blue-400" />

          <h2 className="font-pixel text-[9px] tracking-wider text-blue-600 dark:text-blue-300">
            CHAPTER OVERVIEW
          </h2>
        </div>

        <div className="space-y-4 p-5">
          {mission.story.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm leading-7 text-neutral-700 dark:text-white/70"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Mission objective */}
      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center gap-2">
          <Target size={16} className="text-blue-500 dark:text-blue-400" />

          <h2 className="font-pixel text-[9px] tracking-wider text-neutral-900 dark:text-white/80">
            YOUR MISSION
          </h2>
        </div>

        <p className="text-sm leading-7 text-neutral-700 dark:text-white/75">
          {mission.objective}
        </p>
      </section>

      {/* Skill to master */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-500 dark:text-white/40">
          SKILL TO MASTER
        </p>

        <p className="mt-2 text-sm font-bold text-neutral-900 dark:text-white">
          {mission.concept}
        </p>
      </div>
    </div>
  );
}
