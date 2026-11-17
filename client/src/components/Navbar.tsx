import { useState } from "react";
import {
  Terminal,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Gamepad2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import PixelButton from "./ui/PixelButton";

const navLinks = [
  ["THE STORY", "#story"],
  ["GAME FEATURES", "#features"],
  ["WORLD MAP", "#journey"],
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const authPath = isAuthenticated ? "/dashboard" : "/login";

  const authLabel = loading
    ? "CHECKING..."
    : isAuthenticated
      ? "OPEN DASHBOARD"
      : "PLAYER LOGIN";

  const handleAuthNavigation = () => {
    if (loading) return;

    setMenuOpen(false);
    navigate(authPath);
  };

  return (
    <nav className="relative z-30 border-b border-neutral-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/90">
      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
          aria-label="The Lost Code home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500 text-white shadow-[0_0_24px_rgba(249,115,22,0.2)]">
            <Terminal size={20} />
          </div>

          <p className="font-pixel text-[9px] tracking-tight text-neutral-950 dark:text-white sm:text-[10px]">
            THE LOST CODE
          </p>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[10px] font-bold tracking-[0.18em] text-neutral-500 transition hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-700 transition hover:border-blue-400 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-400"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Desktop Auth Button */}
          <div className="hidden sm:block">
            <PixelButton
              variant="primary"
              size="sm"
              icon={<ArrowRight size={14} />}
              onClick={handleAuthNavigation}
            >
              {authLabel}
            </PixelButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <PixelButton
              variant="secondary"
              size="sm"
              icon={menuOpen ? <X size={17} /> : <Menu size={17} />}
              iconPosition="left"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </PixelButton>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-neutral-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0c12]/95 md:hidden">
          <div className="p-5">
            {/* Menu Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <span className="font-pixel text-[8px] tracking-widest text-blue-500 dark:text-blue-400">
                  GAME MENU
                </span>
              </div>

              <span className="font-pixel text-[7px] text-neutral-400 dark:text-zinc-600">
                SELECT A DESTINATION
              </span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              {navLinks.map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="group relative flex items-center justify-between overflow-hidden border border-neutral-200 bg-neutral-50 px-4 py-4 transition-all duration-200 hover:border-blue-400 hover:bg-blue-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/60 dark:hover:bg-blue-500/[0.06]"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-pixel text-[8px] text-blue-500 dark:text-blue-400">
                      0{index + 1}
                    </span>

                    <span className="font-pixel text-[9px] tracking-wider text-neutral-800 transition-colors group-hover:text-blue-600 dark:text-white/80 dark:group-hover:text-blue-400">
                      {label}
                    </span>
                  </span>

                  <ArrowRight
                    size={16}
                    className="text-neutral-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-500 dark:group-hover:text-blue-400"
                  />
                </a>
              ))}
            </div>

            {/* Mobile Auth Button */}
            <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-white/10">
              <PixelButton
                variant="primary"
                size="md"
                icon={<Gamepad2 size={17} />}
                iconPosition="left"
                className="w-full"
                onClick={handleAuthNavigation}
              >
                {authLabel}
              </PixelButton>
            </div>

            {/* Menu Footer */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
              <span className="font-pixel text-[7px] tracking-widest text-neutral-400 dark:text-zinc-600">
                YOUR ADVENTURE AWAITS
              </span>
              <span className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
