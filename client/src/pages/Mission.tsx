import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { CheckCircle2, Play, RotateCcw, Terminal, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import GameHUD from "../components/game/GameHUD";
import MissionIntro from "../components/game/MissionIntro";
import GameButton from "../components/ui/GameButton";
import { missions } from "../data/missions";
// import { worldRegions } from "../data/world";
import { useProgress } from "../hooks/useProgress";
import { useTheme } from "../context/ThemeContext";

interface RunResult {
  output: string;
  error: string | null;
}

function runJavaScript(code: string): Promise<RunResult> {
  return new Promise((resolve) => {
    const workerCode = `
  self.onmessage = (event) => {
    const logs = [];

    const safeConsole = {
      log: (...args) => logs.push(args.map(String).join(" "))
    };

    try {
      const execute = new Function("console", event.data);
      execute(safeConsole);

      self.postMessage({
        output: logs.join(String.fromCharCode(10)),
        error: null
      });
    } catch (error) {
      self.postMessage({
        output: logs.join(String.fromCharCode(10)),
        error: String(error)
      });
    }
  };
`;

    const blob = new Blob([workerCode], {
      type: "application/javascript",
    });

    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const timeout = window.setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({
        output: "",
        error: "Execution timed out. Check for an infinite loop.",
      });
    }, 1500);

    worker.onmessage = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(event.data);
    };

    worker.onerror = () => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({ output: "", error: "Could not execute your code." });
    };

    worker.postMessage(code);
  });
}

export default function Mission() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { progress, isChapterUnlocked, completeChapter } =
    useProgress();

  const mission = missions.find((item) => item.chapterId === chapterId);

  const [code, setCode] = useState(mission?.initialCode ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [success, setSuccess] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setCode(mission?.initialCode ?? "");
    setResult(null);
    setSuccess(false);
  }, [mission]);

  if (!mission) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#09090b] p-6 text-center text-slate-900 dark:text-white">
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

  if (!isChapterUnlocked(mission.chapterId)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#09090b] p-6 text-center text-slate-900 dark:text-white">
        <div>
          <h1 className="font-pixel text-sm">CHAPTER LOCKED</h1>
          <p className="mt-4 text-sm text-slate-900 dark:text-slate-400 dark:text-white/50">
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
    setIsRunning(true);
    setSuccess(false);
    setResult(null);

    const output = await runJavaScript(code);
    setResult(output);

    if (!output.error && output.output.trim() === mission.expectedOutput) {
      setSuccess(true);
      completeChapter(mission.chapterId);
    }

    setIsRunning(false);
  };

  // const alreadyCompleted = isChapterCompleted(mission.chapterId);

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-white">
      {/* Fixed game header */}
      <div className="z-20 shrink-0 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#09090b]">
        <GameHUD title={mission.title} xp={progress.xp} />
      </div>

      {/* Lesson workspace */}
      <div className="min-h-0 flex-1 overflow-y-auto xl:overflow-hidden">
        <div className="mx-auto grid min-h-full max-w-[1500px] gap-6 p-4 sm:p-7 xl:h-full xl:min-h-0 xl:grid-cols-[2fr_3fr]">
          {/* LEFT: Independently scrollable lesson */}
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

          {/* RIGHT: Independently scrollable coding workspace */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#11141d] xl:h-full xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 px-4 py-4">
              <div>
                <p className="font-pixel text-[9px] text-blue-400">
                  CODE CHAMBER
                </p>
                <p className="mt-2 text-xs text-slate-900 dark:text-white/40">
                  JavaScript Playground
                </p>
              </div>

              <button
                onClick={() => {
                  setCode(mission.initialCode);
                  setResult(null);
                  setSuccess(false);
                }}
                className="flex items-center gap-2 text-xs text-slate-900 dark:text-slate-400 dark:text-white/50 transition hover:text-slate-900 dark:text-white"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

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
                }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-white/10 px-4 py-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-900 dark:text-white/40">
                JAVASCRIPT // ES2022
              </span>

              <GameButton
                title={isRunning ? "RUNNING..." : "RUN CODE"}
                onClick={handleRun}
                icon={<Play size={15} fill="currentColor" />}
                disabled={isRunning}
                variant="primary"
              />
            </div>

            {/* Output terminal */}
            <div className="border-t border-slate-200 dark:border-white/10 bg-black/30 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-900 dark:text-slate-400 dark:text-white/50">
                <Terminal size={14} />
                OUTPUT TERMINAL
              </div>

              {!result ? (
                <p className="text-xs text-slate-900 dark:text-white/30">
                  Your program output will appear here...
                </p>
              ) : result.error ? (
                <p className="whitespace-pre-wrap text-xs text-red-400">
                  {result.error}
                </p>
              ) : (
                <pre className="whitespace-pre-wrap text-xs text-emerald-400">
                  {result.output || "(No output)"}
                </pre>
              )}
            </div>

            {/* Success message */}
            {success && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-400/20 bg-emerald-400/10 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={22} />
                  <div>
                    <p className="text-sm font-bold text-emerald-400">
                      MISSION COMPLETED!
                    </p>
                    <p className="mt-1 text-xs text-slate-900 dark:text-slate-400 dark:text-white/50">
                      +{mission.xp} XP earned
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

            {result?.error && (
              <div className="flex items-center gap-2 border-t border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400">
                <XCircle size={15} />
                Fix the error and try again.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
