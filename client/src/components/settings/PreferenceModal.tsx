import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Cookie,
  //   ShieldCheck,
  LockKeyhole,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import PixelButton from "../ui/PixelButton";

const CONSENT_STORAGE_KEY = "the-lost-code-cookie-consent";
const CONSENT_VERSION = 1;

export interface ConsentPreferences {
  essential: true;
  analytics: boolean;
  version: number;
  updatedAt: string;
}

interface PreferenceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (preferences: ConsentPreferences) => void;
  initialPreferences: ConsentPreferences | null;
}

export default function PreferenceModal({
  open,
  onClose,
  onSave,
  initialPreferences,
}: PreferenceModalProps) {
  const [analytics, setAnalytics] = useState(
    initialPreferences?.analytics ?? false,
  );

  useEffect(() => {
    if (open) {
      setAnalytics(initialPreferences?.analytics ?? false);
    }
  }, [open, initialPreferences]);

  const handleSave = () => {
    const preferences: ConsentPreferences = {
      essential: true,
      analytics,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));

      onSave(preferences);
      onClose();
    } catch (error) {
      console.error("Unable to save privacy preferences:", error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-120 flex items-center justify-center overflow-y-auto p-4">
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="preference-modal-title"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative my-auto w-full max-w-lg overflow-hidden border border-neutral-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111116]"
            >
              <div className="h-1 w-full bg-linear-to-r from-blue-600 via-blue-400 to-orange-500" />

              <div className="relative p-5 sm:p-7">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close preferences"
                  className="absolute right-5 top-5 text-neutral-400 transition hover:text-blue-500"
                >
                  <X size={19} />
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-blue-500/20 bg-blue-500/10 text-blue-500">
                    <Cookie size={22} />
                  </div>

                  <div>
                    <p className="font-pixel text-[8px] tracking-widest text-blue-500">
                      PLAYER PRIVACY
                    </p>
                    <h2
                      id="preference-modal-title"
                      className="mt-1 text-xl font-black text-neutral-900 dark:text-white"
                    >
                      Privacy preferences
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Customize how The Lost Code uses optional storage. Essential
                  storage is always active.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start justify-between gap-4 border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/3">
                    <div className="flex gap-3">
                      <LockKeyhole size={18} className="mt-0.5 text-blue-500" />
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                          Essential storage
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                          Required for authentication and core game
                          functionality.
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 font-pixel text-[7px] text-emerald-500">
                      ALWAYS ON
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/3">
                    <div className="flex gap-3">
                      <Sparkles size={18} className="mt-0.5 text-orange-500" />
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                          Analytics
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                          Help us understand player activity and improve the
                          game.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={analytics}
                      aria-label="Enable analytics"
                      onClick={() => setAnalytics((previous) => !previous)}
                      className={`relative mt-1 h-6 w-11 shrink-0 border transition-colors ${
                        analytics
                          ? "border-blue-500 bg-blue-600"
                          : "border-neutral-300 bg-neutral-200 dark:border-white/20 dark:bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 bg-white transition-transform ${
                          analytics ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <PixelButton variant="secondary" size="md" onClick={onClose}>
                    CANCEL
                  </PixelButton>

                  <PixelButton
                    variant="primary"
                    size="md"
                    icon={<Check size={15} />}
                    onClick={handleSave}
                  >
                    SAVE PREFERENCES
                  </PixelButton>
                </div>

                <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-white/10">
                  <p className="text-center font-pixel text-[7px] tracking-wider text-neutral-400">
                    YOUR DATA. YOUR CHOICE.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
