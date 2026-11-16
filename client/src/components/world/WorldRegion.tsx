import { Lock, MapPin } from "lucide-react";
import type { WorldRegion as WorldRegionType } from "../../data/world";
import ChapterNode from "./ChapterNode";

interface WorldRegionProps {
  region: WorldRegionType;
  selected: boolean;
  selectedChapterId: string | null;
  onSelect: () => void;
  onChapterSelect: (chapterId: string) => void;
  style: React.CSSProperties;
}

export default function WorldRegion({
  region,
  selected,
  selectedChapterId,
  onSelect,
  onChapterSelect,
  style,
}: WorldRegionProps) {
  const isLocked = region.status === "locked";
  const points = region.chapters
    .map((chapter) => `${chapter.position.x},${chapter.position.y}`)
    .join(" ");

  return (
    <div
      style={style}
      className={`absolute overflow-hidden rounded-4xl border transition duration-300 sm:rounded-[40px] ${
        selected
          ? "border-white/50 ring-2 ring-white/20"
          : "border-white/10 hover:border-white/30"
      } ${isLocked ? "grayscale-[0.65]" : ""}`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`absolute inset-0 w-full overflow-hidden bg-linear-to-br ${region.theme} text-left`}
        aria-label={`Select ${region.name}`}
      >
        {/* Island texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1.5px), radial-gradient(circle at 70% 70%, white 1px, transparent 1.5px)",
            backgroundSize: "38px 38px, 53px 53px",
          }}
        />

        {/* Atmospheric light */}
        <div
          className="absolute -right-12 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: region.accent, opacity: 0.18 }}
        />

        {/* Mountain silhouettes */}
        <svg
          viewBox="0 0 500 250"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-50"
        >
          <path
            d="M0 190 L75 95 L130 150 L205 55 L290 160 L365 80 L500 190 V250 H0Z"
            fill="#020617"
            opacity=".55"
          />
          <path
            d="M0 220 L90 155 L170 205 L270 125 L360 205 L440 145 L500 205 V250 H0Z"
            fill="#020617"
            opacity=".6"
          />
        </svg>

        {/* Region heading */}
        <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] text-white/60 sm:text-[10px]">
            <MapPin size={11} />
            REGION {region.id.toUpperCase()}
          </div>

          <h2 className="mt-2 font-pixel text-[10px] leading-5 text-white drop-shadow-lg sm:text-xs">
            {region.name}
          </h2>

          <p className="mt-1 text-xs font-semibold text-white/60">
            {region.subtitle}
          </p>
        </div>

        {isLocked && (
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-[9px] font-bold tracking-widest text-white/80 backdrop-blur-md">
            <Lock size={12} />
            LOCKED
          </div>
        )}

        {/* Progress */}
        <div className="absolute bottom-4 left-4 z-10 w-28 sm:bottom-6 sm:left-6 sm:w-36">
          <div className="mb-2 flex justify-between text-[9px] font-bold tracking-widest text-white/70">
            <span>RESTORATION</span>
            <span>{region.progress}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${region.progress}%`,
                backgroundColor: region.accent,
                boxShadow: `0 0 12px ${region.accent}`,
              }}
            />
          </div>
        </div>

        <span
          className="absolute bottom-3 right-5 font-pixel text-5xl opacity-10 sm:text-7xl"
          style={{ color: region.accent }}
        >
          {region.icon}
        </span>
      </button>

      {/* Chapter connections */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      >
        <polyline
          points={points}
          fill="none"
          stroke="white"
          strokeWidth="0.7"
          strokeDasharray="2 2"
          opacity=".55"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Chapter checkpoints */}
      {region.chapters.map((chapter) => (
        <ChapterNode
          key={chapter.id}
          chapter={chapter}
          accent={region.accent}
          selected={selectedChapterId === chapter.id}
          onClick={() => {
            onSelect();
            onChapterSelect(chapter.id);
          }}
        />
      ))}

      {selected && (
        <div className="pointer-events-none absolute inset-0 z-30 rounded-4xl border-2 border-white/20 sm:rounded-[40px]" />
      )}
    </div>
  );
}
