
import { motion } from "motion/react";
import {
  ArrowRight,
  Code2,
  Gamepad2,
  Terminal,
  Trophy,
  Map,
  Lock,
  Sparkles,
} from "lucide-react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import PixelButton from "../ui/PixelButton";

const features = [
  {
    number: "01",
    icon: Gamepad2,
    title: "STORY QUESTS",
    desc: "Explore a mysterious world through an adventure that unfolds as you learn.",
    status: "AVAILABLE",
  },
  {
    number: "02",
    icon: Code2,
    title: "CODING BATTLES",
    desc: "Write real JavaScript, solve challenges, and prove your programming skills.",
    status: "AVAILABLE",
  },
  {
    number: "03",
    icon: Trophy,
    title: "XP & REWARDS",
    desc: "Earn experience, complete missions, and unlock new achievements.",
    status: "AVAILABLE",
  },
];

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">
      <Navbar />

      <Hero />

      {/* Game features */}
      <section
        id="features"
        className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:px-16"
      >
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-5 flex items-center gap-2 text-blue-500">
              <Terminal size={15} />
              <span className="font-pixel text-[8px] tracking-[0.2em]">
                SYSTEM DATABASE // 001
              </span>
            </div>

            <h2 className="font-pixel text-xl leading-[1.8] sm:text-2xl">
              YOUR ADVENTURE
              <br />
              <span className="text-blue-500">YOUR RULES.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              Every mission brings you closer to mastering the code.
              Discover what awaits inside this world.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
            <Sparkles size={15} className="text-amber-500" />
            <span className="font-pixel text-[8px] text-neutral-600 dark:text-white/60">
              3 GAME SYSTEMS
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-blue-500/40"
            >
              <div className="absolute right-5 top-5 font-pixel text-[9px] text-neutral-300 dark:text-white/15">
                {item.number}
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                <item.icon size={25} />
              </div>

              <h3 className="mt-8 font-pixel text-[10px] tracking-wider">
                {item.title}
              </h3>

              <p className="mt-4 min-h-14 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                {item.desc}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-5 dark:border-white/10">
                <span className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item.status}
                </span>

                <ArrowRight
                  size={16}
                  className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-blue-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* World preview */}
      <section
        id="journey"
        className="relative overflow-hidden border-y border-neutral-200 bg-neutral-50 dark:border-white/10 dark:bg-[#0c101b]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.12]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-16">
          <div>
            <div className="mb-6 flex items-center gap-2 text-blue-500">
              <Map size={16} />
              <span className="font-pixel text-[8px] tracking-[0.2em]">
                WORLD EXPLORER
              </span>
            </div>

            <h2 className="font-pixel text-xl leading-[1.9] sm:text-2xl">
              A WORLD FULL
              <br />
              OF <span className="text-blue-500">MYSTERIES.</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-8 text-neutral-600 dark:text-neutral-400">
              Forgotten regions. Lost knowledge. Hidden challenges.
              Travel through different worlds and restore the knowledge
              that once powered this civilization.
            </p>

            <div className="mt-9">
              <PixelButton
                variant="primary"
                size="lg"
                icon={<ArrowRight size={16} />}
              >
                VIEW THE WORLD MAP
              </PixelButton>
            </div>
          </div>

          {/* Map preview panel */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-[#080d1c] p-5 shadow-2xl shadow-blue-950/20 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <span className="font-pixel text-[8px] text-white/70">
                WORLD ATLAS
              </span>
              <span className="text-[9px] font-bold tracking-widest text-blue-400">
                SECTOR 001
              </span>
            </div>

            <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2),transparent_70%)]">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              <div className="relative flex w-full items-center justify-around px-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/50 bg-blue-500/20 text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                    <Terminal size={26} />
                  </div>
                  <span className="font-pixel text-[7px] text-blue-300">
                    ORIGIN
                  </span>
                </div>

                <div className="h-px flex-1 border-t border-dashed border-blue-400/50" />

                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/30">
                    <Lock size={23} />
                  </div>
                  <span className="font-pixel text-[7px] text-white/40">
                    UNKNOWN
                  </span>
                </div>

                <div className="h-px flex-1 border-t border-dashed border-white/20" />

                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/30">
                    <Lock size={23} />
                  </div>
                  <span className="font-pixel text-[7px] text-white/40">
                    UNKNOWN
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-[9px] font-bold tracking-widest text-white/40">
              <span>1 REGION DISCOVERED</span>
              <span>2 REGIONS HIDDEN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final call to adventure */}
      <section
        id="story"
        className="relative overflow-hidden px-5 py-28 text-center sm:px-8"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl">
          <Trophy size={34} className="mx-auto mb-8 text-amber-500" />

          <p className="mb-6 font-pixel text-[8px] tracking-[0.3em] text-blue-500">
            THE FINAL CALL
          </p>

          <h2 className="font-pixel text-xl leading-[2] sm:text-3xl">
            THE WORLD IS
            <br />
            WAITING FOR ITS
            <br />
            <span className="text-blue-500">DEVELOPER.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-8 text-neutral-600 dark:text-neutral-400">
            Every great adventure starts with a single line of code.
            Are you ready to write yours?
          </p>

          <div className="mt-10 flex justify-center">
            <PixelButton
              variant="primary"
              size="lg"
              icon={<ArrowRight size={17} />}
            >
              ENTER THE WORLD
            </PixelButton>
          </div>
        </div>
      </section>

      {/* Enhanced game footer */}
      <footer className="relative overflow-hidden border-t border-neutral-200 bg-neutral-100 px-5 py-12 dark:border-white/10 dark:bg-[#080b14] sm:py-16">
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-[1600px] sm:px-8 lg:px-16">
          <div className="flex flex-col items-center justify-between gap-8 border-b border-neutral-200 pb-10 text-center dark:border-white/10 md:flex-row md:text-left">
            {/* Brand */}
            <div>
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500 text-white shadow-[0_0_25px_rgba(249,115,22,0.2)]">
                  <Terminal size={22} />
                </div>

                <span className="font-pixel text-sm tracking-tight text-neutral-950 dark:text-white sm:text-base">
                  THE LOST CODE
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold tracking-wide text-neutral-700 dark:text-white/75 sm:text-base">
                EVERY LINE BRINGS THE WORLD BACK.
              </p>
            </div>

            {/* Footer navigation */}
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-4 md:justify-end">
              {[
                ["THE STORY", "#story"],
                ["FEATURES", "#features"],
                ["WORLD MAP", "#journey"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-[10px] font-bold tracking-[0.18em] text-neutral-600 transition hover:text-blue-500 dark:text-white/60 dark:hover:text-blue-400 sm:text-xs"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom footer */}
          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center sm:flex-row sm:text-left">
            <p className="text-xs font-semibold tracking-wider text-neutral-600 dark:text-white/50">
              © 2026 THE LOST CODE. ALL RIGHTS RESERVED.
            </p>

            <p className="font-pixel text-[8px] tracking-widest text-blue-600 dark:text-blue-400">
              BUILT FOR THE NEXT GENERATION OF DEVELOPERS.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;