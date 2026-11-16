import type { ReactNode } from "react";

type GameButtonProps = {
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const variants = {
  primary:
    "border-blue-400 bg-blue-600 text-white shadow-[0_4px_0_#123b91] hover:bg-blue-500 active:translate-y-1 active:shadow-none",
  secondary:
    "border-neutral-400/50 bg-neutral-200 text-neutral-900 shadow-[0_4px_0_#a3a3a3] hover:bg-neutral-300 dark:border-white/20 dark:bg-[#202027] dark:text-white dark:shadow-[0_4px_0_#09090b] dark:hover:bg-[#292933]",
  ghost:
    "border-transparent bg-blue-500/10 text-blue-600 hover:border-blue-500/40 hover:bg-blue-500/20 dark:text-blue-400",
  danger:
    "border-red-400 bg-red-600 text-white shadow-[0_4px_0_#991b1b] hover:bg-red-500 active:translate-y-1 active:shadow-none",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

export default function GameButton({
  title,
  onClick,
  icon,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: GameButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group inline-flex items-center justify-center gap-3
        border font-bold tracking-wide
        transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <span>{title}</span>
      {icon && (
        <span className="transition-transform duration-150 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
}