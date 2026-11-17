import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  CheckCircle2,
  Play,
  RotateCcw,
  Terminal,
  XCircle,
  // Sparkles,
  // Trophy,
  // X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import GameHUD from "../components/game/GameHUD";
import MissionIntro from "../components/game/MissionIntro";
import GameButton from "../components/ui/GameButton";
import { missions } from "../data/missions";
import { useProgress } from "../hooks/useProgress";
import { useTheme } from "../context/ThemeContext";
import { apiRequest } from "../lib/api";
import MissionSuccessModal from "../components/game/MissionSuccessModal";

interface RunResult {
  output: string;
  error: string | null;
  message?: string;
  passedTests?: number;
  totalTests?: number;
}

interface SubmitResponse {
  success: boolean;
  completed: boolean;
  alreadyCompleted?: boolean;
  message: string;
  evaluation: {
    output: string;
    error: string | null;
    testResults: unknown[];
    passedTests: number;
    totalTests: number;
  };
  reward?: {
    xpAwarded: number;
    totalXP: number;
  };
  progress?: {
    completedChapterIds: string[];
    unlockedChapterIds: string[];
  };
}

const confettiColors = [
  "#60A5FA",
  "#FBBF24",
  "#34D399",
  "#F472B6",
  "#A78BFA",
  "#FB923C",
  "#F87171",
];

