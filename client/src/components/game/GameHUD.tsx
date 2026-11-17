import { useState } from "react";
import { ArrowLeft, Heart, Star, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

interface GameHUDProps {
  title: string;
  xp: number;
  hearts?: number;
}

export default function GameHUD({ title, xp, hearts = 3 }: GameHUDProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [playerMenuOpen, setPlayerMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="relative z-30 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 py-4 text-neutral-900 dark:border-white/10 dark:bg-[#09090b] dark:text-white sm:px-8">
      {/* Left: Back + Mission */}
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

      {/* Right: Game Stats + Player */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Hearts */}
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

        {/* XP */}
        <div className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-500 dark:text-amber-400">
          <Star size={14} fill="currentColor" />
          {xp} XP
        </div>

        <ThemeToggle />

        {/* Player Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPlayerMenuOpen((open) => !open)}
            aria-label="Open player menu"
            aria-expanded={playerMenuOpen}
            className="flex h-10 items-center gap-2 border border-neutral-200 bg-neutral-100 px-3 text-neutral-700 transition hover:border-blue-400 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <UserRound size={17} />
            <span className="max-w-24 truncate text-xs font-semibold">
              {user?.username || "Player"}
            </span>
          </button>

          {playerMenuOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 border-2 border-neutral-200 bg-white p-3 shadow-[0_5px_0_#d4d4d4] dark:border-white/10 dark:bg-[#151720] dark:shadow-[0_5px_0_#252a37]">
              <div className="mb-3 border-b border-neutral-200 pb-3 dark:border-white/10">
                <p className="font-pixel text-[9px] text-blue-500 dark:text-blue-400">
                  PLAYER PROFILE
                </p>
                <p className="mt-2 truncate text-sm font-bold text-neutral-900 dark:text-white">
                  {user?.username || "Player"}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs font-bold text-red-500 transition hover:bg-red-500/10"
              >
                <LogOut size={15} />
                LOG OUT
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
