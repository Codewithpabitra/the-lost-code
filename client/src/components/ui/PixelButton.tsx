
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PixelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "orange" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const variants = {
  primary: {
    base: "border-blue-300 bg-blue-600 text-white",
    shadow: "shadow-[0_4px_0_#1e40af,0_7px_0_#172554]",
    hover: "hover:bg-blue-500 hover:shadow-[0_4px_0_#1d4ed8,0_7px_0_#172554]",
    focus: "focus-visible:outline-blue-400",
  },
  orange: {
    base: "border-orange-300 bg-orange-500 text-white",
    shadow: "shadow-[0_4px_0_#c2410c,0_7px_0_#7c2d12]",
    hover: "hover:bg-orange-400 hover:shadow-[0_4px_0_#c2410c,0_7px_0_#7c2d12]",
    focus: "focus-visible:outline-orange-400",
  },
  secondary: {
    base: "border-neutral-400 bg-neutral-100 text-neutral-800 dark:border-white/30 dark:bg-[#171923] dark:text-white",
    shadow: "shadow-[0_4px_0_#a3a3a3,0_7px_0_#737373] dark:shadow-[0_4px_0_#3f4658,0_7px_0_#202635]",
    hover: "hover:bg-neutral-200 dark:hover:bg-[#222838]",
    focus: "focus-visible:outline-blue-400",
  },
  danger: {
    base: "border-red-300 bg-red-600 text-white",
    shadow: "shadow-[0_4px_0_#991b1b,0_7px_0_#450a0a]",
    hover: "hover:bg-red-500",
    focus: "focus-visible:outline-red-400",
  },
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-[8px] gap-2",
  md: "min-h-12 px-5 py-3 text-[9px] gap-3",
  lg: "min-h-14 px-7 py-4 text-[10px] gap-3",
};

export default function PixelButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  type = "button",
  disabled,
  ...props
}: PixelButtonProps) {
  const style = variants[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        cursor-pointer
        group relative inline-flex items-center justify-center
        border-2 font-pixel font-bold tracking-wider
        transition-[transform,background-color,box-shadow]
        duration-100 ease-out
        ${sizes[size]}
        ${style.base}
        ${style.shadow}
        ${style.hover}
        ${style.focus}
        focus-visible:outline-2 focus-visible:outline-offset-4
        active:translate-y-1 active:shadow-none
        disabled:cursor-not-allowed disabled:opacity-50
        disabled:active:translate-y-0
        disabled:active:shadow-none
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
}