const confettiPieces = Array.from({ length: 75 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 15) * 0.12}s`,
  duration: `${3 + (index % 5) * 0.5}s`,
  color: confettiColors[index % confettiColors.length],
  size: 6 + (index % 7),
}));

export default function Mission() {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const {
    progress,
    loading,
    error: progressError,
    isChapterUnlocked,
    completeChapter,
  } = useProgress();

  const mission = missions.find((item) => item.chapterId === chapterId);

  const [code, setCode] = useState(mission?.initialCode ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setCode(mission?.initialCode ?? "");
    setResult(null);
    setSuccess(false);
    setXpAwarded(0);
    setAlreadyCompleted(false);
    setShowSuccessModal(false);
  }, [mission]);

  if (!mission) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center text-slate-900 dark:bg-[#09090b] dark:text-white">
        <div>
          <h1 className="font-pixel text-sm">MISSION NOT FOUND</h1>
          <button
            onClick={() => navigate("/world")}
            className="mt-6 text-sm text-blue-400 underline"
          >
            Return to world map
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-blue-500 dark:border-white/10 dark:border-t-blue-400" />
          <p className="font-pixel text-[10px] text-blue-500">
            LOADING MISSION DATA...
          </p>
        </div>
      </main>
    );
  }

  if (progressError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center text-slate-900 dark:bg-[#09090b] dark:text-white">
        <div>
          <h1 className="font-pixel text-sm text-red-500">CONNECTION FAILED</h1>
          <p className="mt-4 text-sm text-neutral-500">{progressError}</p>
          <button
            onClick={() => navigate("/world")}
            className="mt-6 text-sm text-blue-400 underline"
          >
            Return to world map
          </button>
        </div>
      </main>
    );
  }

  if (!isChapterUnlocked(mission.chapterId)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center text-slate-900 dark:bg-[#09090b] dark:text-white">
        <div>
          <h1 className="font-pixel text-sm">CHAPTER LOCKED</h1>
          <p className="mt-4 text-sm text-neutral-500 dark:text-white/50">
            Complete the previous chapter to unlock this one.
          </p>
          <button
            onClick={() => navigate("/world")}
            className="mt-6 text-sm text-blue-400 underline"
          >
            Return to world map
          </button>
        </div>
      </main>
    );
  }

  const handleRun = async () => {
    if (isRunning || success) return;

    setIsRunning(true);
    setSuccess(false);
    setShowSuccessModal(false);
    setResult(null);
    setXpAwarded(0);
    setAlreadyCompleted(false);

    try {
      const response = await apiRequest<SubmitResponse>(
        `/missions/${mission.chapterId}/submit`,
        {
          method: "POST",
          body: JSON.stringify({ code }),
        },
      );

      const evaluation = response.evaluation;

      setResult({
        output: evaluation?.output ?? "",
        error: evaluation?.error ?? null,
        message: response.message,
        passedTests: evaluation?.passedTests ?? 0,
        totalTests: evaluation?.totalTests ?? 0,
      });

      if (response.completed) {
        setSuccess(true);
        setXpAwarded(response.reward?.xpAwarded ?? 0);
        setAlreadyCompleted(response.alreadyCompleted ?? false);
        setShowSuccessModal(true);

        await completeChapter(mission.chapterId);
      }
    } catch (err) {
      setResult({
        output: "",
        error:
          err instanceof Error
            ? err.message
            : "Unable to submit your code. Please try again.",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(mission.initialCode);
    setResult(null);
    setSuccess(false);
    setXpAwarded(0);
    setAlreadyCompleted(false);
    setShowSuccessModal(false);
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-white">
      {/* Fixed game header */}
      <div className="z-20 shrink-0 border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#09090b]">
        <GameHUD title={mission.title} xp={progress.xp} />
      </div>

      {/* Lesson workspace */}
      <div className="min-h-0 flex-1 overflow-y-auto xl:overflow-hidden">
        <div className="mx-auto grid min-h-full max-w-375 gap-6 p-4 sm:p-7 xl:h-full xl:min-h-0 xl:grid-cols-[2fr_3fr]">
          {/* LEFT: Lesson */}
          <aside
            className="
              min-w-0 xl:h-full xl:min-h-0
              xl:overflow-y-auto xl:overscroll-contain
              xl:pr-4
              text-base leading-7
              [&_p]:text-base [&_p]:leading-7
              [&_h2]:text-2xl [&_h3]:text-xl
              [&_li]:text-base [&_li]:leading-7
            "
          >
            <MissionIntro mission={mission} />
          </aside>

          {/* RIGHT: Coding workspace */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#11141d] xl:h-full xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-white/10">
              <div>
                <p className="font-pixel text-[9px] text-blue-400">
                  CODE CHAMBER
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-white/40">
                  JavaScript Playground
                </p>
              </div>

              <button
                onClick={handleReset}
                disabled={isRunning}
                className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-slate-900 disabled:opacity-40 dark:text-white/50 dark:hover:text-white"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            {/* Monaco Editor */}
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
              <Editor
                height="400px"
                language="javascript"
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={code}
                onChange={(value) => setCode(value ?? "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "JetBrains Mono, Consolas, monospace",
                  padding: { top: 20 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                  readOnly: isRunning || success,
                }}
              />
            </div>

            {/* Run button */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-4 dark:border-white/10">
              <span className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-white/40">
                JAVASCRIPT // ES2022
              </span>

              <GameButton
                title={isRunning ? "CHECKING CODE..." : "RUN CODE"}
                onClick={handleRun}
                icon={<Play size={15} fill="currentColor" />}
                disabled={isRunning || success}
                variant="primary"
              />
            </div>

            {/* Output terminal */}
            <div className="border-t border-slate-200 bg-black/5 p-4 dark:border-white/10 dark:bg-black/30">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 dark:text-white/50">
                <Terminal size={14} />
                OUTPUT TERMINAL
              </div>

              {!result ? (
                <p className="text-xs text-slate-400 dark:text-white/30">
                  Your program output will appear here...
                </p>
              ) : (
                <div className="space-y-3">
                  <pre className="whitespace-pre-wrap text-xs text-emerald-500 dark:text-emerald-400">
                    {result.output || "(No output)"}
                  </pre>

                  {typeof result.passedTests === "number" &&
                    typeof result.totalTests === "number" &&
                    result.totalTests > 0 && (
                      <div className="flex items-center gap-2 border-t border-white/10 pt-3 text-xs">
                        <span
                          className={
                            result.passedTests === result.totalTests
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }
                        >
                          {result.passedTests}/{result.totalTests} tests passed
                        </span>
                      </div>
                    )}

                  {result.error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                      <p className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-wider text-red-400">
                        <XCircle size={14} />
                        ERROR DETAILS
                      </p>
                      <pre className="whitespace-pre-wrap text-xs leading-6 text-red-400">
                        {result.error}
                      </pre>
                    </div>
                  )}

                  {result.message && (
                    <p
                      className={`text-xs ${
                        success ? "text-emerald-400" : "text-amber-500"
                      }`}
                    >
                      {result.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Success message */}
            {success && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-400/20 bg-emerald-400/10 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={22} />

                  <div>
                    <p className="text-sm font-bold text-emerald-400">
                      {alreadyCompleted
                        ? "MISSION ALREADY COMPLETED!"
                        : "MISSION COMPLETED!"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
                      {alreadyCompleted
                        ? "You've already received the XP for this mission."
                        : `+${xpAwarded} XP earned`}
                    </p>
                  </div>
                </div>

                <GameButton
                  title="RETURN TO WORLD"
                  onClick={() => navigate("/world")}
                  variant="primary"
                  size="md"
                />
              </div>
            )}

            {/* Failed submission */}
            {result?.error && (
              <div className="flex items-center gap-2 border-t border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400">
                <XCircle size={15} />
                Your code could not pass the evaluation. Check the error above
                and try again.
              </div>
            )}

            {/* Incorrect answer without runtime error */}
            {result && !result.error && !success && (
              <div className="flex items-center gap-2 border-t border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-500">
                <XCircle size={15} />
                Your code ran, but the challenge checks were not all passed.
                Review your output and try again.
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Success confetti */}
      {showSuccessModal && (
        <>
          <style>
            {`
              @keyframes mission-confetti-fall {
                0% {
                  transform: translate3d(0, -10vh, 0) rotate(0deg);
                  opacity: 1;
                }
                100% {
                  transform: translate3d(35px, 110vh, 0) rotate(760deg);
                  opacity: 0;
                }
              }

              .mission-confetti-piece {
                position: absolute;
                top: -20px;
                animation-name: mission-confetti-fall;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
              }
            `}
          </style>

          <div className="pointer-events-none fixed inset-0 z-90 overflow-hidden">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="mission-confetti-piece"
                style={{
                  left: piece.left,
                  animationDelay: piece.delay,
                  animationDuration: piece.duration,
                  backgroundColor: piece.color,
                  width: `${piece.size}px`,
                  height: `${piece.size * 1.5}px`,
                  borderRadius: piece.id % 2 === 0 ? "2px" : "50%",
                }}
              />
            ))}
          </div>

          {/* Compact success modal */}
          <MissionSuccessModal
            isOpen={showSuccessModal}
            alreadyCompleted={alreadyCompleted}
            xpAwarded={xpAwarded}
            onClose={() => setShowSuccessModal(false)}
            onContinue={() => {
              setShowSuccessModal(false);
              navigate("/world");
            }}
          />
        </>
      )}
    </main>
  );
}
