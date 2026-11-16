import { Terminal, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
          <Terminal size={20} />
        </div>
        <span className="text-lg font-bold tracking-tight">THE LOST CODE</span>
      </div>

      <div className="hidden items-center gap-8 text-sm text-neutral-500 dark:text-zinc-400 md:flex">
        <a href="#story" className="transition hover:text-blue-500">
          The Story
        </a>
        <a href="#features" className="transition hover:text-blue-500">
          Features
        </a>
        <a href="#journey" className="transition hover:text-blue-500">
          Your Journey
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-lg border border-neutral-200 p-2 transition hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-white/10 cursor-pointer"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-400">
          Sign in
        </button>
      </div>
    </nav>
  );
}
