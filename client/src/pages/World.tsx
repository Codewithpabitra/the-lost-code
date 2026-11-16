
import { useEffect, useState } from "react";
import { Globe2, Sparkles } from "lucide-react";
import WorldHeader from "../components/world/WorldHeader";
import WorldMap from "../components/world/WorldMap";
import RegionInfo from "../components/world/RegionInfo";
import { worldRegions } from "../data/world";
import { useProgress } from "../hooks/useProgress";

const WORLD_SELECTION_KEY = "the-lost-code-world-selection";

interface WorldSelection {
  regionId: string;
  chapterId: string;
}

export default function World() {
  const { progress, isChapterUnlocked, isChapterCompleted } = useProgress();

  const dynamicRegions = worldRegions.map((region) => {
    const chapters = region.chapters.map((chapter) => ({
      ...chapter,
      status: isChapterCompleted(chapter.id)
        ? ("completed" as const)
        : isChapterUnlocked(chapter.id)
          ? ("current" as const)
          : ("locked" as const),
    }));

    const completed = chapters.filter(
      (chapter) => chapter.status === "completed",
    ).length;

    return {
      ...region,
      chapters,
      status: chapters.some((chapter) => chapter.status !== "locked")
        ? ("unlocked" as const)
        : ("locked" as const),
      progress: Math.round((completed / chapters.length) * 100),
    };
  });

  // Find the first playable region and chapter.
  const firstUnlockedRegion =
    dynamicRegions.find((region) => region.status === "unlocked") ??
    dynamicRegions[0];

  const firstAvailableChapter =
    firstUnlockedRegion.chapters.find(
      (chapter) => chapter.status === "current",
    ) ??
    firstUnlockedRegion.chapters.find(
      (chapter) => chapter.status === "completed",
    ) ??
    firstUnlockedRegion.chapters[0];

  // Restore the player's previous selection
  const [selection, setSelection] = useState<WorldSelection>(() => {
    try {
      const saved = localStorage.getItem(WORLD_SELECTION_KEY);

      if (saved) {
        const parsed: WorldSelection = JSON.parse(saved);

        const savedRegion = dynamicRegions.find(
          (region) => region.id === parsed.regionId,
        );

        const savedChapter = savedRegion?.chapters.find(
          (chapter) => chapter.id === parsed.chapterId,
        );

        if (
          savedRegion?.status === "unlocked" &&
          savedChapter &&
          savedChapter.status !== "locked"
        ) {
          return parsed;
        }
      }
    } catch {
      // Use the default selection if saved data is invalid.
    }

    return {
      regionId: firstUnlockedRegion.id,
      chapterId: firstAvailableChapter.id,
    };
  });

  const selectedRegion =
    dynamicRegions.find((region) => region.id === selection.regionId) ??
    firstUnlockedRegion;

  const selectedChapter =
    selectedRegion.chapters.find(
      (chapter) => chapter.id === selection.chapterId,
    ) ?? firstAvailableChapter;

  // Persist selection whenever the player changes it.
  useEffect(() => {
    localStorage.setItem(WORLD_SELECTION_KEY, JSON.stringify(selection));
  }, [selection]);

  const handleRegionSelect = (regionId: string) => {
    const region = dynamicRegions.find((item) => item.id === regionId);

    if (!region || region.status === "locked") return;

    const firstAvailable =
      region.chapters.find((chapter) => chapter.status === "current") ??
      region.chapters.find((chapter) => chapter.status === "completed") ??
      region.chapters[0];

    setSelection({
      regionId,
      chapterId: firstAvailable.id,
    });
  };

  const handleChapterSelect = (chapterId: string) => {
    const chapter = selectedRegion.chapters.find(
      (item) => item.id === chapterId,
    );

    if (!chapter || chapter.status === "locked") return;

    setSelection({
      regionId: selectedRegion.id,
      chapterId,
    });
  };

  const completedChapters = progress.completedChapters.length;

  const unlockedRegions = dynamicRegions.filter(
    (region) => region.status === "unlocked",
  ).length;

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-5 text-neutral-900 transition-colors dark:bg-[#09090b] dark:text-white sm:px-6 sm:py-7">
      <div className="mx-auto max-w-375">
        <WorldHeader />

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

          <div className="flex flex-wrap gap-3">
            <div className="flex min-w-32 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/4">
              <Globe2 size={19} className="text-blue-500" />
              <div>
                <p className="text-[9px] font-bold tracking-widest text-neutral-400">
                  REGIONS
                </p>
                <p className="mt-1 text-sm font-bold">
                  {unlockedRegions}
                  <span className="text-neutral-400"> / 4</span>
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
                  {completedChapters}
                  <span className="text-neutral-400"> / 12</span>
                </p>
              </div>
            </div>

            <div className="flex min-w-32 items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/4">
              <Sparkles size={19} className="text-amber-500" />
              <div>
                <p className="text-[9px] font-bold tracking-widest text-neutral-400">
                  TOTAL XP
                </p>
                <p className="mt-1 text-sm font-bold">{progress.xp}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <WorldMap
            regions={dynamicRegions}
            selectedRegionId={selectedRegion.id}
            selectedChapterId={selectedChapter.id}
            onRegionSelect={handleRegionSelect}
            onChapterSelect={handleChapterSelect}
          />

          <RegionInfo region={selectedRegion} chapter={selectedChapter} />
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-5 text-[9px] font-bold tracking-[0.18em] text-neutral-400 dark:border-white/10">
          <span>THE LOST CODE // WORLD SYSTEM</span>
          <span>BUILD 001.0 — EXPLORER ONLINE</span>
        </footer>
      </div>
    </main>
  );
}