
import { Code2, Settings, Shield, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/dashboard";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-neutral-200 bg-white text-neutral-900 dark:border-white/10 dark:bg-[#0c0c12] dark:text-white lg:flex">
      <div className="flex h-20 items-center gap-3 border-b border-neutral-200 px-6 dark:border-white/10">
        <div className="flex h-10 w-10 items-center justify-center border border-blue-400/50 bg-blue-600 text-white shadow-[0_0_18px_#2563eb55]">
          <Code2 size={22} />
        </div>

        <div>
          <p className="font-bold tracking-wide">THE LOST CODE</p>
          <p className="font-pixel text-[8px] text-blue-500">GAME SYSTEM</p>
        </div>
      </div>

      <div className="px-5 pt-8">
        <p className="mb-4 font-pixel text-[9px] text-neutral-400">
          MAIN MENU
        </p>

        <nav className="space-y-2">
          {navigationItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 border px-4 py-3 font-semibold transition ${
                  isActive
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-9 px-5">
        <p className="mb-4 font-pixel text-[9px] text-neutral-400">
          SYSTEM
        </p>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 font-semibold text-neutral-500 transition hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <Settings size={19} />
          Settings
        </NavLink>
      </div>

      <div className="mt-auto p-5">
        <div className="border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-blue-500">
            <Shield size={17} />
            <span className="font-pixel text-[8px]">MISSION REMINDER</span>
          </div>

          <p className="text-sm font-semibold">The world needs you.</p>

          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Keep coding to restore the lost system.
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-blue-500">
            <Sparkles size={14} />
            Every line counts.
          </div>
        </div>
      </div>
    </aside>
  );
}