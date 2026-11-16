import { ChevronRight, Code2, Map, Radio } from "lucide-react";
import GameButton from "../ui/GameButton";
import ProgressBar from "../ui/ProgressBar";

export default function ContinueJourney() {
  return (
    <section className="grid overflow-hidden border border-blue-500/30 bg-white dark:bg-[#111119] lg:grid-cols-[1.2fr_0.8fr]">
      <div className="p-7 lg:p-9">
        <div className="mb-5 flex items-center gap-2 text-blue-500">
          <Map size={17} />
          <span className="font-pixel text-[9px]">ACTIVE CHAPTER / 01</span>
        </div>

        <h2 className="text-3xl font-bold tracking-wide">
          The Forgotten Beginning
        </h2>

        <p className="mt-3 max-w-lg text-lg text-neutral-600 dark:text-neutral-400">
          A mysterious signal has emerged from an abandoned terminal. Find its
          source and restore the first fragment of the system.
        </p>

        <div className="mt-8">
          <div className="mb-3 flex justify-between text-sm font-semibold">
            <span className="text-neutral-500">CHAPTER COMPLETION</span>
            <span className="text-blue-500">40%</span>
          </div>
          <ProgressBar progress={40} showGlow />
        </div>

        <div className="mt-8">
          <GameButton
            title="RESUME MISSION"
            icon={<ChevronRight size={19} />}
            onClick={() => console.log("Resume mission")}
          />
        </div>
      </div>

      <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#080d20] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1d4ed8_0%,transparent_65%)] opacity-30" />

        <div className="relative flex flex-col items-center gap-4">
          <div className="flex h-28 w-28 items-center justify-center border border-blue-400/50 bg-blue-500/10 text-blue-300 shadow-[0_0_45px_#2563eb44]">
            <Code2 size={55} />
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <Radio size={15} />
            <span className="font-pixel text-[8px]">SIGNAL DETECTED</span>
          </div>
        </div>

        <span className="absolute bottom-5 right-5 font-pixel text-[8px] text-blue-200/60">
          REGION 01
        </span>
      </div>
    </section>
  );
}