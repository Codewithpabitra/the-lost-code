import { Check, Code2, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import GameButton from "../ui/GameButton";
import ProgressBar from "../ui/ProgressBar";

type MissionCardProps = {
  chapterId: string;
  title: string;
  description: string;
  progress: number;
  status: "Completed" | "In Progress" | "Locked";
  xp: number;
};

export default function MissionCard({
  chapterId,
  title,
  description,
  progress,
  status,
  xp,
}: MissionCardProps) {
  const navigate = useNavigate();

  const locked = status === "Locked";
  const completed = status === "Completed";

  let Icon: ReactNode = <Code2 size={21} />;

  if (locked) Icon = <Lock size={21} />;
  if (completed) Icon = <Check size={21} />;

  return (
    <article className="group flex flex-col gap-5 border border-neutral-200 bg-white p-5 transition hover:border-blue-500/40 dark:border-white/10 dark:bg-[#111119] sm:flex-row sm:items-center">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center border ${
          completed
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
            : locked
              ? "border-neutral-300 bg-neutral-100 text-neutral-400 dark:border-white/10 dark:bg-white/5"
              : "border-blue-500/30 bg-blue-500/10 text-blue-500"
        }`}
      >
        {Icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold">{title}</h3>

          <span
            className={`font-pixel text-[8px] ${
              completed
                ? "text-emerald-500"
                : locked
                  ? "text-neutral-400"
                  : "text-blue-500"
            }`}
          >
            {status.toUpperCase()}
          </span>
        </div>

        <p className="mt-1 text-base text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>

      <div className="w-full sm:w-36">
        <div className="mb-2 flex justify-between text-xs font-bold">
          <span className="text-neutral-400">PROGRESS</span>
          <span>{progress}%</span>
        </div>

        <ProgressBar progress={progress} />
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <span className="font-pixel text-[8px] text-amber-500">+{xp} XP</span>

        {!locked && (
          <GameButton
            title={completed ? "CLEARED" : "PLAY"}
            variant={completed ? "ghost" : "secondary"}
            size="sm"
            disabled={completed}
            onClick={() => navigate(`/mission/${chapterId}`)}
          />
        )}
      </div>
    </article>
  );
}
