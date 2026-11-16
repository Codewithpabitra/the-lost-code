
import { Compass } from "lucide-react";
import type { WorldRegion as WorldRegionType } from "../../data/world";
import WorldRegion from "./WorldRegion";

interface WorldMapProps {
  regions: WorldRegionType[];
  selectedRegionId: string;
  selectedChapterId: string | null;
  onRegionSelect: (regionId: string) => void;
  onChapterSelect: (chapterId: string) => void;
}

const regionPositions: React.CSSProperties[] = [
  { left: "3%", top: "5%", width: "44%", height: "43%" },
  { left: "53%", top: "5%", width: "44%", height: "43%" },
  { left: "3%", top: "53%", width: "44%", height: "43%" },
  { left: "53%", top: "53%", width: "44%", height: "43%" },
];

export default function WorldMap({
  regions,
  selectedRegionId,
  selectedChapterId,
  onRegionSelect,
  onChapterSelect,
}: WorldMapProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-[#080d1c] shadow-2xl dark:border-white/10">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, #1e3a5f55, transparent 65%), radial-gradient(circle at 20% 20%, #ffffff30 1px, transparent 1.5px), radial-gradient(circle at 80% 75%, #ffffff25 1px, transparent 1.5px)",
          backgroundSize: "100% 100%, 42px 42px, 65px 65px",
        }}
      />

      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Decorative route connecting the regions */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      >
        <path
          d="M25 25 C42 8 55 12 75 25 S88 48 75 75 S45 90 25 75 S10 45 25 25"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth=".35"
          strokeDasharray="1.5 1.5"
        />
        <circle cx="50" cy="50" r="1.5" fill="#7dd3fc" />
      </svg>

      {/* Map top label */}
      <div className="relative z-30 flex items-center justify-between gap-3 px-5 pt-5 sm:px-7">
        <div>
          <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.25em] text-blue-300">
            <Compass size={13} />
            WORLD NAVIGATION SYSTEM
          </div>

          <p className="mt-2 text-xs text-white/50">
            Select a region to explore its chapters
          </p>
        </div>

        <span className="rounded-md border border-blue-300/20 bg-blue-300/10 px-3 py-2 font-pixel text-[8px] text-blue-200">
          MAP 001
        </span>
      </div>

      {/* World canvas */}
      <div className="relative mx-auto mt-3 aspect-[1/1.12] min-h-150 w-full max-w-275 sm:aspect-[1.45/1] sm:min-h-170">
        {regions.map((region, index) => (
          <WorldRegion
            key={region.id}
            region={region}
            style={regionPositions[index]}
            selected={selectedRegionId === region.id}
            selectedChapterId={selectedChapterId}
            onSelect={() => onRegionSelect(region.id)}
            onChapterSelect={onChapterSelect}
          />
        ))}
      </div>

      {/* Bottom map legend */}
      <div className="relative z-30 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 bg-black/20 px-5 py-4 sm:px-7">
        <span className="text-[9px] font-bold tracking-[0.2em] text-white/40">
          LEGEND
        </span>

        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Completed
        </div>

        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
          Available
        </div>

        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/70">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
          Locked
        </div>
      </div>
    </div>
  );
}