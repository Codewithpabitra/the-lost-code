type ProgressBarProps = {
  progress: number;
  className?: string;
  showGlow?: boolean;
};

export default function ProgressBar({
  progress,
  className = "",
  showGlow = false,
}: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`h-2.5 overflow-hidden border border-neutral-300 bg-neutral-200 dark:border-white/10 dark:bg-[#08080b] ${className}`}
    >
      <div
        className={`h-full bg-blue-500 transition-all duration-500 ${
          showGlow ? "shadow-[0_0_12px_#3b82f6]" : ""
        }`}
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}