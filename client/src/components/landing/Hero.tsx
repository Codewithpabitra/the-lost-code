
import { motion } from "motion/react";
import { Gamepad2, LockKeyhole } from "lucide-react";
import PixelButton from "../ui/PixelButton";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-76px)] items-center overflow-hidden border-b border-neutral-200 dark:border-white/10">
      {/* Background artwork */}
      <div className="absolute inset-0 -z-30">
        <img
          src="/images/hero-world-light.png"
          alt="The Lost Code fantasy world"
          className="block h-full w-full object-cover object-center dark:hidden"
        />
        <img
          src="/images/hero-world-dark.png"
          alt="The Lost Code fantasy world"
          className="hidden h-full w-full object-cover object-center dark:block"
        />
      </div>

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-white via-white/90 to-white/20 dark:from-[#09090b] dark:via-[#09090b]/85 dark:to-[#09090b]/20" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-white via-transparent to-white/30 dark:from-[#09090b] dark:via-transparent dark:to-[#09090b]/40" />

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,140,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,140,255,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="font-pixel text-[8px] tracking-wider text-blue-600 dark:text-blue-400">
              A NEW ADVENTURE AWAITS
            </span>
          </div>

          <p className="mb-5 text-xs font-bold tracking-[0.35em] text-neutral-500 dark:text-white/50">
            [ THE LEGEND OF THE LOST WORLD ]
          </p>

          <h1 className="font-pixel text-3xl leading-[1.8] tracking-tight text-neutral-950 sm:text-5xl sm:leading-[1.7] lg:text-6xl dark:text-white">
            THE WORLD
            <br />
            HAS{" "}
            <span className="text-orange-600 drop-shadow-[0_0_25px_rgba(249,115,22,0.3)] dark:text-orange-500">
              LOST
            </span>
            <br />
            ITS CODE<span className="text-blue-500">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-sm leading-8 text-neutral-700 sm:text-base dark:text-neutral-300">
            An ancient world. A broken system. Forgotten lines of code.
            Become the developer who restores it, one JavaScript challenge
            at a time.
          </p>

          {/* Game actions */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-6">
            <PixelButton
              variant="primary"
              size="lg"
              icon={<Gamepad2 size={20} />}
              iconPosition="left"
            >
              START NEW GAME
            </PixelButton>

            <PixelButton
              variant="secondary"
              size="lg"
              icon={<LockKeyhole size={17} />}
              iconPosition="left"
            >
              EXPLORE WORLD
            </PixelButton>
          </div>

          <div className="mt-12 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-neutral-500 dark:text-white/40">
            <span className="h-px w-8 bg-blue-500" />
            YOUR JOURNEY STARTS HERE
          </div>
        </motion.div>
      </div>
    </section>
  );
}