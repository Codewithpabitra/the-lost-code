import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Menu,
  X,
  UserRound,
  ArrowUpRight,
  Terminal,
  Settings,
  Shield,
  Sparkles,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { navigationItems } from "../../data/dashboard";

export default function DashboardHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const username = user?.username || "Player";
  const avatarInitial = username.charAt(0).toUpperCase();

  const handleNavigation = (path: string) => {
    setMenuOpen(false);

    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Dashboard Header */}
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/90 px-5 text-neutral-900 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/90 dark:text-white lg:px-10">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center border border-neutral-200 bg-neutral-100 text-neutral-700 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <div>
            <p className="font-pixel text-[8px] text-blue-500">PLAYER ZONE</p>
            <p className="mt-2 text-lg font-bold">Command Center</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-11 w-11 items-center justify-center border border-neutral-300 bg-white text-neutral-600 transition hover:bg-neutral-100 dark:border-white/10 dark:bg-[#17171d] dark:text-neutral-300 dark:hover:bg-white/10"
          >
            <Bell size={18} />
          </button>

          <ThemeToggle />

          {/* Player Profile */}
          <div className="flex items-center gap-3 border-l border-neutral-200 pl-3 dark:border-white/10">
            <div className="hidden text-right sm:block">
              <p className="max-w-32 truncate text-sm font-bold">{username}</p>
              <p className="font-pixel text-[7px] tracking-wider text-blue-500">
                PLAYER
              </p>
            </div>

            <div
              title={username}
              aria-label={`Logged in as ${username}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-500/50 bg-blue-600 font-pixel text-sm text-white shadow-[0_0_15px_#2563eb55]"
            >
              {user?.username ? avatarInitial : <UserRound size={19} />}
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Full-Screen Overlay */}
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-[2px] lg:hidden"
            />

            {/* Full-Height Drawer */}
            <motion.aside
              initial={{ x: "-100%", opacity: 0.7 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.7 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-0 z-50 flex h-dvh w-[min(82vw,320px)] flex-col overflow-hidden border-r border-neutral-200 bg-white text-neutral-900 shadow-2xl dark:border-white/10 dark:bg-[#0d0e14] dark:text-white lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-5 py-5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-orange-400/40 bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                    <Terminal size={21} />
                  </div>

                  <div>
                    <p className="font-pixel text-[9px] tracking-wider">
                      THE LOST CODE
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                      Player Navigation
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-500 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 dark:border-white/10 dark:text-neutral-400"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Player Details */}
              <div className="shrink-0 border-b border-neutral-200 p-5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-blue-500/40 bg-blue-600 font-pixel text-sm text-white">
                    {avatarInitial}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{username}</p>
                    <p className="mt-1 font-pixel text-[7px] tracking-wider text-blue-500">
                      ACTIVE PLAYER
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Navigation */}
              <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-4">
                <p className="mb-4 px-3 font-pixel text-[8px] tracking-[0.2em] text-neutral-400 dark:text-white/30">
                  MAIN MENU
                </p>

                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <motion.button
                      key={item.path}
                      type="button"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(item.path)}
                      className={`group flex w-full items-center justify-between border px-4 py-3.5 text-left transition-all duration-200 ${
                        active
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-600 shadow-[inset_3px_0_0_#3b82f6] dark:text-blue-400"
                          : "border-transparent text-neutral-600 hover:border-neutral-200 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:border-white/10 dark:hover:bg-white/[0.04] dark:hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={
                            active
                              ? "text-blue-500"
                              : "text-neutral-400 group-hover:text-blue-500"
                          }
                        />

                        <span className="text-xs font-bold tracking-wide">
                          {item.label}
                        </span>
                      </span>

                      {active ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                      ) : (
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 transition group-hover:opacity-100"
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* System Section */}
                <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-white/10">
                  <p className="mb-4 px-3 font-pixel text-[8px] tracking-[0.2em] text-neutral-400 dark:text-white/30">
                    SYSTEM
                  </p>

                  <button
                    type="button"
                    onClick={() => handleNavigation("/settings")}
                    className={`group flex w-full items-center justify-between border px-4 py-3.5 text-left transition-all duration-200 ${
                      isActive("/settings")
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-600 shadow-[inset_3px_0_0_#3b82f6] dark:text-blue-400"
                        : "border-transparent text-neutral-600 hover:border-neutral-200 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:border-white/10 dark:hover:bg-white/[0.04] dark:hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Settings
                        size={18}
                        className="text-neutral-400 group-hover:text-blue-500"
                      />
                      <span className="text-xs font-bold tracking-wide">
                        Settings
                      </span>
                    </span>

                    {isActive("/settings") && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    )}
                  </button>
                </div>

                {/* Mission Reminder */}
                <div className="mt-8 border border-blue-500/30 bg-blue-500/5 p-4">
                  <div className="mb-3 flex items-center gap-2 text-blue-500">
                    <Shield size={17} />
                    <span className="font-pixel text-[8px]">
                      MISSION REMINDER
                    </span>
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
              </nav>

              {/* Fixed Drawer Footer */}
              <div className="shrink-0 border-t border-neutral-200 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] dark:border-white/10">
                <p className="font-pixel text-[7px] tracking-widest text-neutral-400 dark:text-white/30">
                  EVERY LINE BRINGS THE WORLD BACK.
                </p>
                <p className="mt-2 text-[10px] text-neutral-500">
                  THE LOST CODE © 2026
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
