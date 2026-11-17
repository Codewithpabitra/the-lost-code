import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Cookie, Sparkles, LockKeyhole, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "the-lost-code-cookie-consent";
const CONSENT_VERSION = 1;

interface ConsentPreferences {
  essential: true;
  analytics: boolean;
  version: number;
  updatedAt: string;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);

      if (savedConsent) {
        const parsed = JSON.parse(savedConsent) as ConsentPreferences;

        if (parsed.version === CONSENT_VERSION) {
          return;
        }
      }

      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (analytics: boolean) => {
    const preferences: ConsentPreferences = {
      essential: true,
      analytics,
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error("Unable to save privacy preferences:", error);
    }

    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]"
          />

          {/* Consent Banner */}
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
            }}
            className="fixed bottom-0 left-0 z-[100] w-full px-3 pb-3 sm:bottom-5 sm:left-1/2 sm:w-[min(94%,620px)] sm:-translate-x-1/2 sm:px-0 sm:pb-0"
          >
            <div className="relative overflow-hidden border border-neutral-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-[#101116] dark:shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
              {/* Top Accent */}
              <div className="h-[3px] w-full bg-gradient-to-r from-blue-700 via-blue-400 to-orange-500" />

              {/* Decorative Background */}
              <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative p-5 sm:p-7">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-500/30 bg-blue-500/10 text-blue-500">
                      <Cookie size={22} />
                    </div>

                    <div>
                      <p className="font-pixel text-[8px] tracking-[0.18em] text-blue-500">
                        PLAYER PRIVACY PROTOCOL
                      </p>
                      <p className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                        THE LOST CODE · SYSTEM NOTICE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 border border-neutral-200 px-2 py-1 dark:border-white/10">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span className="font-pixel text-[7px] text-emerald-500">
                      PRIVACY
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h2
                    id="cookie-consent-title"
                    className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl"
                  >
                    Your data. Your choice.
                  </h2>

                  <p
                    id="cookie-consent-description"
                    className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    Before entering the world, choose how you'd like us to use
                    cookies and similar technologies to improve your experience.
                  </p>
                </div>

                {/* Privacy Categories */}
                <div className="mt-6 space-y-3">
                  {/* Essential */}
                  <div className="flex items-center justify-between gap-3 border border-neutral-200 bg-neutral-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-blue-500">
                        <LockKeyhole size={17} />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">
                          Essential storage
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                          Required for authentication and core game
                          functionality.
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-pixel text-[7px] text-emerald-500">
                      REQUIRED
                    </span>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between gap-3 border border-neutral-200 bg-neutral-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-orange-500">
                        <Sparkles size={17} />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">
                          Analytics
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                          Helps us understand player activity and improve the
                          game.
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 border border-neutral-300 px-2 py-1 font-pixel text-[7px] text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                      OPTIONAL
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => saveConsent(true)}
                    className="group relative flex items-center justify-center gap-2 overflow-hidden border border-blue-400 bg-blue-600 px-5 py-3.5 text-xs font-black tracking-wider text-white shadow-[0_4px_0_#1e40af] transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_6px_0_#1e40af] active:translate-y-1 active:shadow-none"
                  >
                    <ShieldCheck size={16} />
                    ACCEPT ALL
                  </button>

                  <button
                    type="button"
                    onClick={() => saveConsent(false)}
                    className="flex items-center justify-center gap-2 border border-neutral-300 bg-white px-5 py-3.5 text-xs font-black tracking-wider text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-100 active:scale-[0.98] dark:border-white/15 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/30 dark:hover:bg-white/[0.08]"
                  >
                    <X size={15} />
                    REJECT OPTIONAL
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-neutral-200 pt-4 dark:border-white/10 sm:flex-row">
                  <p className="text-center text-[10px] leading-relaxed text-neutral-500 dark:text-neutral-500 sm:text-left">
                    Essential storage remains active. You can change preferences
                    later.
                  </p>

                  <span className="shrink-0 font-pixel text-[7px] tracking-wider text-neutral-400 dark:text-white/25">
                    EVERY LINE COUNTS.
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
