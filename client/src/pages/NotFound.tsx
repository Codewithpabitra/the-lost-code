import { motion } from "motion/react";
import { ArrowLeft, Compass, Home, Map, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PixelButton from "../components/ui/PixelButton";
import ThemeToggle from "../components/ui/ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const destination = isAuthenticated ? "/dashboard" : "/";
  const buttonLabel = isAuthenticated ? "RETURN TO DASHBOARD" : "RETURN HOME";

  const handleReturn = () => {
    navigate(destination, { replace: true });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 py-16 text-neutral-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-neutral-200 px-5 py-5 dark:border-white/10 sm:px-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-400/40 bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <Terminal size={21} />
          </div>

          <span className="font-pixel text-[9px] tracking-wider sm:text-xs">
            THE LOST CODE
          </span>
        </button>

        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Lost signal indicator */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-4 py-2"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="font-pixel text-[8px] tracking-[0.2em] text-red-500">
            SIGNAL LOST // UNKNOWN SECTOR
          </span>
        </motion.div>

        {/* 404 illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative mx-auto mb-8 flex items-center justify-center"
        >
          <div className="absolute h-64 w-64 rounded-full border border-blue-500/10 sm:h-80 sm:w-80" />
          <div className="absolute h-52 w-52 rounded-full border border-dashed border-blue-500/20 sm:h-64 sm:w-64" />

          <div className="relative flex flex-col items-center">
            <Compass
              size={48}
              strokeWidth={1}
              className="mb-3 text-blue-500/60"
            />

            <h1 className="font-pixel text-[76px] leading-none tracking-tighter text-blue-600 dark:text-blue-400 sm:text-[110px]">
              404
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-8 bg-blue-500/40" />
              <span className="font-pixel text-[8px] tracking-[0.3em] text-neutral-500 dark:text-white/40">
                MAP NOT FOUND
              </span>
              <span className="h-px w-8 bg-blue-500/40" />
            </div>
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-pixel text-sm leading-[2] sm:text-lg">
            LOOKS LIKE YOU
            <br />
            <span className="text-blue-500">GOT LOST, PLAYER.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-8 text-neutral-600 dark:text-neutral-400">
            The page you're searching for doesn't exist in this world. It may
            have been moved, deleted, or never discovered.
          </p>

          {/* Error details */}
          <div className="mx-auto mt-8 max-w-sm border border-neutral-200 bg-neutral-50 p-4 text-left dark:border-white/10 dark:bg-white/[0.025]">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[8px] text-neutral-500">
                SYSTEM MESSAGE
              </span>
              <span className="font-pixel text-[8px] text-red-500">
                ERROR 404
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                <Map size={15} className="shrink-0 text-blue-500" />
                <span>Destination coordinates unavailable.</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                <Compass size={15} className="shrink-0 text-blue-500" />
                <span>Unable to locate requested region.</span>
              </div>
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-3 dark:border-white/10">
              <p className="font-pixel text-[7px] tracking-wider text-blue-500">
                RECOMMENDATION: RETURN TO A KNOWN LOCATION.
              </p>
            </div>
          </div>

          {/* Return button */}
          <div className="mt-9 flex flex-col items-center gap-4">
            <PixelButton
              variant="primary"
              size="lg"
              icon={<ArrowLeft size={17} />}
              onClick={handleReturn}
            >
              {buttonLabel}
            </PixelButton>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-500 transition hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400"
            >
              <Home size={14} />
              BACK TO MAIN MENU
            </button>
          </div>
        </motion.div>

        {/* Footer status */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="font-pixel text-[7px] tracking-widest text-neutral-400 dark:text-white/30">
            GAME SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </main>
  );
}
