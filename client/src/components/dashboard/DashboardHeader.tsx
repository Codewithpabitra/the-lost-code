import { Bell, Menu } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/90 px-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/90 lg:px-10">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div>
          <p className="font-pixel text-[8px] text-blue-500">PLAYER ZONE</p>
          <p className="mt-2 text-lg font-bold">Command Center</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="flex h-11 w-11 items-center justify-center border border-neutral-300 bg-white text-neutral-600 dark:border-white/10 dark:bg-[#17171d] dark:text-neutral-300"
        >
          <Bell size={18} />
        </button>

        <ThemeToggle />

        <div className="flex h-11 w-11 items-center justify-center border border-blue-500/50 bg-blue-600 font-bold text-white shadow-[0_0_15px_#2563eb55]">
          P
        </div>
      </div>
    </header>
  );
}