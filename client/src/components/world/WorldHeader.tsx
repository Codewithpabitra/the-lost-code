
import { ArrowLeft, Compass, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

export default function WorldHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-white/10">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:border-blue-500 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <Link
            to="/dashboard"
            className="font-pixel text-[10px] tracking-tight text-neutral-900 dark:text-white"
          >
            THE LOST CODE
          </Link>
          <div className="mt-2 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-blue-500">
            <Compass size={12} />
            WORLD EXPLORER
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[10px] font-bold tracking-widest text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 sm:flex">
          <Swords size={14} className="text-blue-500" />
          ADVENTURER MODE
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}