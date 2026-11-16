import type { InputHTMLAttributes, ReactNode } from "react";

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

export default function PixelInput({
  label,
  icon,
  error,
  id,
  className = "",
  ...props
}: PixelInputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-2 block font-pixel text-[9px] tracking-wider text-neutral-600 dark:text-neutral-300"
      >
        {label}
      </label>

      <div
        className={`
          group relative flex min-h-13.5 items-center gap-3
          border-2 bg-white px-4
          shadow-[inset_0_3px_0_rgba(0,0,0,0.04),0_3px_0_#d4d4d4]
          transition-all duration-150
          dark:border-white/15 dark:bg-[#11131a]
          dark:shadow-[inset_0_3px_0_rgba(255,255,255,0.025),0_3px_0_#252a37]
          focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.12),0_3px_0_#1d4ed8]
          dark:focus-within:border-blue-400
          ${
            error
              ? "border-red-500 shadow-[0_3px_0_#991b1b] dark:border-red-400"
              : "border-neutral-300"
          }
        `}
      >
        {icon && (
          <span className="shrink-0 text-neutral-400 transition-colors group-focus-within:text-blue-500 dark:text-neutral-500 dark:group-focus-within:text-blue-400">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          aria-invalid={!!error}
          className={`
            min-w-0 w-full bg-transparent py-3.5
            text-sm font-medium text-neutral-900 outline-none
            placeholder:font-normal placeholder:text-neutral-400
            dark:text-white dark:placeholder:text-neutral-600
            ${className}
          `}
          {...props}
        />

        <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-200 group-focus-within:w-full" />
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
