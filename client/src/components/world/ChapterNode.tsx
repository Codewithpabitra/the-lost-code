
import { Check, Lock, Play, Star } from "lucide-react";
import type { Chapter } from "../../data/world";

interface ChapterNodeProps {
  chapter: Chapter;
  accent: string;
  selected: boolean;
  onClick: () => void;
}

export default function ChapterNode({
  chapter,
  accent,
  selected,
  onClick,
}: ChapterNodeProps) {
  const isLocked = chapter.status === "locked";
  const isCompleted = chapter.status === "completed";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLocked}
      title={chapter.title}
      className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition duration-200 ${
        isLocked
          ? "cursor-not-allowed opacity-50 grayscale"
          : "cursor-pointer hover:scale-110"
      }`}
      style={{
        left: `${chapter.position.x}%`,
        top: `${chapter.position.y}%`,
      }}
    >
      <span
        className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 shadow-xl transition sm:h-14 sm:w-14 ${
          selected
            ? "scale-110 border-white"
            : isCompleted
              ? "border-emerald-300"
              : isLocked
                ? "border-white/20"
                : "border-white"
        }`}
        style={{
          background: isCompleted
            ? "#047857"
            : isLocked
              ? "#27272a"
              : accent,
          boxShadow: selected
            ? `0 0 0 5px ${accent}35, 0 0 30px ${accent}90`
            : isCompleted
              ? "0 0 20px #10b98160"
              : "0 8px 20px #00000080",
        }}
      >
        {isCompleted ? (
          <Check size={22} strokeWidth={3} className="text-white" />
        ) : isLocked ? (
          <Lock size={19} className="text-white/70" />
        ) : (
          <Play size={21} fill="white" className="text-white" />
        )}

        {chapter.status === "current" && (
          <span
            className="absolute -inset-2 animate-ping rounded-2xl border border-white/50"
            style={{ animationDuration: "2s" }}
          />
        )}
      </span>

      <span className="rounded-md border border-white/15 bg-black/75 px-2 py-1 text-[9px] font-bold tracking-widest text-white shadow-lg backdrop-blur-sm sm:text-[10px]">
        CH. {chapter.number}
      </span>

      {selected && (
        <span className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-white drop-shadow-lg">
          <Star size={10} fill="currentColor" />
          SELECTED
        </span>
      )}
    </button>
  );
}