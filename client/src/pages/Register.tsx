
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  Swords,
  UserRound,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import PixelButton from "../components/ui/PixelButton";
import PixelInput from "../components/ui/PixelInput";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (username.trim().length < 3 || username.trim().length > 20) {
      setError("Player name must be between 3 and 20 characters.");
      return;
    }

    if (password.length < 8 || password.length > 72) {
      setError("Password must be between 8 and 72 characters.");
      return;
    }

    setSubmitting(true);

    try {
      await register(username.trim(), email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create your account",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-100 px-5 py-12 text-neutral-900 transition-colors dark:bg-[#090b12] dark:text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Top navigation */}
      <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
        <Link
          to="/"
          className="group flex items-center gap-2 text-xs font-bold text-neutral-500 transition hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          BACK TO HOME
        </Link>

        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[460px] pt-12">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center border-2 border-blue-300 bg-blue-600 text-white shadow-[0_5px_0_#1e40af,0_9px_0_#172554]">
            <Swords size={34} strokeWidth={2.5} />
            <span className="absolute -right-2 -top-2 h-4 w-4 border-2 border-white bg-orange-500 dark:border-[#090b12]" />
          </div>

          <p className="font-pixel text-[10px] tracking-[0.25em] text-orange-600 dark:text-orange-400">
            THE LOST CODE
          </p>

          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            Begin your
            <span className="block text-blue-600 dark:text-blue-400">
              adventure.
            </span>
          </h1>

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Create your player identity and enter the world.
          </p>
        </div>

        {/* Registration panel */}
        <div className="border-2 border-neutral-300 bg-white p-6 shadow-[0_6px_0_#d4d4d4,0_12px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#11131b] dark:shadow-[0_6px_0_#252a37,0_12px_40px_rgba(0,0,0,0.3)] sm:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-white/10">
            <div>
              <p className="font-pixel text-[9px] text-neutral-500 dark:text-neutral-400">
                NEW PLAYER SETUP
              </p>
              <p className="mt-2 text-xs text-neutral-400">
                Your adventure starts here.
              </p>
            </div>

            <span className="border border-orange-500/30 bg-orange-500/10 px-2 py-1 font-pixel text-[8px] text-orange-600 dark:text-orange-400">
              REGISTER
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <PixelInput
              label="PLAYER NAME"
              name="username"
              type="text"
              placeholder="Choose your player name"
              autoComplete="username"
              minLength={3}
              maxLength={20}
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              icon={<UserRound size={18} />}
            />

            <PixelInput
              label="EMAIL ADDRESS"
              name="email"
              type="email"
              placeholder="player@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              icon={<Mail size={18} />}
            />

            <PixelInput
              label="CREATE PASSWORD"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              icon={<Lock size={18} />}
            />

            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
              Your password must contain at least 8 characters.
            </p>

            {error && (
              <div className="border-2 border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="pt-2">
              <PixelButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                icon={<ArrowRight size={17} />}
                className="w-full"
              >
                {submitting ? "CREATING PLAYER..." : "CREATE PLAYER"}
              </PixelButton>
            </div>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
            <span className="font-pixel text-[8px] text-neutral-400">
              ALREADY A PLAYER?
            </span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>

          <Link
            to="/login"
            className="flex min-h-12 items-center justify-center border-2 border-neutral-300 bg-neutral-100 px-4 text-center text-xs font-bold text-neutral-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-white/15 dark:bg-[#191c27] dark:text-neutral-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            LOGIN TO YOUR ACCOUNT
          </Link>
        </div>

        <p className="mt-7 text-center font-pixel text-[8px] tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
          EVERY LEGEND STARTS SOMEWHERE.
        </p>
      </div>
    </main>
  );
}