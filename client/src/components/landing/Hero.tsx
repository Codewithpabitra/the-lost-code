import { ArrowRight, Gamepad2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate mx-auto flex min-h-100 max-w-[1600px] items-center overflow-hidden px-6 py-20">
      {/* Theme-based background artwork */}
      <div className="absolute inset-0 -z-20">
        {/* Light mode */}
        <img
          src="/images/hero-world-light.png"
          alt="The Lost Code fantasy world"
          className="block h-full w-full object-cover object-center dark:hidden"
        />

        {/* Dark mode */}
        <img
          src="/images/hero-world-dark.png"
          alt="The Lost Code fantasy world"
          className="hidden h-full w-full object-cover object-center dark:block"
        />
      </div>

      {/* Theme-based overlay */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/85 to-white/10 dark:from-[#09090b] dark:via-[#09090b]/80 dark:to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 max-w-2xl ml-0 sm:ml-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs sm:text-sm text-blue-600 backdrop-blur-md dark:text-blue-400">
          <Gamepad2 size={17} />A Coding Adventure Awaits
        </div>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl dark:text-white">
          {"THE WORLD HAS"}
          <br />
          {"<"}
          <span className="text-orange-600 dark:text-orange-600">
            {"LOST"}
          </span>{" "}
          ITS CODE
          <span>{" />"}</span>
        </h1>

        <p className="mt-7 max-w-xl text-sm sm:text-lg leading-8 text-neutral-700 dark:text-neutral-300">
          A mysterious world. A broken system. And you — the only one who can
          restore it, one line of JavaScript at a time.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="group flex items-center gap-3 rounded-lg bg-blue-600 px-4 sm:px-6 py-4 font-semibold text-white transition hover:bg-blue-500 cursor-pointer">
            Start Your Adventure
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <button className="rounded-lg border border-neutral-300 bg-transparent px-4 sm:px-6 py-4 font-semibold text-neutral-800 backdrop-blur-md transition hover:border-blue-500 dark:border-white/20 dark:bg-transparent dark:text-white cursor-pointer">
            Explore the Story
          </button>
        </div>
      </div>
    </section>
  );
}
