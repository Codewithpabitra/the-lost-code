import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden border border-neutral-200 bg-white p-5 transition hover:border-blue-500/50 dark:border-white/10 dark:bg-[#111119]">
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-pixel text-[8px] tracking-wide text-neutral-400">
            {label}
          </p>
          <p className="mt-4 text-3xl font-bold tracking-wide">{value}</p>
          <p className="mt-1 text-sm text-neutral-500">{detail}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center border border-blue-500/30 bg-blue-500/10 text-blue-500">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}