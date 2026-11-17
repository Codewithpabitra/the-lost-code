import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Palette,
  Moon,
  Sun,
  ShieldCheck,
  Cookie,
  LockKeyhole,
  LogOut,
  RefreshCw,
  ChevronRight,
  Gamepad2,
  Mail,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Trash2,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import PixelButton from "../components/ui/PixelButton";

import PreferenceModal, {
  type ConsentPreferences,
} from "../components/settings/PreferenceModal";

import DeleteConfirmationModal from "../components/settings/DeleteConfirmationModal";

const CONSENT_STORAGE_KEY = "the-lost-code-cookie-consent";

function getSavedConsent(): ConsentPreferences | null {
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);

    if (!saved) return null;

    const parsed = JSON.parse(saved) as ConsentPreferences;

    if (
      parsed.essential !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.version !== "number" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function SettingsSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#111116]">
      <div className="flex items-start gap-3 border-b border-neutral-200 p-5 dark:border-white/10 sm:p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-blue-500/20 bg-blue-500/10 text-blue-500">
          <Icon size={19} />
        </div>

        <div>
          <p className="font-pixel text-[8px] tracking-[0.16em] text-blue-500">
            {eyebrow}
          </p>

          <h2 className="mt-2 text-lg font-black text-neutral-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-white/10 dark:bg-white/3 dark:text-neutral-400">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [consent, setConsent] = useState<ConsentPreferences | null>(
    getSavedConsent,
  );

  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const isDark = theme === "dark";

  const formatDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Unknown";

    return parsed.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleManageCookies = () => {
    setPreferenceModalOpen(true);
  };

  const handleResetPreferences = () => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      setConsent(null);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Unable to reset privacy preferences:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setLogoutModalOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-900 transition-colors dark:bg-[#09090b] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Gamepad2 size={15} className="text-blue-500" />

            <span className="font-pixel text-[9px] tracking-[0.2em] text-blue-500">
              GAME CONFIGURATION
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Settings<span className="text-blue-500">.</span>
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                Configure your player profile, customize your world, and manage
                your privacy.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 border border-blue-500/20 bg-blue-500/5 px-3 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              <span className="font-pixel text-[8px] tracking-wider text-blue-500">
                SYSTEM ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Player Profile */}
          <SettingsSection
            icon={UserRound}
            eyebrow="PLAYER DATA / 01"
            title="Player Profile"
            description="Your identity inside The Lost Code universe."
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-blue-500/40 bg-blue-500/10 font-pixel text-2xl text-blue-500 shadow-[4px_4px_0_rgba(59,130,246,0.15)]">
                {user?.username?.charAt(0)?.toUpperCase() || "P"}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="wrap-break-word text-xl font-black text-neutral-900 dark:text-white">
                  {user?.username || "Unknown Player"}
                </h3>

                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Registered player account
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <InfoRow
                    icon={Mail}
                    label="Email address"
                    value={user?.email || "Not available"}
                  />

                  <InfoRow
                    icon={CalendarDays}
                    label="Joined"
                    value={
                      user?.createdAt
                        ? formatDate(user.createdAt)
                        : "Not available"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-white/10">
              <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                Your account information is currently managed through your
                registered account. Profile editing is not available yet.
              </p>
            </div>
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection
            icon={Palette}
            eyebrow="VISUAL INTERFACE / 02"
            title="Appearance"
            description="Choose how your coding world looks."
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-white/10 dark:bg-white/4 dark:text-neutral-300">
                  {isDark ? <Moon size={21} /> : <Sun size={21} />}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {isDark ? "Dark Mode" : "Light Mode"}
                  </h3>

                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {isDark
                      ? "A darker environment for your adventure."
                      : "A brighter environment for your adventure."}
                  </p>
                </div>
              </div>

              <PixelButton
                variant="secondary"
                size="md"
                icon={isDark ? <Sun size={16} /> : <Moon size={16} />}
                onClick={toggleTheme}
              >
                SWITCH TO {isDark ? "LIGHT" : "DARK"}
              </PixelButton>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Active theme
              </span>

              <span className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                <CheckCircle2 size={14} />
                {isDark ? "DARK" : "LIGHT"} MODE ACTIVE
              </span>
            </div>
          </SettingsSection>

          {/* Privacy */}
          <SettingsSection
            icon={ShieldCheck}
            eyebrow="SECURITY PROTOCOL / 03"
            title="Privacy & Cookies"
            description="Control optional analytics and manage your privacy preferences."
          >
            <div className="space-y-4">
              {/* Essential Storage */}
              <div className="flex items-start justify-between gap-4 border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-500"
                  />

                  <div>
                    <h3 className="text-sm font-bold">Essential storage</h3>

                    <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      Required for authentication and core game functionality.
                    </p>
                  </div>
                </div>

                <span className="shrink-0 border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-pixel text-[7px] text-emerald-500">
                  REQUIRED
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-start gap-3">
                  <Cookie
                    size={18}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />

                  <div>
                    <h3 className="text-sm font-bold">Analytics</h3>

                    <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      Optional preference for analytics and player activity
                      measurement.
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 border px-2 py-1 font-pixel text-[7px] ${
                    consent?.analytics
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                      : "border-neutral-300 text-neutral-500 dark:border-white/10 dark:text-neutral-400"
                  }`}
                >
                  {consent
                    ? consent.analytics
                      ? "ENABLED"
                      : "DISABLED"
                    : "NOT SET"}
                </span>
              </div>

              {/* Saved Preferences */}
              <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {consent ? (
                    <>
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-emerald-500"
                      />

                      <span>Preferences saved</span>

                      {consent.updatedAt && (
                        <span>· {formatDate(consent.updatedAt)}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <AlertCircle
                        size={15}
                        className="shrink-0 text-orange-500"
                      />

                      <span>No saved preferences found</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <PixelButton
                    variant="secondary"
                    size="sm"
                    icon={<RefreshCw size={14} />}
                    onClick={handleManageCookies}
                  >
                    MANAGE
                  </PixelButton>

                  <PixelButton
                    variant="danger"
                    size="sm"
                    icon={<Trash2 size={14} />}
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    RESET
                  </PixelButton>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Account */}
          <SettingsSection
            icon={LogOut}
            eyebrow="ACCOUNT CONTROL / 04"
            title="Account"
            description="Manage your current session."
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Sign out of your account
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Your saved progress remains associated with your account.
                </p>
              </div>

              <PixelButton
                variant="danger"
                size="md"
                icon={<LogOut size={15} />}
                onClick={() => setLogoutModalOpen(true)}
              >
                LOG OUT
              </PixelButton>
            </div>
          </SettingsSection>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 py-5 dark:border-white/10 sm:flex-row">
          <p className="font-pixel text-[8px] tracking-wider text-neutral-400">
            THE LOST CODE · PLAYER SETTINGS
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-xs font-bold text-neutral-500 transition hover:text-blue-500 dark:text-neutral-400"
          >
            BACK TO DASHBOARD
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Privacy Preference Modal */}
      <PreferenceModal
        open={preferenceModalOpen}
        onClose={() => setPreferenceModalOpen(false)}
        initialPreferences={consent}
        onSave={setConsent}
      />

      {/* Reset Preferences Confirmation */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        title="Reset privacy preferences?"
        description="Your saved cookie preferences will be deleted. The privacy dialog will appear again the next time you reload the application."
        confirmLabel="RESET PREFERENCES"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleResetPreferences}
      />

      {/* Logout Confirmation */}
      <DeleteConfirmationModal
        open={logoutModalOpen}
        title="Leave your adventure?"
        description="You will be signed out of your account. Your saved game progress will remain associated with your account."
        confirmLabel="LOG OUT"
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </main>
  );
}
