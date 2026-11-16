import { motion } from "motion/react";
import { ArrowRight, Terminal, Code2, Gamepad2 } from "lucide-react";
import Navbar from "../Navbar";
import Hero from "./Hero";

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24"
      >
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-500 dark:text-blue-400">
            NOT ANOTHER CODING COURSE
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Learn by playing. Grow by building.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Gamepad2,
              title: "Story-driven learning",
              desc: "Explore mysterious regions and uncover the story behind the lost code.",
            },
            {
              icon: Code2,
              title: "Real coding challenges",
              desc: "Write actual JavaScript and solve problems to progress through missions.",
            },
            {
              icon: Terminal,
              title: "Level up your skills",
              desc: "Earn XP, unlock achievements, and master JavaScript step by step.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 transition hover:border-blue-400 dark:border-white/10 dark:bg-white/2 dark:hover:border-blue-500/30"
            >
              <item.icon
                className="mb-6 text-blue-500 dark:text-blue-400"
                size={28}
              />
              <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <h2 className="text-3xl font-bold md:text-5xl">
          Ready to restore the world?
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-zinc-400">
          Your first mission is waiting.
        </p>
        <button className="mt-8 cursor-pointer rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white transition hover:bg-blue-400">
          Begin the journey <ArrowRight className="ml-2 inline" size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-200 px-6 py-7 text-center text-xs text-neutral-500 dark:border-white/10 dark:text-zinc-500">
        {"<THE LOST CODE/> · Every line brings the world back."}
      </footer>
    </main>
  );
}

export default Home;
