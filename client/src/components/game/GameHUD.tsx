import { ArrowLeft, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

interface GameHUDProps {
  title: string;
  xp: number;
  hearts?: number;
}

export default function GameHUD({ title, xp, hearts = 3 }: GameHUDProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 py-4 text-neutral-900 dark:border-white/10 dark:bg-[#09090b] dark:text-white sm:px-8">
      <div className="flex items-center gap-4">
        <Link
          to="/world"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-700 transition hover:border-blue-400 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <p className="font-pixel text-[9px] text-blue-500 dark:text-blue-400">
            THE LOST CODE
          </p>
          <p className="mt-2 text-xs font-semibold text-neutral-500 dark:text-white/60">
            {title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: hearts }).map((_, index) => (
            <Heart
              key={index}
              size={17}
              fill="#ef4444"
              className="text-red-500"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-500 dark:text-amber-400">
          <Star size={14} fill="currentColor" />
          {xp} XP
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}