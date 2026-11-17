import { useState } from "react";
import {
  BookOpen,
  Target,
  ScrollText,
  Sparkles,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Mission } from "../../data/missions";
import { getMissionContent } from "../../data/missions";

interface MissionIntroProps {
  mission: Mission;
}

export default function MissionIntro({ mission }: MissionIntroProps) {
  const content = getMissionContent(mission.contentFile);
  const [showHint, setShowHint] = useState(false);

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

      {/* Chapter overview and lesson */}
      <section className="overflow-hidden rounded-2xl border border-blue-400/20 bg-linear-to-br from-blue-500/9 to-transparent">
        <div className="flex items-center gap-2 border-b border-neutral-200 px-5 py-4 dark:border-white/10">
          <ScrollText size={16} className="text-blue-500 dark:text-blue-400" />

          <h2 className="font-pixel text-[9px] tracking-wider text-blue-600 dark:text-blue-300">
            CHAPTER OVERVIEW
          </h2>
        </div>

        <article
          className="
            space-y-5 p-5
            text-sm leading-7 text-neutral-700
            dark:text-white/70

            [&_h1]:mt-8 [&_h1]:font-pixel [&_h1]:text-base
            [&_h1]:leading-relaxed [&_h1]:text-neutral-900
            dark:[&_h1]:text-white

            [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-neutral-200
            [&_h2]:pb-2 [&_h2]:font-pixel [&_h2]:text-[11px]
            [&_h2]:leading-loose [&_h2]:text-neutral-900
            dark:[&_h2]:border-white/10 dark:[&_h2]:text-white

            [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-neutral-900
            dark:[&_h3]:text-white

            [&_p]:leading-7

            [&_strong]:font-bold [&_strong]:text-neutral-900
            dark:[&_strong]:text-white

            [&_em]:text-blue-600 dark:[&_em]:text-blue-300

            [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2
            [&_ul]:pl-6

            [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2
            [&_ol]:pl-6

            [&_li]:pl-1

            [&_blockquote]:my-5 [&_blockquote]:border-l-2
            [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-500/5
            [&_blockquote]:py-3 [&_blockquote]:pl-4
            [&_blockquote]:italic

            [&_code]:rounded [&_code]:bg-neutral-200
            [&_code]:px-1.5 [&_code]:py-0.5
            [&_code]:font-mono [&_code]:text-[12px]
            [&_code]:text-blue-600
            dark:[&_code]:bg-white/10 dark:[&_code]:text-blue-300

            [&_pre]:my-5 [&_pre]:overflow-x-auto
            [&_pre]:rounded-xl [&_pre]:border
            [&_pre]:border-neutral-200 [&_pre]:bg-neutral-950
            [&_pre]:p-4 [&_pre]:text-neutral-100
            dark:[&_pre]:border-white/10

            [&_pre_code]:bg-transparent [&_pre_code]:p-0
            [&_pre_code]:text-[12px] [&_pre_code]:leading-6
            [&_pre_code]:text-neutral-100

            [&_table]:my-5 [&_table]:w-full
            [&_table]:border-collapse [&_table]:text-left
            [&_th]:border [&_th]:border-neutral-200
            [&_th]:bg-neutral-100 [&_th]:p-3
            [&_th]:font-bold [&_th]:text-neutral-900
            dark:[&_th]:border-white/10
            dark:[&_th]:bg-white/5 dark:[&_th]:text-white
            [&_td]:border [&_td]:border-neutral-200
            [&_td]:p-3
            dark:[&_td]:border-white/10

            [&_hr]:my-6 [&_hr]:border-neutral-200
            dark:[&_hr]:border-white/10
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </section>

      {/* Mission objective */}
      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/3">
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
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/3">
        <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-500 dark:text-white/40">
          SKILL TO MASTER
        </p>

        <p className="mt-2 text-sm font-bold text-neutral-900 dark:text-white">
          {mission.concept}
        </p>
      </div>

      {/* Toggleable hint */}
      <section className="overflow-hidden rounded-xl border border-amber-400/20 bg-amber-400/4">
        <button
          type="button"
          onClick={() => setShowHint((previous) => !previous)}
          aria-expanded={showHint}
          className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-amber-400/6"
        >
          <span className="flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-500" />
            <span className="font-pixel text-[9px] tracking-wider text-amber-600 dark:text-amber-400">
              NEED A HINT?
            </span>
          </span>

          <ChevronDown
            size={17}
            className={`text-amber-500 transition-transform duration-200 ${
              showHint ? "rotate-180" : ""
            }`}
          />
        </button>

        {showHint && (
          <div className="border-t border-amber-400/20 px-4 py-4">
            <p className="text-sm leading-7 text-neutral-700 dark:text-white/70">
              {mission.hint}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
