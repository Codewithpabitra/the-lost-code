import { Sparkles } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="relative overflow-hidden border border-blue-500/20 bg-white p-7 dark:bg-[#101018] lg:p-9">
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center gap-2 text-blue-500">
          <Sparkles size={16} />
          <span className="font-pixel text-[9px]">YOUR STORY CONTINUES</span>
        </div>

        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-wide sm:text-5xl">
          THE WORLD IS
          <br />
          WAITING TO BE <span className="text-blue-500">RESTORED.</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
          Your journey has only just begun, adventurer. Explore lost regions,
          complete missions, and recover the fragments of JavaScript.
        </p>
      </div>
    </section>
  );
}