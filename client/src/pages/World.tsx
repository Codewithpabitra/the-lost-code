
import { useState } from "react";
import { Globe2, Sparkles } from "lucide-react";
import WorldHeader from "../components/world/WorldHeader";
import WorldMap from "../components/world/WorldMap";
import RegionInfo from "../components/world/RegionInfo";
import { worldRegions } from "../data/world";

export default function World() {
  const [selectedRegionId, setSelectedRegionId] = useState("syntax");
  const [selectedChapterId, setSelectedChapterId] = useState("syntax-01");

  const selectedRegion =
    worldRegions.find((region) => region.id === selectedRegionId) ??
    worldRegions[0];

  const selectedChapter =
    selectedRegion.chapters.find(
      (chapter) => chapter.id === selectedChapterId,
    ) ?? null;

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegionId(regionId);

    const region = worldRegions.find((item) => item.id === regionId);
    if (!region) return;

    const firstAvailable =
      region.chapters.find((chapter) => chapter.status === "current") ??
      region.chapters.find((chapter) => chapter.status === "completed") ??
      region.chapters[0];

    setSelectedChapterId(firstAvailable?.id ?? "");
  };

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
  };

  const completedChapters = worldRegions.reduce(
    (total, region) =>
      total +
      region.chapters.filter((chapter) => chapter.status === "completed")
        .length,
    0,
  );

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-5 text-neutral-900 transition-colors dark:bg-[#09090b] dark:text-white sm:px-6 sm:py-7">
      <div className="mx-auto max-w-375">
        <WorldHeader />

        {/* Page introduction */}
        <section className="mb-7 mt-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue-500">
              <Sparkles size={14} />
              YOUR ADVENTURE CONTINUES
            </div>

            <h1 className="font-pixel text-xl leading-[1.8] tracking-tight sm:text-2xl lg:text-3xl">
              EXPLORE THE
              <span className="text-blue-500"> LOST WORLD.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              Four mysterious regions. Twelve ancient chapters. One mission:
              restore the code and bring this world back to life.
            </p>
          </div>

          {/* Player progress */}
          <div className="flex flex-wrap gap-3">
            <div className="flex min-w-32 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/4">
              <Globe2 size={19} className="text-blue-500" />
              <div>
                <p className="text-[9px] font-bold tracking-widest text-neutral-400">
                  REGIONS
                </p>
                <p className="mt-1 text-sm font-bold">
                  2 <span className="text-neutral-400">/ 4</span>
                </p>
              </div>
            </div>

            <div className="flex min-w-32 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/4">
              <Sparkles size={19} className="text-emerald-500" />
              <div>
                <p className="text-[9px] font-bold tracking-widest text-neutral-400">
                  CHAPTERS
                </p>
                <p className="mt-1 text-sm font-bold">
                  {completedChapters}{" "}
                  <span className="text-neutral-400">/ 12</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map + region details */}
        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <WorldMap
            regions={worldRegions}
            selectedRegionId={selectedRegionId}
            selectedChapterId={selectedChapterId}
            onRegionSelect={handleRegionSelect}
            onChapterSelect={handleChapterSelect}
          />

          <RegionInfo
            region={selectedRegion}
            chapter={selectedChapter}
          />
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-5 text-[9px] font-bold tracking-[0.18em] text-neutral-400 dark:border-white/10">
          <span>THE LOST CODE // WORLD SYSTEM</span>
          <span>BUILD 001.0 — EXPLORER ONLINE</span>
        </footer>
      </div>
    </main>
  );
}