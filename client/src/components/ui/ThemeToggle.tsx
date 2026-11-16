import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
      className="flex h-11 w-11 items-center justify-center border border-neutral-300 bg-white text-neutral-700 transition hover:border-blue-500 hover:text-blue-500 dark:border-white/10 dark:bg-[#17171d] dark:text-neutral-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
    >
      {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}